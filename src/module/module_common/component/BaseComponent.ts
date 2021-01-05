import {Component, PureComponent} from 'react';
import {RootStore} from '../store/RootStore';
type Props = {
  store: RootStore;
};
export abstract class BaseComponent<P, S = {}, SS = any> extends Component<
  Props & P,
  S,
  SS
> {
  protected store: RootStore;

  protected constructor(props) {
    super(props);
    this.store = props.store;
  }
  componentDidMount() {
    this.loadData();
  }
  abstract loadData();
}
