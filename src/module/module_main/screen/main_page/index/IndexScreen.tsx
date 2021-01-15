import React from 'react';
import { wrapWithSafe } from '../../../../module_common/component/RootContainerView';
import { HeaderView } from '../../../../module_common/component/HeaderView';
import { Button, Icon } from '@ant-design/react-native';
import { View, ScrollView } from 'react-native';
import { RouterManager } from '../../../../../sdk/router/RouterManager';
// import testV from './testView';
import { List } from '@ant-design/react-native';
import { observer } from 'mobx-react';
const Item = List.Item;
const Brief = Item.Brief;
// import BasicListExample from '@ant-design/react-native/lib/list/demo/basic';

class IndexScreen extends React.Component {
  componentDidMount() {
    console.info('666');
    // testV();
  }

  render() {
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

        <Button
          onPress={() => {
            RouterManager.getInstance().push('demo');
          }}>
          {'test'.itn()}
        </Button>
        <Button
          onPress={() => {
            RouterManager.getInstance().push('sectionList');
          }}>
          {'count'.itn({ count: 666 })}
        </Button>

        <ScrollView
          style={{ flex: 1, backgroundColor: '#f5f5f9' }}
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
                  <Brief style={{ textAlign: 'right' }}>辅助文字内容</Brief>
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
                  <Brief style={{ textAlign: 'right' }}>辅助文字内容</Brief>
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
            <Item
              thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
              arrow="horizontal">
              thumb
            </Item>
          </List>
        </ScrollView>
      </>,
    );
  }
}
export const IndexScreenContainer = observer(IndexScreen);
// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'red',
//     marginTop: 10,
//   },
// });
// //
