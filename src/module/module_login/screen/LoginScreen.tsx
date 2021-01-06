import React, {Component, PureComponent, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {LoginApi} from '../api/LoginApi';
import {Http} from '../../module_common/http/Http';
import {NavResponse} from '../bean/response/NavResponse';
import {List, ListView} from '@ant-design/react-native';
import Item, {Brief} from '@ant-design/react-native/es/list/ListItem';

type P = {
  sex: string;
};

class P1 {
  test: number = 0;
}

type State = {
  testdata: number;
};

const hello: React.FC<P> = (props) => {
  // let [useState,setState] = useState(0);
  // useStore

  return <></>;
};

// 让页面的值可以监听
@observer
class LoginScreen extends Component<P, State> {
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
      <View style={{flex: 1}}>
        {/*<Hello   sex={}/>*/}
        <Text>{'login'.itn()}</Text>
        <Text>{'count'.itn({count: 9999})}</Text>
        <Text>{globalStore.accountStore.time}</Text>
        {/*<Text>{this.state.testdata}</Text>*/}

        {/*{globalImages.open}*/}

        <Text onPress={this.handleInc}>{'+'}</Text>
        <Text onPress={this.handleDec}>{'-'}</Text>

        <ScrollView
          style={{flex: 1, backgroundColor: '#f5f5f9'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <List renderHeader={'basic'}>
            <Item data-seed="logId">
              标题文字点击无反馈，文字超长则隐藏，文字超长则隐藏
            </Item>
            <Item wrap>
              文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行
            </Item>
            <Item
              disabled
              extra="箭头向右"
              arrow="horizontal"
              onPress={() => {}}>
              标题文字
            </Item>
            <Item extra="箭头向下" arrow="down" onPress={() => {}}>
              标题文字
            </Item>
            <Item extra="箭头向上" arrow="up" onPress={() => {}}>
              标题文字
            </Item>
            <Item extra="没有箭头" arrow="empty">
              标题文字
            </Item>
            <Item
              extra={
                <View>
                  内容内容
                  <Brief style={{textAlign: 'right'}}>辅助文字内容</Brief>
                </View>
              }
              multipleLine>
              垂直居中对齐
            </Item>
            <Item extra="内容内容" multipleLine>
              垂直居中对齐<Brief>辅助文字内容</Brief>
            </Item>
            <Item
              wrap
              extra="文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行"
              multipleLine
              align="top"
              arrow="horizontal">
              顶部对齐
              <Brief>辅助文字内容辅助文字内容辅助文字内容辅助文字内容</Brief>
              <Brief>辅助文字内容</Brief>
            </Item>
            <Item
              extra={
                <View>
                  内容内容
                  <Brief style={{textAlign: 'right'}}>辅助文字内容</Brief>
                </View>
              }
              multipleLine
              align="bottom">
              底部对齐
            </Item>
          </List>
          <List renderHeader={'带缩略图'}>
            <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png">
              thumb
            </Item>
          </List>
        </ScrollView>

        {/*<ListView*/}
        {/*  onFetch={this.onFetch}*/}
        {/*  renderItem={() => {*/}
        {/*    return (*/}
        {/*      <View*/}
        {/*        style={{*/}
        {/*          height: 100,*/}
        {/*          backgroundColor: 'red',*/}
        {/*          marginTop: 10,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<FlatList*/}
        {/*  data={Array(100).fill(8)}*/}
        {/*  renderItem={() => {*/}
        {/*    return (*/}
        {/*      <View*/}
        {/*        style={{*/}
        {/*          height: 100,*/}
        {/*          backgroundColor: 'red',*/}
        {/*          marginTop: 10,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    );
  }

  // sleep = (time: any) =>
  //   new Promise((resolve) => setTimeout(() => resolve(), time));
  onFetch = async (page = 1, startFetch, abortFetch) => {
    return Promise.reject(Array(100).fill(8));
  };
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

  async loadData() {
    const data = await Promise.all([LoginApi.getNav(), LoginApi.getNav()]);
    console.info('loadData');
    console.info(data);
    Http.load('api/app/nav')
      .originResponse()
      .post<NavResponse>()
      .then((res) => {
        console.info(res.getNavList());
      })
      .catch((err) => {
        console.info(err);
      });
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
