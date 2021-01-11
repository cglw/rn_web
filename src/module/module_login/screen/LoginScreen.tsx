import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { getWindowHeight } from '../../../utils/ScreenUtil';
import { wrapWithSafe } from '../../module_common/component/ViewRootContainer';
import { Button, Result } from '@ant-design/react-native';
// import { IObservableArray, IObservableValue } from 'mobx/dist/internal';

function wrapper(a: any) {
  if (typeof a === 'number') {
    return observable({ value: a });
  }
  return observable(a);
}

type P = {
  testVal?: number;
  callBack: any;
};

function Hello(props: P) {
  //挂属性的
  // const [num] = useState();

  // props.testVal;

  const handleInc = () => {
    console.info(globalStore);
    globalStore.accountStore.increment();
  };
  const handleDec = () => {
    globalStore.accountStore.dec();
  };
  return (
    <View>
      <Text>{'hello'}</Text>
      <Text>{props.testVal}</Text>
      <Text onPress={handleDec} style={{ height: 100 }}>
        Dec
      </Text>
      <Text onPress={handleInc} style={{ height: 100 }}>
        inc
      </Text>
      <Text style={{ height: 100 }}>{globalStore.accountStore.time}</Text>
    </View>
  );
}
// const HelloView = observer(Hello);

type St = {
  time: number;
};
type Prop = {
  time: number;
};

// 让页面的值可以监听
@observer
export default class LoginScreen extends Component<Prop, St> {
  date: string = '';
  dir: boolean = false;
  price = wrapper(1);
  data = wrapper([1231, 23]);

  constructor(props: any) {
    super(props);
    this.state = {
      time: 0,
    };
    // this.props?.time.toFixed(2);
    console.info('6666');
    console.info('props.rootStore');
    // this.state.time
    // console.info(props.rootStore.accountStore.time);
    // LoginApi.getMainTabsObj()
    //   .then(res => {
    //     console.info('getMainTabs response');
    //     console.info(res.style);
    //   })
    //   .catch(err => {
    //     console.info(err);
    //   });
  }

  render() {
    console.info('getWindowHeight()');
    console.info(getWindowHeight());
    return wrapWithSafe(
      <>
        {/*<Observer>{() => Hello()}</Observer>*/}
        {/*<Text onPress={this.handleDec} style={{ height: 100 }}>*/}
        {/*  Dec*/}
        {/*</Text>*/}
        {/*<Text onPress={this.handleInc} style={{ height: 100 }}>*/}
        {/*  inc*/}
        {/*</Text>*/}
        <Result
          imgUrl={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/GcBguhrOdlYvGfnsXgrE.png',
          }}
          title="验证成功"
          message="所提交内容已成功完成验证"
        />

        <Text style={{ height: 100 }}>{globalStore.accountStore.time}</Text>
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
}
