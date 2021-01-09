import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { RouterManager } from '../../../sdk/router/RouterManager';
import Button from '@ant-design/react-native/lib/button';

// import {Carousel} from '@ant-design/react-native';
type State = {};
type Props = {
  navigation: any;
};

export class TestScreen extends Component<Props, State> {
  render() {
    console.info('Platform.OS' + Platform.OS);
    console.info(String.prototype);
    return (
      <View style={{ marginTop: 100, backgroundColor: 'green' }}>
        <Text
          onPress={() => {
            RouterManager.getInstance().goBack();
          }}
        />
        {/*<Result />*/}
        <Button />
        {/*<Button />*/}
        {/*<Result title="验证成功" message="所提交内容已成功完成验证" />*/}
      </View>
    );
  }
}
