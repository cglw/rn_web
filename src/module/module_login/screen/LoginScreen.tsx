import React, { Component } from 'react';
// import { observer } from 'mobx-react';
import { wrapWithSafe } from '../../module_common/component/RootContainerView';
import { HeaderView } from '../../module_common/component/HeaderView';
import { Text, View } from 'react-native';
import Touchable from '../../module_common/component/Touchable';
import { Icon } from '@ant-design/react-native';
// import { RouterManager } from '../../../sdk/router/RouterManager';
// import { inflate } from 'zlib';

// 让页面的值可以监听
// @observer
export default class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    console.info('login');
    console.info(props.route.params.router);
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
      </>,
    );
  }
}
