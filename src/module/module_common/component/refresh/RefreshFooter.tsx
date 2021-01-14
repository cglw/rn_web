// @flow
'use strict';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RefreshState } from './RefreshState';

type Props = {
  onLoadMore: (() => void) | null;
  onRetryLoading: (() => void) | null; // 重新加载的方法
  footerNoMore: React.ComponentType<any> | React.ReactElement | null;
  refreshingText: string;
  loadMoreText: string;
  failureText: string;
  noMoreDataText: string;
  footRefreshState?: RefreshState;
};

export default class RefreshFooter extends Component<Props, any> {
  static defaultProps = {
    refreshingText: '努力加载中',
    loadMoreText: '上拉加载更多',
    failureText: '点击重新加载',
    noMoreDataText: '没有更多了',
  };

  render() {
    let state = this.props.footRefreshState;
    let footer = null;
    switch (state) {
      case RefreshState.Idle:
        break;
      case RefreshState.Refreshing:
        footer = this._renderLoading();
        break;
      case RefreshState.CanLoadMore:
        footer = this._renderLoadMore();
        break;
      case RefreshState.NoMoreData:
        if (this.props.footerNoMore) {
          footer = this.props.footerNoMore;
          break;
        }
        footer = this._renderNoMoreData();
        break;
      case RefreshState.Failure:
        footer = this._renderFailure();
        break;
    }
    return footer;
  }

  _renderLoadMore() {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.footerText}>{this.props.loadMoreText}</Text>
      </View>
    );
  }

  _renderFailure() {
    return (
      <TouchableOpacity
        style={styles.loadingView}
        onPress={() => {
          this.props.onRetryLoading && this.props.onRetryLoading();
        }}>
        <Text style={styles.footerText}>{this.props.failureText}</Text>
      </TouchableOpacity>
    );
  }

  _renderNoMoreData() {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.footerText}>{this.props.noMoreDataText}</Text>
      </View>
    );
  }

  _renderLoading() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator color={'#999999'} size="small" />
        <Text style={styles.refreshingText}>{this.props.refreshingText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  refreshingText: {
    fontSize: 12,
    color: '#999999',
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
  },
});
