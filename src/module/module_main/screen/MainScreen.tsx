// @flow
'use strict';
import React, {Component, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';

type State = {
  count: number;
  refreshing: boolean;
};
type Props = {
  navigation: any;
};

class ItemData {
  id: number = 0;
  title: string = '';

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

const DATA: Array<any> = [new ItemData(1, '222')];
class MyFlatList extends FlatList<ItemData> {
  test() {
    console.info('test');
  }
}

export class MainScreen extends Component<Props, State> {
  flatList?: React.ElementRef<typeof MyFlatList>;

  constructor(props) {
    super(props);
    // this.state.refreshing = false;
    for (let i = 0; i < 100; i++) {
      let itemData = new ItemData(i, `First 222Item${i}`);
      DATA.push(itemData);
    }
    // this.flatList=u
  }
  componentDidMount() {}
  _captureRef = (ref) => {
    // this.flatList = ref;
    console.info('getScrollableNode');
    console.info(ref.getScrollableNode());
    setTimeout(() => {
      console.info('scrollToIndex');
      ref.scrollToEnd();
      ref.test();
      console.info(ref.getNativeScrollRef());
    }, 2000);
  };

  render() {
    console.info('5555');
    return (
      <View style={{marginTop: 100}}>
        <Text>{'login'.itn()}</Text>
        <MyFlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                console.info('onRefresh');
                // this.setState({
                //   refreshing: true,
                // });
                // setTimeout(() => {
                //   this.setState({
                //     refreshing: false,
                //   });
                // }, 2000);
              }}
              refreshing={false}
            />
          }
          ref={this._captureRef}
          data={DATA}
          renderItem={({item}) => {
            return <Text>{item.title}</Text>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
