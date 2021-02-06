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
  contentPositions?: Array<'top' | 'left' | 'right' | 'bottom' | 'center' | ''>;
  onTabPressCallBack?: (index: number) => void;
};
type State = {
  activityIndex: number;
  commonAnim: any;
  tabHeight: number;
};

export class DropdownMenu extends Component<Props, State> {
  contentViewRef: any;
  contentHeight: number = 0;
  contentWidth: number = 0;
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
        <View style={{}} />
        {this.renderTabs()}
        {this.props.children}
        {this.renderActivityPanel()}
      </View>
    );
  }

  private renderTabs() {
    return (
      <View
        style={createStyle({
          ...styles.tab_container,
          height: this.getTabHeight(),
        })}>
        {this.props.tabs.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              this.openOrClosePanel(index);
              this.props.onTabPressCallBack &&
                this.props.onTabPressCallBack(index);
            }}
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
    const children =
      this.props.renderContent &&
      this.props.renderContent(
        this.state.activityIndex,
        this.props.tabs[this.state.activityIndex],
      );
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.center,
          createStyle({ top: this.getTabHeight() }),
        ]}>
        {checkEmpty(children) ? null : this.renderMaskView()}
        {this.renderContentView(children)}
      </View>
    );
  }
  private renderContentView(children: any) {
    console.info('children===>');
    console.info(children);
    if (checkEmpty(children)) {
      console.info('empty');
      return <View />;
    }
    const output = this._getContentPropOutput();
    const transform = this.state.commonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: output.outputRange,
    });
    const transformStyle = output.isX
      ? { translateX: transform }
      : output.isY
      ? { translateY: transform }
      : { translateX: 0, translateY: 0 };
    const viewStyle = output.isX
      ? { height: '100%' }
      : output.isY
      ? { width: '100%' }
      : { width: '100%', height: '100%' };
    return (
      <Animated.View style={[output.style, { transform: [transformStyle] }]}>
        <View style={viewStyle} ref={ref => (this.contentViewRef = ref)}>
          {children}
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
  _getContentPropOutput() {
    let contentPosition = this.props.contentPositions?.[
      this.state.activityIndex
    ];
    contentPosition = checkEmpty(contentPosition) ? 'top' : contentPosition;
    let output;
    switch (contentPosition) {
      case 'center':
        output = { style: {}, outputRange: [0, 0] };
        break;
      case 'bottom':
        output = {
          isY: true,
          style: styles.bottom_position,
          outputRange: [this.contentHeight, 0],
        };
        break;
      case 'left':
        output = {
          isX: true,
          style: styles.left_position,
          outputRange: [-this.contentWidth, 0],
        };
        break;
      case 'right':
        output = {
          isX: true,
          style: styles.right_position,
          outputRange: [this.contentHeight, 0],
        };
        break;
      case 'top':
      default:
        output = {
          isY: true,
          style: styles.top_position,
          outputRange: [-this.contentHeight, 0],
        };
        break;
    }
    return output;
  }
  measureContentHeight(callback: (width: number, height: number) => void) {
    this.contentViewRef &&
      this.contentViewRef.measure(
        (x: number, y: number, width: number, height: number) => {
          callback(width, height);
        },
      );
  }
  openOrClosePanel(index: number) {
    if (this.state.activityIndex === index) {
      this.closePanel(this.state.activityIndex, () => {
        this.setState({ activityIndex: -1 });
      });
      this._initContentViewSize();
    } else {
      if (this.state.activityIndex !== -1) {
        this.setState({ activityIndex: -1 }, () => this._open(index));
      } else {
        this._open(index);
      }
    }
  }
  _open(index: number) {
    //先显示出来再做动画
    this.setState({ activityIndex: index }, () => {
      this.measureContentHeight((width, height) => {
        this.contentWidth = width;
        this.contentHeight = height;
        this.openPanel(index);
      });
    });
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
    return this.state.tabHeight;
  }
  _initContentViewSize() {
    this.contentHeight = getWindowHeight();
    this.contentHeight = getWindowWidth();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_container: {
    flexDirection: 'row',
    zIndex: 1,
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
