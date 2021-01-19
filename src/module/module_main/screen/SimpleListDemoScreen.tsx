import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import ListView from '../../module_common/component/refresh/ListView';
import { observable } from 'mobx';
// import { observer } from 'mobx-react';
type Props = {};

type State = {
  listData: Array<any>;
  timeStamp: number;
  refreshing: boolean;
};

export class SimpleListDemoScreen extends Component<Props, State> {
  // num: observable.box(1)
  num = observable.box(1);

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
        <Text>{this.num.get()}</Text>
        <Text
          onPress={() => {
            this.num.set(this.num.get() + 1);
          }}>
          {'add'}
        </Text>
        <ListView
          onFetch={() => {
            return new Promise<any>(resolve => {
              setTimeout(() => {
                resolve(new Array(20).fill(0));
              }, 1500);
            });
          }}
          resultCovertToList={res => {
            return res;
          }}
          renderItem={this.renderItem}
          // onFetch={() => Promise.resolve([])}
        />
      </View>,
    );
  }
  renderItem = (item: any) => {
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
// export const SimpleListDemoScreenContainer = observer(SimpleListDemoScreen);
