import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListView } from '@ant-design/react-native';

export class ViewListScreen extends Component {
  render() {
    return (
      <ListView
        onFetch={this.onFetch}
        keyExtractor={(item, index) => `${item} - ${index}`}
        numColumns={1}
        // renderSectionHeader={}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem(item: any) {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.content[0]}</Text>
        <Text>{item.content[1]}</Text>
        <Text>{item.content[2]}</Text>
      </View>
    );
  }

  sleep = (time: number) =>
    new Promise<void>(resolve => setTimeout(() => resolve(), time));

  onFetch = async (page = 1, startFetch: any, abortFetch: any) => {
    try {
      let Data = [
        {
          title: 'first',
          content: ['srt', 'serf', 'ghgfd'],
        },
        {
          title: 'second',
          content: ['123', '452', '23412'],
        },
        {
          title: 'third',
          content: ['cvvv', 'secvxcvrf', 'zxcz'],
        },
        {
          title: 'fourth',
          content: ['hgjjf', 'sdfasd', 'lolp;'],
        },
      ];

      await this.sleep(2000);
      startFetch(Data, page);
    } catch (err) {
      // console.log(err);
      abortFetch();
    }
  };
}
