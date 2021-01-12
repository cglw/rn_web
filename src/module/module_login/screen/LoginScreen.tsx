import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { wrapWithSafe } from '../../module_common/component/RootContainerView';
import { HeaderView } from '../../module_common/component/HeaderView';
import { View } from 'react-native';

// 让页面的值可以监听
@observer
export default class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return wrapWithSafe(
      <>
        <HeaderView
          edgeWidth={50}
          title={'测试数据测试数据测试数据测试数据测试数据测试数据'}
          rightView={
            <View
              style={{ width: 50, height: '100%', backgroundColor: 'blue' }}
            />
          }
        />
      </>,
    );
  }
}
