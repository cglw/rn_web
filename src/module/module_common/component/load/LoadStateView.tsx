// @flow
'use strict';
import { LoadState } from './LoadState';
type loadStateProps = {
  loadState: LoadState;
  loadingView?: any;
  errorView?: any;
  emptyView?: any;
  finishView?: any;
  initView?: any;
};

export const LoadStateView = function (props: loadStateProps) {
  let res;
  switch (props.loadState) {
    case LoadState.Init:
      res = props?.initView;
      break;
    case LoadState.Loading:
      res = props?.loadingView;
      break;
    case LoadState.Empty:
      res = props?.emptyView;
      break;
    case LoadState.Finish:
      res = props?.finishView;
      break;
    case LoadState.Error:
      res = props?.errorView;
      break;
    default:
      res = null;
  }

  return res;
};
