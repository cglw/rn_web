import React from 'react';
import { Text, View } from 'react-native';
import ListView from '../../module_common/component/refresh/ListView';

export class ListScreen extends React.Component {
  // constructor(parameters) {}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          onFetch={() => {
            console.log(234234);
            // return [
            //   {
            //     title: 'first',
            //     content: ['srt', 'serf', 'ghgfd'],
            //   },
            //   {
            //     title: 'second',
            //     content: ['123', '452', '23412'],
            //   },
            //   {
            //     title: 'third',
            //     content: ['cvvv', 'secvxcvrf', 'zxcz'],
            //   },
            //   {
            //     title: 'fourth',
            //     content: ['hgjjf', 'sdfasd', 'lolp;'],
            //   },
            // ];
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
          // renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
          renderItem={this.renderItem}
        />
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            padding: 20,
          }}>
          <View style={{ backgroundColor: 'blue', flex: 0.3 }} />
          <View style={{ backgroundColor: 'red', flex: 0.5 }} />
          <Text>Hello World!</Text>
        </View>
      </View>
    );
  }

  renderItem = (item: any) => {
    console.log();
    return (
      <View style={{ height: 100, backgroundColor: 'red', marginTop: 10 }}>
        <Text>{item.item.title}</Text>
      </View>
    );
  };
}
