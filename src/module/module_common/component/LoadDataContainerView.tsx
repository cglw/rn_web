import React from 'react';
import { LoadBaseViewProps } from './load/LoadStateView';
import { LoadState } from './load/LoadState';
import { StateContainerView } from './StateContainerView';
import { View, ViewStyle } from 'react-native';
import ErrorView from '@/module/module_common/component/placeholder/ErrorView';

export interface Props<T> {
  onFetch: () => Promise<T>;
  onLoadSuccess: (res: T & any, func: any) => void;
  onLoadFail: (err: any, func: any) => void;
  style: ViewStyle;
}
type State = {
  loadState: LoadState;
};
// 1.加载页面请求 成功显示页面，    显示错误页面
export class LoadDataContainerView<T> extends React.Component<
  Props<T> & LoadBaseViewProps,
  State
> {
  constructor(props: Props<T> & LoadBaseViewProps) {
    super(props);
    this.state = {
      loadState: LoadState.Init,
    };
  }
  static defaultProps = {
    onLoadFail: () => {},
    style: null,
  };
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setLoadState(LoadState.Loading);
    this.props
      .onFetch()
      .then(res => {
        this.setLoadState(LoadState.Finish);
        this.props.onLoadSuccess(res, this.setLoadState);
      })
      .catch(err => {
        this.setLoadState(LoadState.Error);
        this.props.onLoadFail(err, this.setLoadState);
      });
  }

  setLoadState(loadState: LoadState) {
    this.setState({
      loadState: loadState,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, ...this.props.style }}>
        <StateContainerView
          finishView={this.props.children}
          errorView={<ErrorView onPress={this.loadData.bind(this)} />}
          loadState={this.state.loadState}
          {...this.props}
        />
      </View>
    );
  }
}
