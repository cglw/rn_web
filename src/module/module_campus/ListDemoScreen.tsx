import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native';
import React, { Component } from 'react';
// import { listenerCount } from 'cluster';
// @ts-ignore
// import RefreshControl from 'react-native-web-refresh-control/src/RefreshControl';

type Props = {};

type State = {
  listData: Array<any>;
  timeStamp: number;
};

export class ListDemoScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listData: [{ isCheck: false }, { isCheck: false }],
      timeStamp: 0,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.state.listData[0].isCheck = true;
            this.setState({
              // timeStamp: new Date().getTime(),
            });
          }}>
          click
        </Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={true}
              onRefresh={() => {
                console.info('onRefresh===>');
              }}
            />
          }
          data={this.state.listData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
  renderItem = (item: any) => {
    console.info('renderItem');
    return (
      <View style={{ height: 100, backgroundColor: 'red', marginTop: 100 }}>
        <Text>{item.item.isCheck ? 'true' : 'false'}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
