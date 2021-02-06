import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { DropdownMenu } from '@/module/module_common/component/menu/DropdownMenu';
import { MenuTabView } from '@/module/module_common/component/menu/MenuTab';
import { SingleSelectList } from '@/module/module_common/component/list/SingleSelectList';
import { DoubleSelectList } from '@/module/module_common/component/list/DoubleSelectList';
import { observable } from 'mobx';
import { MultiAttrSelectList } from '@/module/module_common/component/list/MultiAttrSelectList';

type Props = {};

export class DropdownMenuDemo extends Component<Props, any> {
  data: any;
  double_list_data: any;
  meunView: any;
  multiAttrData: any;
  doubleCheck = observable.box({
    leftIndex: 0,
    rightIndex: -1,
  });
  singleCheck = observable.box(-1);
  multiCheck = observable.box();

  constructor(props: Props) {
    super(props);
    this.data = ['test', 't2', 't4'];
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
    this.state = {
      leftIndex: -1,
      rightIndex: -1,
    };
  }

  render() {
    return wrapWithSafe(
      <View style={styles.container}>
        <DropdownMenu
          contentPositions={['', '', 'right']}
          ref={ref => (this.meunView = ref)}
          tabs={['test', 'test2', 'test3']}
          renderTab={(index, isChecked, data) => (
            <MenuTabView
              selectedValue={
                index === 0 ? (this.singleCheck.get() > 0 ? 'test' : '') : ''
              }
              isChecked={isChecked}
              text={data}
            />
          )}
          renderContent={(index: number) => {
            console.info(index);
            if (index === 2) {
              return (
                <MultiAttrSelectList
                  data={this.multiAttrData}
                  contentWidth={300}
                  onResetCallBack={() => {
                    this.multiCheck.set([]);
                    this.meunView.openOrClosePanel(2);
                  }}
                  onConfirmCallBack={selects => {
                    this.multiCheck.set(selects);
                    this.meunView.openOrClosePanel(2);
                  }}
                  selectIndex={this.multiCheck.get()}
                />
              );
            }
            return index === 0 ? this.renderA() : this.renderB();
          }}
        />
      </View>,
    );
  }
  renderA() {
    return (
      <SingleSelectList
        data={this.data}
        selectIndex={this.singleCheck.get()}
        onItemClick={(index: number) => {
          console.info(index);
          this.singleCheck.set(index);
          this.meunView.openOrClosePanel(0);
        }}
      />
    );
  }
  renderB() {
    return (
      <DoubleSelectList
        listData={this.double_list_data}
        onClickRightItem={checkedInfo => {
          console.info(checkedInfo);
          this.meunView.openOrClosePanel(1);
          this.doubleCheck.set({
            leftIndex: checkedInfo.leftIndex,
            rightIndex: checkedInfo.rightIndex,
          });
        }}
        checkLeftIndex={this.doubleCheck.get().leftIndex}
        checkRightIndex={this.doubleCheck.get().rightIndex}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
