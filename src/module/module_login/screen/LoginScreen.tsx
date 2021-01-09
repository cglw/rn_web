import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { getWindowHeight } from '../../../utils/ScreenUtil';
import { wrapWithSafe } from '../../module_common/component/ViewRootContainer';
import { Button } from '@ant-design/react-native';

// 让页面的值可以监听
@observer
export default class LoginScreen extends Component<any, any> {
  date: string = '';
  dir: boolean = false;
  price = observable.box(1);
  data = observable([1231, 23]);

  constructor(props: any) {
    super(props);
    // globalService.testInterface.testPrint();
    console.info('6666');
    console.info('props.rootStore');
    // console.info(props.rootStore.accountStore.time);
  }

  render() {
    console.info('getWindowHeight()');
    console.info(getWindowHeight());
    return wrapWithSafe(
      <>
        <Text style={{ height: 100, position: 'absolute' }}>test</Text>
        <ScrollView style={{ marginTop: 20, flex: 1 }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={globalImages.module_login_course_ic_invalid}
          />
          <View style={{ height: 100, backgroundColor: 'blue' }} />
          <View style={{ height: 1000, backgroundColor: 'red' }} />
        </ScrollView>
        <Button />
      </>,
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
}
