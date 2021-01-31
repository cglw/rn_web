/*****
 * 轮播图 组件
 * ****/

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

export class BetterBanner extends PureComponent {
  static defaultProps = {
    bannerImages: [],
    bannerComponents: [],
    scrollInterval: 1000,
    isAutoScroll: true,
    isSeamlessScroll: false, // 无缝滚动
    adaptSeamlessScrollValue: false, // 无缝滚动显示异常时修改此值
    indicatorWidth: 10,
    indicatorHeight: 6,
    indicatorStyle: {},
    indicatorGap: 6, // 2个指示器之间的间隙
    indicatorGroupPosition: 'right', // left, center, right
    indicatorGroupSideOffset: 10, // 左右边距
    indicatorContainerHeight: 32,
    indicatorContainerBackgroundColor: 'transparent',
    style: { flex: 1 },
    dotStyle: {},
    dotActiveStyle: {},
    onPress: () => {},
    onScrollEnd: () => {},
    dots: true,
  };

  constructor(props) {
    super(props);
    const {
      indicatorWidth,
      indicatorHeight,
      indicatorGap,
      indicatorStyle,
    } = props;

    // 不允许外部设置margin 与 padding
    this.bannerHeight = 250;
    if (props.style) {
      this.bannerHeight = props.style.height;
    }

    this.state = {
      selectIndex: 1,
    };
    this.currentBannerData = [];
    this.offsetX = 0;
    this.nextPage = 1;
    this.isAutoScroll = props.isAutoScroll;
    // 活动指示器初始值
    this.initActiveIndicatorX = null;
    // 每翻一页，指示器滚动的距离
    this.activeIndicatorX = props.indicatorWidth + props.indicatorGap;

    this.bannerView = this.getBannerView();
    this.isInitScroll = true;

    this.indicatorStyle = {
      ...indicatorStyle,
      width: indicatorHeight,
      height: indicatorHeight,
      borderRadius: indicatorHeight,
      marginLeft: indicatorGap / 2,
      marginRight: indicatorGap / 2,
    };
    this.pageWidth = props.style.width;
  }

  componentDidMount() {}

  start() {
    this.isInitScroll = true;
    setTimeout(() => this.initScroll(), 0);
    this.startAutoScroll();
  }

  componentWillUnmount() {
    this.scrollTimer && clearInterval(this.scrollTimer);
    this.animTimer && clearTimeout(this.animTimer);
  }

  initScroll() {
    if (!this.props.isSeamlessScroll || this.currentBannerData.length < 2) {
      return;
    }
    if (this.isInitScroll) {
      this.scrollTo(this.pageWidth, false);
    } else if (this.isPageScrollEnd()) {
      this.initNextPage();
      let showAnim = this.props.adaptSeamlessScrollValue;
      // let showAnim = Platform.OS === 'android'; // 兼容问题
      this.scrollTo(this.pageWidth * this.nextPage, showAnim);
      this.setActiveIndicatorX(this.activeIndicatorX * this.nextPage);
    }
  }

  isPageScrollEnd() {
    return (
      this.props.isSeamlessScroll &&
      (this.nextPage === 0 || this.nextPage === this.bannerView.length - 1)
    );
  }

  isIndicatorScrollEnd() {
    return (
      this.props.isSeamlessScroll &&
      (this.nextPagePixel < 1 ||
        this.nextPagePixel > this.bannerView.length - 2)
    );
  }

  initNextPage() {
    this.nextPage = this.nextPage === 0 ? this.bannerView.length - 2 : 1;
  }

  scrollTo(x, showAnim = true) {
    this.scrollView?.scrollTo({ x: x, animated: showAnim });
  }
  _isHasPageWidth() {
    return !(this.pageWidth === undefined || this.pageWidth === 0);
  }

  getBannerView() {
    const { bannerImages, bannerComponents, isSeamlessScroll } = this.props;
    let _bannerView = [];
    let _bannerList = [];
    let isSwitchBannerImages = true;

    if (bannerImages && bannerImages.length > 0) {
      _bannerList = JSON.parse(JSON.stringify(bannerImages));
      this.currentBannerData = bannerImages;
    } else if (bannerComponents && bannerComponents.length > 0) {
      _bannerList = bannerComponents.map((item, index) => {
        return React.cloneElement(item);
      });
      this.currentBannerData = bannerComponents;
      isSwitchBannerImages = false;
    } else {
      return null;
    }
    console.info('getBannerView===>' + _bannerList.length);

    if (isSeamlessScroll && this.currentBannerData.length > 1) {
      _bannerList.unshift(_bannerList[_bannerList.length - 1]);
      _bannerList.push(_bannerList[1]);
    }
    if (!this._isHasPageWidth()) {
      return null;
    }
    for (let i = 0; i < _bannerList.length; i++) {
      _bannerView.push(
        <TouchableOpacity
          style={{
            ...styles.bannerContent,
            width: this.pageWidth,
            height: '100%',
          }}
          key={i}
          activeOpacity={1}
          onPress={() => this.props.onPress(isSeamlessScroll ? i - 1 : i)}>
          {isSwitchBannerImages ? (
            <Image
              style={[styles.imageStyle, { height: this.bannerHeight }]}
              source={_bannerList[i]}
            />
          ) : (
            _bannerList[i]
          )}
        </TouchableOpacity>,
      );
    }
    console.info(_bannerView);
    return _bannerView;
  }

  setActiveIndicatorX(x) {
    // console.info(this.nextPage);
    this.setState({
      selectIndex: this.nextPage,
    });
    x = this.props.isSeamlessScroll ? x - this.activeIndicatorX : x;
    x = Platform.OS === 'ios' ? x - this.props.indicatorGap / 2 : x;
    this.activeIndicator?.setNativeProps({ style: { left: x } });
  }

  onScroll(event) {
    if (this.isInitScroll) {
      this.isInitScroll = false;
      return;
    }
    this.offsetX = event.nativeEvent.contentOffset.x;
    this.nextPage = Math.round(this.offsetX / this.pageWidth);
    this.nextPagePixel = this.offsetX / this.pageWidth;

    let indicatorX = 0;
    let bannerContentY = 0;
    //指示器滚动效果--自动滚动
    if (this.isAutoScroll) {
      indicatorX =
        this.initActiveIndicatorX + this.nextPage * this.activeIndicatorX;
      bannerContentY = this.nextPage * 32;
    } else {
      //指示器滚动效果--手动滑动
      indicatorX =
        this.initActiveIndicatorX + this.nextPagePixel * this.activeIndicatorX;
      bannerContentY = this.nextPagePixel * 32;
    }
    if (this.isIndicatorScrollEnd()) {
      return;
    }
    this.setActiveIndicatorX(indicatorX);
  }

  onTouchStart() {
    this.isAutoScroll = false;
    this.scrollTimer && clearInterval(this.scrollTimer);
    this.animTimer && clearTimeout(this.animTimer);
  }

  // 没有滑动手势才会调用此方法
  onTouchEnd() {
    // 解决 安卓滑到中间松开手势会停止滚动
    if (Platform.OS === 'android') {
      let offsetx1 = this.offsetX;
      setTimeout(() => {
        if (offsetx1 === this.offsetX) {
          this.scrollTo(this.nextPage * this.pageWidth);
        }
      }, 100);
    }
    this.startAutoScroll();
  }

  startAutoScroll() {
    if (this.currentBannerData.length < 2) {
      return;
    }
    this.scrollTimer && clearInterval(this.scrollTimer);
    this.animTimer && clearTimeout(this.animTimer);

    this.isAutoScroll = true;
    this.scrollTimer = setInterval(() => {
      console.warn('nextPage====>', this.nextPage);
      this.scrollTo(this.nextPage * this.pageWidth);

      this.animTimer = setTimeout(() => {
        this.nextPage++;
        if (this.nextPage >= this.bannerView.length) {
          if (this.props.isSeamlessScroll) {
            this.nextPage = 1;
            this.setActiveIndicatorX(this.activeIndicatorX * this.nextPage);
            this.scrollTo(this.pageWidth * this.nextPage, false);
          } else {
            this.nextPage = 0;
            // this.scrollTo(this.pageWidth * this.nextPage, false);
            this.setActiveIndicatorX(this.activeIndicatorX * this.nextPage);
          }
        }
      }, 500);
    }, this.props.scrollInterval);
  }

  onMomentumScrollEnd(event) {
    this.startAutoScroll();
    this.initScroll();
    this.props.onScrollEnd(event);
  }

  renderActiveIndicator() {
    return (
      <View
        style={[
          this.indicatorStyle,
          styles.activePoint,
          { backgroundColor: 'grey' },
          this.props.dotActiveStyle,
          // { backgroundColor: this.props.activeIndicatorColor },
        ]}
        ref={ref => {
          this.activeIndicator = ref;
        }}
        // 测算左边距长度
        onLayout={() =>
          this.activeIndicator.measure((x, y, width, height, pageX, pageY) => {
            if (!this.initActiveIndicatorX) {
              this.initActiveIndicatorX = x;
            }
          })
        }
      />
    );
  }

  renderBottomIndicator() {
    console.info('renderBottomIndicator next' + this.nextPage);
    let points = [];
    let { length } = this.currentBannerData;
    for (let i = 0; i < length; i++) {
      points.push(
        <View
          key={i}
          style={[
            this.indicatorStyle,
            { backgroundColor: 'white', marginBottom: 20 },
            i + 1 === this.state.selectIndex
              ? this.props.dotActiveStyle
              : this.props.dotStyle,
          ]}
        />,
      );
    }
    return points;
  }

  render() {
    console.info('render===>' + this.pageWidth);
    const {
      indicatorGroupSideOffset,
      indicatorContainerHeight,
      indicatorContainerBackgroundColor,
    } = this.props;
    if (this.pageWidth === undefined || this.pageWidth === 0) {
      return (
        <View
          style={{ width: '100%', height: this.bannerHeight }}
          onLayout={event => {
            this.pageWidth = event.nativeEvent.layout.width;
            this.bannerView = this.getBannerView();
            this.setState(
              {
                time: new Date().getTime(),
              },
              () => {
                this.start();
              },
            );
          }}
        />
      );
    }

    return this.currentBannerData.length === 0 ? (
      <View
        style={[
          styles.container,
          styles.noDataContainer,
          { width: this.pageWidth, height: this.bannerHeight },
        ]}>
        <Text style={{ color: '#fff', fontSize: 24, marginBottom: 10 }}>
          There is no banner data
        </Text>
        <Text style={{ color: '#fff', fontSize: 14 }}>Please add</Text>
        <Text style={{ color: '#fff', fontSize: 14 }}>
          bannerComponents or bannerImages
        </Text>
      </View>
    ) : (
      <View
        style={[
          styles.container,
          { height: this.bannerHeight, width: this.pageWidth },
        ]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={70}
          pagingEnabled={true}
          onScroll={this.onScroll.bind(this)}
          onTouchStart={() => this.onTouchStart()}
          onTouchEnd={() => this.onTouchEnd()}
          onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)} // 滚动动画结束时调用
          ref={ref => (this.scrollView = ref)}>
          {this.bannerView}
        </ScrollView>
        {this.props.dots ? (
          <View
            style={[
              styles.indicatorContainer,
              {
                paddingLeft: indicatorGroupSideOffset,
                paddingRight: indicatorGroupSideOffset,
                // backgroundColor: indicatorContainerBackgroundColor,
              },
            ]}>
            <View style={[styles.indicatorContent, { alignSelf: 'center' }]}>
              {this.renderBottomIndicator()}
              {/*{this.renderActiveIndicator()}*/}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  noDataContainer: {
    backgroundColor: '#1997fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContent: {
    zIndex: 9999,
  },

  bannerTitleText: {
    color: '#aaa',
  },
  imageStyle: {
    height: '100%',
    resizeMode: 'stretch',
  },

  indicatorContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    alignSelf: 'center',
    // backgroundColor: 'red',
    justifyContent: 'center',
  },

  indicatorContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activePoint: {
    position: 'absolute',
  },
});
