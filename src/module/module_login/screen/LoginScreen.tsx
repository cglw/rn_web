import React, { Component } from 'react';
import { HeaderView } from '../../module_common/component/HeaderView';
import { Text, View } from 'react-native';
import Touchable from '../../module_common/component/Touchable';
import { Icon } from '@ant-design/react-native';

// import { Button, Icon } from '@ant-design/react-native';
// import { Tabs } from 'antd-mobile';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { Button } from '../../../design';
// const tabs = [
//   { title: 'First Tab' },
//   { title: 'Second Tab' },
//   { title: 'Third Tab' },
// ];
class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  action: any;
  componentDidMount() {
    this.action = reaction(
      () => globalStore.mainListStore.count,
      count => {
        console.info('count change' + count);
      },
    );
  }
  componentWillUnmount() {
    this.action();
  }

  render() {
    console.info('777777');
    // const style = {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   height: 150,
    //   backgroundColor: '#fff',
    // };
    return wrapWithSafe(
      <>
        {/*<Tabs tabs={tabs}>*/}
        {/*  <View style={{ flex: 1 }}>*/}
        {/*    <Text>Content of First Tab</Text>*/}
        {/*  </View>*/}
        {/*  <View style={{ flex: 1 }}>*/}
        {/*    <Text>Content of Second Tab</Text>*/}
        {/*  </View>*/}
        {/*  <View style={{ flex: 1 }}>*/}
        {/*    <Text>Content of Third Tab</Text>*/}
        {/*  </View>*/}
        {/*</Tabs>*/}
        <HeaderView
          edgeWidth={50}
          title={'1223123'}
          rightView={
            <Touchable
              onPress={() => {
                console.info('7777');
              }}>
              <View
                style={{ width: 50, height: '100%', backgroundColor: 'blue' }}
              />
            </Touchable>
          }
        />
        <Text
          onPress={() => {
            console.info('7777');
          }}>
          66666
        </Text>
        <Icon name="account-book" size="md" color="red" />
        <Text>{`登录状态${globalStore.accountStore.isLogin}`}</Text>
        <Button
          onPress={() => {
            globalStore.accountStore.loginSuccess();
            // globalRouter.goBack();
          }}>
          模拟登录成功{' '}
        </Button>
        <Button
          onPress={() => {
            globalStore.accountStore.loginOut();
          }}>
          模拟退出登录{' '}
        </Button>
      </>,
    );
  }
}
export const LoginScreenContainer = observer(LoginScreen);
