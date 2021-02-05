import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from 'react-native';
import React, { Component } from 'react';
import { getWindowHeight, getWindowWidth } from '@utils/ScreenUtil';

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
  contentPositions?: Array<'top' | 'left' | 'right' | 'bottom' | ''>;
};
type State = {
  activityIndex: number;
  commonAnim: any;
  tabHeight: number;
};

export class DropdownMenu extends Component<Props, State> {
  contentViewRef: any;
  contentViewHeight: number = 0;
  contentViewWidth: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      activityIndex: -1,
      commonAnim: new Animated.Value(0),
      tabHeight: props.tabHeight,
    };
    this._initContentViewSize();
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
            {this.props.renderTab
              ? this.props.renderTab(
                  index,
                  index === this.state.activityIndex,
                  this.props.tabs[index],
                )
              : null}
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
  _getContentPropOutput() {
    let contentPosition = this.props.contentPositions?.[
      this.state.activityIndex
    ];
    contentPosition = checkEmpty(contentPosition) ? 'top' : contentPosition;
    console.info('contentPosition===>' + contentPosition);
    let output;
    switch (contentPosition) {
      case 'bottom':
        output = {
          isX: false,
          isY: true,
          style: styles.bottom_position,
          outputRange: [this.contentViewHeight, 0],
        };
        break;
      case 'left':
        output = {
          isX: true,
          isY: false,
          style: styles.left_position,
          outputRange: [-this.contentViewWidth, 0],
        };
        break;
      case 'right':
        output = {
          isX: true,
          isY: false,
          style: styles.right_position,
          outputRange: [this.contentViewHeight, 0],
        };
        break;
      case 'top':
      default:
        output = {
          isX: false,
          isY: true,
          style: styles.top_position,
          outputRange: [-this.contentViewHeight, 0],
        };
        break;
    }
    return output;
  }
  private renderContentView() {
    const output = this._getContentPropOutput();
    const transform = this.state.commonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: output.outputRange,
    });
    const transformStyle = output.isX
      ? { translateX: transform }
      : { translateY: transform };
    const viewStyle = output.isX ? { height: '100%' } : { width: '100%' };
    return (
      <Animated.View style={[output.style, { transform: [transformStyle] }]}>
        <View style={viewStyle} ref={ref => (this.contentViewRef = ref)}>
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
            opacity: this.state.commonAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.4],
            }),
            backgroundColor: 'black',
            flex: 1,
          }}
        />
      </TouchableOpacity>
    );
  }

  measureContentHeight(callback: (width: number, height: number) => void) {
    this.contentViewRef &&
      this.contentViewRef.measure(
        (x: number, y: number, width: number, height: number) => {
          console.log('measure:::' + width + '====>' + height);
          callback(width, height);
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
      this._initContentViewSize();
    } else {
      //先显示出来再做动画
      this.setState(
        {
          activityIndex: index,
        },
        () => {
          this.measureContentHeight((width, height) => {
            this.contentViewWidth = width;
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
    Animated.timing(this.state.commonAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(callback);
  };

  fadeOut = (callback?: Animated.EndCallback) => {
    Animated.timing(this.state.commonAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(callback);
  };

  getTabHeight() {
    return adapterSize(this.state.tabHeight);
  }
  _initContentViewSize() {
    this.contentViewHeight = getWindowHeight();
    this.contentViewHeight = getWindowWidth();
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
  bottom_position: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  left_position: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
  right_position: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
});
