import React, { Component } from 'react';
import { LoadStateView } from './load/LoadStateView';
import { LoadState } from './load/LoadState';

type State = {
  loadState: LoadState;
};
type Props = {};

export class LoadContainerView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    // return <LoadStateView loadState={}>;
    return null;
  }
}
