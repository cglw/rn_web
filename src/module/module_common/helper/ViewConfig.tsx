import React from 'react';
import { StateContainerView } from '../component/StateContainerView';
import LoadingView from '../component/placeholder/LoadingView';
import EmptyView from '../component/placeholder/EmptyView';
import ErrorView from '../component/placeholder/ErrorView';
StateContainerView.defaultProps = {
  loadingView: <LoadingView />,
  initView: <LoadingView />,
  emptyView: <EmptyView />,
  errorView: <ErrorView />,
};
