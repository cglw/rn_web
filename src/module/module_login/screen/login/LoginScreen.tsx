import React, {Component, PureComponent} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {BaseComponent} from '../../../module_common/component/BaseComponent';
import {LoginApi} from '../../api/LoginApi';

type P = {
  sex: string;
};

type State = {
  data: number;
};

//这样可以拿到store
@inject('store')
//让页面的值可以监听
@observer
class LoginScreen extends BaseComponent<P, State> {
  dir: boolean = false;
  price = observable.box(1);
  data = observable([1231, 23]);

  constructor(props) {
    super(props);
    console.info('props.rootStore');
    // console.info(props.rootStore.accountStore.time);
  }
  componentDidMount() {
    super.componentDidMount();
  }

  render() {
    return (
      <View style={{backgroundColor: 'red'}}>
        <Text>{'login'.itn()}</Text>
        <Text>{this.store.accountStore.time}</Text>
        <Text onPress={this.handleInc}>{'+'}</Text>
        <Text onPress={this.handleDec}>{'-'}</Text>
      </View>
    );
  }
  handleInc = () => {
    this.loadData();
    console.info('handleInc');
    this.price.set(this.price.get() + 1);
    // this.data.push(1);
    this.store.accountStore.increment();
    // console.info(this.store.accountStore.total);
  };
  handleDec = () => {
    this.price.set(this.price.get() - 1);
    console.info('handleDec');
    this.store.accountStore.time = 10;
  };

  loadData() {
    LoginApi.getNav()
      .then((res) => {
        console.info(res.data?.length);
        console.info(res.data);
      })
      .catch((err) => {});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'blue',
    color: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
    padding: 20,
    fontSize: 100,
  },
});

export default LoginScreen;

// LoginScreen.contextType = MyContext;
