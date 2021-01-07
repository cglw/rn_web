// @flow
'use strict';
import React, {Component} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {RouterManager} from '../../../sdk/router/RouterManager';
import AutoSizeSheet from '../../../sdk/AutoSizeSheet';
import {getWindowWidth} from '../../../utils/ScreenUtil';
import {TabBar} from '@ant-design/react-native';
import {TestScreen} from './TestScreen';

export class MainScreen extends Component<any> {
  render() {
    console.info('5555');
    return (
      <View style={{marginTop: 100, ...globalStyles.center}}>
        <Text
          style={styles.text}
          onPress={() => {
            RouterManager.getInstance().push('login');
          }}>
          {'login'.itn()}
        </Text>
        <Text>{'register'.itn()}</Text>
        <Text
          onPress={() => {
            routeTo('test');
          }}>
          {'test'.itn()}
        </Text>
        <Image style={styles.img} source={globalImages.ic_lock} />
        <TextInput />
        <TabBar>
          <TabBar.Item title={'1'}>
            <TestScreen navigation={''} />
          </TabBar.Item>
        </TabBar>
      </View>
    );
  }
}
// 默认StyleSheet  AutoSizeSheet可以自动缩放布局
const styles = AutoSizeSheet.create(
  {
    text: {
      fontSize: 10,
    },
    img: {
      backgroundColor: 'red',
      width: 100,
      height: 100,
    },
  },
  getWindowWidth(),
);
