import { View, StyleSheet, FlatList, Text } from 'react-native';
import React, { Component } from 'react';

type Props = {};

type State = {
  listData: Array<any>;
  timeStamp: number;
  refreshing: boolean;
};

export class ListDemoScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listData: [{ isCheck: false }, { isCheck: false }],
      timeStamp: 0,
      refreshing: false,
    };
  }
  render() {
    console.info('render=====>');
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.state.listData[0].isCheck = true;
            this.setState({
              timeStamp: new Date().getTime(),
            });
          }}>
          click
        </Text>
        <FlatList
          onRefresh={() => {
            this.setState({
              refreshing: true,
            });
            setTimeout(() => {
              this.setState({
                refreshing: false,
              });
            }, 2000);
          }}
          refreshing={this.state.refreshing}
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
    marginTop: 100,
  },
});
