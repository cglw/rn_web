// @flow
'use strict';

import React, { Component, forwardRef } from 'react';
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  RefreshControl,
  SectionListProps,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import { RefreshState } from './RefreshState';
import RefreshFooter from './RefreshFooter';
import { LoadState } from '../load/LoadState';
import { getWindowHeight } from '../../../../utils/ScreenUtil';
import { isWeb } from '../../../../utils/DeviceUtil';

type Props = {
  onFetchReq: (page: number) => Promise<any>;
  onRefreshCallback: (() => void) | null;
  onLoadMoreCallBack: (() => void) | null;
  onRetryCallBack: (() => void) | null;
  onErrorCallBack: (() => void) | null;
  isNeedFooter: boolean;
  footerNoMore: React.ComponentType<any> | React.ReactElement | null;
  //等待实现
  enableLoadMore: boolean;
  //等待实现
  enableRefresh: boolean;
  resultCovertToList: (date: any) => Array<any>;
  pageLimit: number;
};
type State<ItemT> = {
  footerState: RefreshState;
  isHeaderRefreshing: boolean;
  enableLoadMore: boolean;
  flatListHeight: number;
  data: Array<ItemT>;
  loadState: LoadState;
};

const ScrollViewWrapper = forwardRef((props: any, ref) => {
  return <FlatList {...props} ref={ref} />;
});
interface Pp<ItemT> extends FlatListProps<ItemT> {
  data: ReadonlyArray<ItemT> | null | undefined;
}
export default class ListView<ItemT> extends Component<
  Pp<ItemT> & Props,
  State<ItemT>
> {
  listView?: React.ElementRef<typeof VirtualizedList>;
  onEndReachedCalledDuringMomentum: boolean = false;
  page: number = 1;
  constructor(props: Props & FlatListProps<any> & SectionListProps<any>) {
    super(props);
    this.state = {
      enableLoadMore: false,
      flatListHeight: getWindowHeight(),
      isHeaderRefreshing: false,
      data: [],
      footerState: RefreshState.Idle,
      loadState: LoadState.Init,
    };
  }
  static defaultProps = {
    pageLimit: 20,
    onRefreshCallback: null,
    onLoadMoreCallBack: null,
    onRetryCallBack: null,
    onErrorCallBack: null,
    isNeedFooter: true,
    footerNoMore: null,
    enableLoadMore: true,
    enableRefresh: true,
    data: [],
  };
  componentDidMount() {
    this.onRefresh(true);
  }

  render() {
    return (
      <ScrollViewWrapper
        // windowSize={300}
        onLayout={this.calculateFlatListHeight.bind(this)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponentStyle={styles.foot_container}
        ListFooterComponent={this._renderFooter}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item: any, index: number) => `${index}${item}`}
        onEndReached={() => this.beginFooterRefresh()}
        onRefresh={() => this.onRefresh(false)}
        refreshing={this.state.isHeaderRefreshing}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isHeaderRefreshing}
            onRefresh={() => this.onRefresh(false)}
          />
        }
        footRefreshState={this.state.footerState}
        onEndReachedThreshold={isWeb() ? 0.5 : 0.2}
        onMomentumScrollBegin={() =>
          (this.onEndReachedCalledDuringMomentum = false)
        }
        ref={(ref: any) => (this.listView = ref)}
        {...this.props}
        data={this._getRenderData()}
      />
    );
  }
  _getRenderData() {
    return this.state.data;
  }
  getItemData(index: number) {
    return this.state.data[index];
  }

  loadMore() {
    if (this.state.footerState === RefreshState.Refreshing) {
      return;
    }
    this.setState({
      footerState: RefreshState.Refreshing,
    });
    this._getData();
  }
  onRefresh(isShowLoading = true) {
    console.info(isShowLoading);
    this.setState(
      {
        isHeaderRefreshing: true,
        loadState: isShowLoading ? LoadState.Init : LoadState.Loading,
      },
      () => {
        this.props.onRefreshCallback && this.props.onRefreshCallback();
      },
    );
    this.page = 1;
    this._getData();
  }

  calculateFlatListHeight(e: LayoutChangeEvent) {
    let height = e.nativeEvent.layout.height;
    if (this.state.flatListHeight < height) {
      this.setState({ flatListHeight: height });
    }
  }
  renderListEmptyComponent() {
    return (
      <View>
        <Text>{'null'}</Text>
      </View>
    );
  }

  _renderFooter = () => {
    if (this.props.isNeedFooter) {
      return (
        <RefreshFooter
          footerNoMore={this.props.footerNoMore}
          footRefreshState={this.state.footerState}
          onRetryLoading={this.beginFooterRefresh}
          onLoadMore={() => this.loadMore()}
        />
      );
    }
    return null;
  };

  beginFooterRefresh() {
    console.info('beginFooterRefresh');
    if (this.shouldStartFooterRefreshing()) {
      if (isWeb()) {
        this.startFooterRefreshing();
      } else {
        if (!this.onEndReachedCalledDuringMomentum) {
          this.onEndReachedCalledDuringMomentum = true;
          this.startFooterRefreshing();
        }
      }
    }
  }

  /***
   * 当前是否可以进行上拉加载更多
   * @returns {boolean}
   *
   * 如果底部已经在刷新，返回false
   * 如果底部状态是没有更多数据了，返回false
   * 如果头部在刷新，则返回false
   * 如果列表数据为空，则返回false（初始状态下列表是空的，这时候肯定不需要上拉加载更多，而应该执行下拉刷新）
   */
  shouldStartFooterRefreshing() {
    console.info('shouldStartFooterRefreshing');
    console.info(this.state.footerState);
    console.info('isHeaderRefreshing' + this.state.isHeaderRefreshing);
    console.info('enableLoadMore' + this.state.enableLoadMore);
    return !(
      this.state.footerState === RefreshState.Refreshing ||
      this.state.footerState === RefreshState.NoMoreData ||
      this.state.data.length === 0 ||
      this.state.isHeaderRefreshing ||
      !this.props.enableLoadMore
    );
  }
  startFooterRefreshing() {
    this.loadMore();
    this.props.onLoadMoreCallBack?.();
  }

  private _getData() {
    this.props
      ?.onFetchReq(this.page)
      .then((resData: any) => {
        console.info('resData====>');
        console.info(resData);
        let page = this.page;
        let resultListData = [];
        if (this.props.resultCovertToList) {
          resultListData = this.props.resultCovertToList(resData);
        }
        if (checkEmpty(resultListData)) {
          this._handleEmptyData(page);
        } else {
          this._handleData(page, resultListData);
        }
      })
      .catch(err => this._handleError(err));
  }

  private _handleError(err: Error) {
    console.info(err);
    this.props.onErrorCallBack && this.props.onErrorCallBack();
    this.setState({
      loadState: LoadState.Error,
      isHeaderRefreshing: false,
      footerState: RefreshState.Failure,
    });
  }

  private _handleData(page: number, resultListData: any[]) {
    console.info('_handleData');
    console.info(
      page === 1 ? resultListData : [...this.state.data, ...resultListData],
    );
    this.setState({
      data:
        page === 1 ? resultListData : [...this.state.data, ...resultListData],
      loadState: LoadState.Finish,
      isHeaderRefreshing: false,
      enableLoadMore: resultListData.length >= this.props.pageLimit,
      footerState:
        resultListData.length >= this.props.pageLimit
          ? RefreshState.CanLoadMore
          : RefreshState.NoMoreData,
    });
    if (resultListData.length >= this.props.pageLimit) {
      this.page++;
    }
  }

  private _handleEmptyData(page: number) {
    this.setState({
      data: page === 1 ? [] : this.state.data,
      loadState: LoadState.Finish,
      isHeaderRefreshing: false,
      footerState: page > 1 ? RefreshState.NoMoreData : RefreshState.Idle,
      enableLoadMore: false,
    });
  }
  retryLoad() {
    this.props.onRetryCallBack && this.props.onRetryCallBack();
    this.setState(
      {
        loadState: LoadState.Loading,
      },
      () => this._getData(),
    );
  }
}

const styles = StyleSheet.create({
  foot_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

// ListView.p
