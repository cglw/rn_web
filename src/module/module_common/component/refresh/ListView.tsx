// @flow
'use strict';

import React, { Component, forwardRef } from 'react';
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  SectionList,
  SectionListProps,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import { RefreshState } from './RefreshState';
import RefreshFooter from './RefreshFooter';
import { LoadState } from '../load/LoadState';
import { getWindowHeight } from '@utils/ScreenUtil';
import { isWeb } from '@utils/DeviceUtil';
import { StateContainerView } from '../StateContainerView';
import { LoadBaseViewProps } from '../load/LoadStateView';
import ErrorView from '@/module/module_common/component/placeholder/ErrorView';
import CustomRefreshControl from '@/sdk/refresh/RefreshControl.web';
//renderSectionHeader 实现这个方法 会切到sectionList
type Props = {
  onFetch: (page: number) => Promise<any>;
  onRefreshCallback: (() => void) | null;
  onLoadMoreCallBack: (() => void) | null;
  onRetryCallBack: (() => void) | null;
  onErrorCallBack: (() => void) | null;
  enableLoadMore: boolean;
  enableRefresh: boolean;
  resultCovertToList: (date: any) => Array<any>;
  pageLimit: number;
};
type State<ItemT> = {
  _footerState: RefreshState;
  _isHeaderRefreshing: boolean;
  _enableLoadMore: boolean;
  _flatListHeight: number;
  _data: Array<ItemT>;
  _loadState: LoadState;
};

const ScrollViewWrapper = forwardRef((props: any, ref) => {
  return props.renderSectionHeader ? (
    <SectionList {...props} ref={ref} />
  ) : (
    <FlatList {...props} ref={ref} />
  );
});

export default class ListView<ItemT> extends Component<
  SectionListProps<ItemT> & FlatListProps<ItemT> & Props & LoadBaseViewProps,
  State<ItemT>
> {
  listView?: React.ElementRef<typeof VirtualizedList>;
  onEndReachedCalledDuringMomentum: boolean = false;
  page: number = 1;
  loadContainerViewRef: any;
  constructor(
    props: Props &
      FlatListProps<any> &
      SectionListProps<any> &
      LoadBaseViewProps,
  ) {
    super(props);
    this.state = {
      _enableLoadMore: false,
      _flatListHeight: getWindowHeight(),
      _isHeaderRefreshing: false,
      _data: [],
      _footerState: RefreshState.Idle,
      _loadState: LoadState.Init,
    };
  }
  static defaultProps = {
    pageLimit: 20,
    onRefreshCallback: null,
    onLoadMoreCallBack: null,
    onRetryCallBack: null,
    onErrorCallBack: null,
    footerNoMore: null,
    enableLoadMore: true,
    enableRefresh: true,
    data: [],
    //sectionList使用
    sections: [],
  };
  componentDidMount() {
    this.onRefresh(true);
  }

  render() {
    let refreshProps = {};
    if (this.props.enableRefresh) {
      refreshProps = {
        onRefresh: () => this.onRefresh(false),
      };
    } else {
      if (isWeb()) {
        refreshProps = { ...refreshProps, renderScrollComponent: null };
      }
    }
    return (
      <StateContainerView
        {...this.props}
        errorView={
          <ErrorView
            onPress={() => {
              console.info('ErrorView');
              this.retryLoad();
            }}
          />
        }
        ref={(ref: any) => (this.loadContainerViewRef = ref)}
        loadState={this.state._loadState}>
        <ScrollViewWrapper
          onLayout={this.calculateFlatListHeight.bind(this)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={this.renderListEmptyComponent.bind(this)}
          ListFooterComponentStyle={styles.foot_container}
          ListFooterComponent={this._renderFooter}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(index: number, item: any) => `${index}${item}`}
          onEndReached={() => this.beginFooterRefresh()}
          refreshing={this.state._isHeaderRefreshing}
          refreshControl={
            this.props.enableRefresh ? (
              <RefreshControl
                refreshing={this.state._isHeaderRefreshing}
                onRefresh={() => this.onRefresh(false)}
              />
            ) : null
          }
          onEndReachedThreshold={isWeb() ? 0.5 : 0.2}
          onMomentumScrollBegin={() =>
            (this.onEndReachedCalledDuringMomentum = false)
          }
          ref={(ref: any) => (this.listView = ref)}
          {...this.props}
          {...refreshProps}
          data={this._getRenderData()}
          sections={this._getRenderData()}
          renderScrollComponent={isWeb() ? this._renderScrollComponent : null}
        />
      </StateContainerView>
    );
  }

  _renderScrollComponent(props: any) {
    return (
      <ScrollView
        {...props}
        refreshControl={
          <CustomRefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
      />
    );
  }

  _getRenderData() {
    return this.state._data;
  }
  getItemData(index: number) {
    return this.state._data[index];
  }

  loadMore() {
    if (this.state._footerState === RefreshState.Refreshing) {
      return;
    }
    this.setState({
      _footerState: RefreshState.Refreshing,
    });
    this._getData();
  }
  onRefresh(isShowLoading = true) {
    console.info('onRefresh===>' + isShowLoading);
    this.setState(
      {
        _isHeaderRefreshing: true,
        _loadState: isShowLoading ? LoadState.Loading : LoadState.Finish,
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
    if (this.state._flatListHeight < height) {
      this.setState({ _flatListHeight: height });
    }
  }
  renderListEmptyComponent() {
    return checkEmpty(this.props.emptyView)
      ? StateContainerView.defaultProps.emptyView
      : this.props.emptyView;
  }

  _renderFooter = () => {
    if (this.props.enableLoadMore) {
      return (
        <RefreshFooter
          footRefreshState={this.state._footerState}
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
    console.info(this.state._footerState);
    console.info('isHeaderRefreshing' + this.state._isHeaderRefreshing);
    console.info('enableLoadMore' + this.state._enableLoadMore);
    return !(
      this.state._footerState === RefreshState.Refreshing ||
      this.state._footerState === RefreshState.NoMoreData ||
      this.state._data.length === 0 ||
      this.state._isHeaderRefreshing ||
      !this.props.enableLoadMore
    );
  }
  startFooterRefreshing() {
    this.loadMore();
    this.props.onLoadMoreCallBack?.();
  }

  private _getData() {
    this.props
      ?.onFetch(this.page)
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
      _loadState: LoadState.Error,
      _isHeaderRefreshing: false,
      _footerState: RefreshState.Failure,
    });
  }

  private _handleData(page: number, resultListData: any[]) {
    console.info('_handleData');
    console.info(
      page === 1 ? resultListData : [...this.state._data, ...resultListData],
    );
    this.setState({
      _data:
        page === 1 ? resultListData : [...this.state._data, ...resultListData],
      _loadState: LoadState.Finish,
      _isHeaderRefreshing: false,
      _enableLoadMore: resultListData.length >= this.props.pageLimit,
      _footerState:
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
      _data: page === 1 ? [] : this.state._data,
      _loadState: LoadState.Finish,
      _isHeaderRefreshing: false,
      _footerState: page > 1 ? RefreshState.NoMoreData : RefreshState.Idle,
      _enableLoadMore: false,
    });
  }
  retryLoad() {
    console.info('retryLoad===>');
    this.props.onRetryCallBack && this.props.onRetryCallBack();
    this.setState(
      {
        _loadState: LoadState.Loading,
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
