import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import ListView from '../../module_common/component/refresh/ListView';
import { wrapWithSafe } from '../../module_common/component/RootContainerView';

type Props = {};

type State = {
  listData: Array<any>;
  timeStamp: number;
  refreshing: boolean;
};

export class SimpleListDemoScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listData: [{ isCheck: false }, { isCheck: false }],
      timeStamp: 0,
      refreshing: false,
    };
  }
  sleep = function (time: number) {
    let startTime = new Date().getTime() + time;
    while (new Date().getTime() < startTime) {}
  };
  render() {
    console.info('render=====>');
    return wrapWithSafe(
      <View style={styles.container}>
        <ListView
          onFetchReq={() => {
            console.info('onFetchReq====>');
            return new Promise<any>(resolve => {
              setTimeout(() => {
                resolve(new Array(20).fill(0));
              }, 1000);
            });
          }}
          resultCovertToList={res => {
            console.info('resultCovertToList');

            return res;
          }}
          renderItem={this.renderItem}
        />
      </View>,
    );
  }
  renderItem = (item: any) => {
    console.info('renderItem');
    return (
      <View style={{ height: 100, backgroundColor: 'red', marginTop: 10 }}>
        <Text>{item.index}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
