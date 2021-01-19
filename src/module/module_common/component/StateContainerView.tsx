import React, { Component, ReactNode } from 'react';
import { LoadState } from './load/LoadState';
import {
  LoadBaseViewProps,
  LoadStateProps,
  LoadStateView,
} from './load/LoadStateView';
import { View } from 'react-native';

type State = {
  loadState: LoadState;
};
type Props = {};

export class StateContainerView extends Component<
  Props & LoadStateProps & LoadBaseViewProps,
  State
> {
  static defaultProps: {
    loadingView?: React.ComponentType<any> | React.ReactElement;
    errorView?: React.ComponentType<any> | React.ReactElement;
    emptyView?: React.ComponentType<any> | React.ReactElement;
    finishView?: ReactNode;
    initView?: React.ComponentType<any> | React.ReactElement;
  };
  render() {
    let res = (
      <LoadStateView
        {...this.props}
        initView={this.props.initView}
        loadingView={this.props.loadingView}
        finishView={this.props.children}
        loadState={this.props.loadState}
      />
    );
    return res === null || res === void 0 ? <View /> : res;
  }
}
