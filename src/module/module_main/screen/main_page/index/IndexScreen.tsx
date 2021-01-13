import React from 'react';
import { wrapWithSafe } from '../../../../module_common/component/RootContainerView';
import { HeaderView } from '../../../../module_common/component/HeaderView';
import { Button, Icon } from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { RouterManager } from '../../../../../sdk/router/RouterManager';
// import testV from './testView';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
// import BasicListExample from '@ant-design/react-native/lib/list/demo/basic';

export class IndexScreen extends React.Component {
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
          }}
        />
        {/*<BasicListExample />*/}
        {/*<ListView*/}
        {/*  onFetch={this.onFetch}*/}
        {/*  keyExtractor={(item, index) => index.toString()}*/}
        {/*  renderItem={this.renderItem}*/}
        {/*/>*/}
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
            {/*<Item*/}
            {/*  extra={*/}
            {/*    <Image*/}
            {/*      source={{*/}
            {/*        uri:*/}
            {/*          'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',*/}
            {/*      }}*/}
            {/*      style={{ width: 29, height: 29 }}*/}
            {/*    />*/}
            {/*  }*/}
            {/*  arrow="horizontal">*/}
            {/*  extra为Image*/}
            {/*</Item>*/}
          </List>
        </ScrollView>
      </>,
    );
  }
  // @ts-ignore
  renderItem = item => {
    return (
      <View style={{ padding: 10, marginTop: 20 }}>
        <Text>{item}</Text>
      </View>
    );
  };

  // renderItem() {
  //   return <View style={styles.item} />;
  // }
  sleep = (time: any) =>
    new Promise(resolve => setTimeout(() => resolve(0), time));

  // @ts-ignore
  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      let pageLimit = 30;
      const skip = (page - 1) * pageLimit;

      //Generate dummy data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let rowData = Array.from(
        { length: pageLimit },
        (_, index) => `item -> ${index + skip}`,
      );

      //Simulate the end of the list if there is no more data returned from the server
      if (page === 3) {
        rowData = [];
      }

      //Simulate the network loading in ES7 syntax (async/await)
      await this.sleep(2000);
      startFetch(rowData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };
}
// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'red',
//     marginTop: 10,
//   },
// });
// //
