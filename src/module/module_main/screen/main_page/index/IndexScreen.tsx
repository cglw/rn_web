import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { HeaderView } from '@/module/module_common/component/HeaderView';
import { Button, Icon } from '@ant-design/react-native';
import { RouterManager } from '@/sdk/router/RouterManager';
import { observer } from 'mobx-react';
const PAGE_DEMO = [
  {
    name: 'flatListDemo',
    target: 'demo',
  },
  {
    name: '简单列表',
    target: 'simple',
  },
  {
    name: 'sectionList',
    target: 'section',
  },
  {
    name: '加载数据',
    target: 'load',
  },
  {
    name: 'List',
    target: 'list',
  },
];

class IndexScreen extends React.Component {
  render() {
    // @ts-ignore
    return wrapWithSafe(
      <>
        <HeaderView isHideBack={true} title={'主页'} />
        <Icon name="account-book" size="md" color="red" />
        <Button
          onPress={() => {
            RouterManager.getInstance().push('login');
          }}>
          {globalStore.accountStore.isLogin ? '已登录' : '去登录'}
        </Button>
        <ScrollView>
          {PAGE_DEMO.map(item => (
            <Button
              style={styles.btn}
              key={item.name}
              onPress={() => globalRouter.push(item.target)}>
              {item.name}
            </Button>
          ))}
        </ScrollView>
      </>,
    );
  }
}
const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
  },
});
export const IndexScreenContainer = observer(IndexScreen);
