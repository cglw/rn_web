import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import ListView from '../../module_common/component/refresh/ListView';
export class SectionListDemoScreen extends Component {
  constructor(props: any) {
    super(props);
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
          onFetch={() => {
            console.info('onFetchReq====>');
            return new Promise<any>(resolve => {
              setTimeout(() => {
                resolve([
                  {
                    title: 'Main dishes',
                    data: ['Pizza', 'Burger', 'Risotto'],
                  },
                  {
                    title: 'Sides',
                    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
                  },
                  {
                    title: 'Drinks',
                    data: ['Water', 'Coke', 'Beer'],
                  },
                  {
                    title: 'Desserts',
                    data: ['Cheese Cake', 'Ice Cream'],
                  },
                ]);
              }, 1000);
            });
          }}
          resultCovertToList={res => {
            console.info('resultCovertToList');
            return res;
          }}
          renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
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
