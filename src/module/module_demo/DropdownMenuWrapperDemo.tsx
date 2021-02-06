import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';

import {
  DropdownMenuWrapper,
  MenuData,
} from '@/module/module_common/component/menu/DropdownMenuWrapper';
import { CheckedInfo } from '@/module/module_common/component/list/DoubleSelectList';
import { SORT_STATUS } from '@/module/module_common/component/menu/MenuTab';

type Props = {};

export class DropdownMenuWrapperDemo extends Component<Props, any> {
  data: MenuData<any>[];
  double_list_data: any;
  multiAttrData: any;

  constructor(props: Props) {
    super(props);
    this.double_list_data = [
      {
        text: '语文',
        children: [{ text: '语文1' }, { text: '语文2' }, { text: '语文3' }],
      },
      {
        text: '数学',
        children: [{ text: '语文6' }, { text: '语文8' }, { text: '语文9' }],
      },
      {
        text: '英语',
        children: [{ text: '语文1' }, { text: '语文2' }, { text: '语文3' }],
      },
    ];

    this.multiAttrData = [
      {
        text: 22312,
        children: [
          { id: 2, text: '测试1' },
          {
            id: 3,
            text: '测试2',
          },
          {
            id: 4,
            text: '测试3',
          },
          {
            id: 5,
            text: '测试4',
          },
          {
            id: 6,
            text: '测试5',
          },
        ],
        selectIndex: 1,
      },
      {
        text: 3,
        children: [
          {
            id: 7,
            text: '测试2',
          },
        ],
        selectIndex: -1,
      },
    ];

    this.data = [
      {
        tabType: 'single',
        list: ['test', 't2', 't4'],
        title: 'tab1',
        selectInfo: 1,
      },
      {
        tabType: 'double',
        list: this.double_list_data,
        title: 'double',
        selectInfo: new CheckedInfo(0, 2),
      },
      {
        tabType: 'multi',
        list: this.multiAttrData,
        title: 'tab3',
        selectInfo: [1, 0],
      },
      {
        tabType: 'sort',
        title: '价格',
        selectInfo: SORT_STATUS.INIT,
      },
    ];
  }

  render() {
    console.info('render');
    return wrapWithSafe(
      <View style={styles.container}>
        <DropdownMenuWrapper
          data={this.data}
          onSelectCallBack={selectedInfo => {
            console.info('result====>');
            console.info(selectedInfo);
          }}
        />
      </View>,
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
