import {PureComponent} from 'react';

export class BaseComponent<P = {}, S = {}, SS = any> extends PureComponent<
  P,
  S,
  SS
> {}
