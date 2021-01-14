import React, { Component } from 'react';
import { wrapWithSafe } from '../../module_common/component/RootContainerView';
import { HeaderView } from '../../module_common/component/HeaderView';
import { Text, View } from 'react-native';
import Touchable from '../../module_common/component/Touchable';
import { Button, Icon } from '@ant-design/react-native';
import { observer } from 'mobx-react';

class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.info('777777');
    return wrapWithSafe(
      <>
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
