import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
// 让页面的值可以监听
@observer
class LoginScreen extends Component<any, any> {
  date: string = '';
  dir: boolean = false;
  price = observable.box(1);
  data = observable([1231, 23]);

  constructor(props) {
    super(props);

    console.info('6666');
    console.info('props.rootStore');
    // console.info(props.rootStore.accountStore.time);
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Hello   sex={}/>*/}
        <Text>{'login'.itn()}</Text>
        <Text>{'count'.itn({count: 9999})}</Text>
        <Text>{globalStore.accountStore.time}</Text>
        <Text onPress={this.handleInc}>{'+'}</Text>
        <Text onPress={this.handleDec}>{'-'}</Text>
      </View>
    );
  }
  handleInc = () => {
    // this.loadData();
    console.info('handleInc');
    console.info(globalStore);
    this.price.set(this.price.get() + 1);
    // this.data.push(1);
    globalStore.accountStore.increment();
    // console.info(this.store.accountStore.total);
  };
  handleDec = () => {
    this.price.set(this.price.get() - 1);
    console.info('handleDec');
    globalStore.accountStore.time = 10;
  };

  loadData() {}
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
