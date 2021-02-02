import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from 'react-native';
import React, { Component } from 'react';
import { MenuTabView } from '@/module/module_common/component/menu/MenuTab';
import { getWindowHeight } from '@utils/ScreenUtil';

type Props = {
  tabs: Array<any>;
  tabTouchStyle?: ViewStyle;
  tabHeight: number;
  renderTab?: (
    index: number,
    isChecked: boolean,
    data: any,
  ) => React.ComponentType<any> | React.ReactElement;
  renderContent?: (
    index: number,
    data: any,
  ) => React.ComponentType<any> | React.ReactElement;
};
type State = {
  activityIndex: number;
  fadeAnim: any;
  tabHeight: number;
};

export class DropdownMenu extends Component<Props, State> {
  contentViewRef: any;
  contentViewHeight: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      activityIndex: -1,
      fadeAnim: new Animated.Value(0),
      tabHeight: props.tabHeight,
    };
    this.contentViewHeight = getWindowHeight();
  }
  static defaultProps = {
    tabHeight: 40,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTabs()}
        {this.props.children}
        {this.renderActivityPanel()}
      </View>
    );
  }

  private renderTabs() {
    return (
      <View
        style={{
          ...styles.tab_container,
          height: this.getTabHeight(),
        }}>
        {this.props.tabs.map((item, index) => (
          <TouchableOpacity
            onPress={() => this.openOrClosePanel(index)}
            key={index}
            style={{ flex: 1, ...this.props.tabTouchStyle }}
            activeOpacity={1}>
            {this.props.renderTab ? (
              this.props.renderTab(
                index,
                index === this.state.activityIndex,
                this.props.tabs[index],
              )
            ) : (
              <MenuTabView
                isChecked={index === this.state.activityIndex}
                text={this.props.tabs[index].toString()}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  private renderActivityPanel() {
    if (this.state.activityIndex < 0) {
      return null;
    }
    return (
      <View style={[StyleSheet.absoluteFill, { top: this.getTabHeight() }]}>
        {this.renderMaskView()}
        {this.renderContentView()}
      </View>
    );
  }

  private renderContentView() {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.fadeAnim.interpolate({
                inputRange: [0, 0.4],
                outputRange: [-this.contentViewHeight, 0],
              }),
            },
          ],
        }}>
        <View
          ref={ref => (this.contentViewRef = ref)}
          style={styles.top_position}>
          {this.props.renderContent &&
            this.props.renderContent(
              this.state.activityIndex,
              this.props.tabs[this.state.activityIndex],
            )}
        </View>
      </Animated.View>
    );
  }

  private renderMaskView() {
    return (
      <TouchableOpacity
        onPress={() => this.openOrClosePanel(this.state.activityIndex)}
        activeOpacity={1}
        style={StyleSheet.absoluteFill}>
        <Animated.View
          style={{
            opacity: this.state.fadeAnim, // Bind opacity to animated value
            backgroundColor: 'black',
            flex: 1,
          }}
        />
      </TouchableOpacity>
    );
  }

  measureContentHeight(callback: (height: number) => void) {
    this.contentViewRef &&
      this.contentViewRef.measure(
        (x: number, y: number, width: number, height: number) => {
          console.log('measure:::' + height);
          callback(height);
        },
      );
  }

  openOrClosePanel(index: number) {
    if (this.state.activityIndex === index) {
      this.closePanel(this.state.activityIndex, () => {
        this.setState({
          activityIndex: -1,
        });
      });
      this.contentViewHeight = getWindowHeight();
    } else {
      //先显示出来再做动画
      this.setState(
        {
          activityIndex: index,
        },
        () => {
          this.measureContentHeight(height => {
            this.contentViewHeight = height;
            this.openPanel(index);
          });
        },
      );
    }
  }

  openPanel(index: number, callback?: () => void) {
    this.fadeIn(callback);
  }

  closePanel(index: number, callback?: () => void) {
    this.fadeOut(callback);
  }
  fadeIn = (callback?: Animated.EndCallback) => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0.4,
      duration: 300,
      useNativeDriver: false,
    }).start(callback);
  };

  fadeOut = (callback?: Animated.EndCallback) => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(callback);
  };

  getTabHeight() {
    return adapterSize(this.state.tabHeight);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab_container: {
    flexDirection: 'row',
    zIndex: 99999,
  },
  top_position: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
