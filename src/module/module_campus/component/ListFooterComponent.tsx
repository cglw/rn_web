import React from 'react';
import { Button, Text, View } from 'react-native';

export class ListFooterComponent extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 14,
            paddingRight: 14,
          }}>
          <Text style={{ color: '#333333', lineHeight: 16.5, fontSize: 11 }}>
            您当前选择成为
            <Text
              style={{
                color: '#FC5623',
                lineHeight: 16.5,
                fontWeight: 'bold',
              }}>
              [建邺区]建邺第一分校
            </Text>
            的学员，确定后不可更改
          </Text>
        </View>
        <View style={{ height: 44, paddingRight: 14, paddingLeft: 14 }}>
          <Button
            title={'确定'}
            onPress={() => alert(1111)}
            color={'#FC5623'}
          />
        </View>
      </View>
    );
  }
}
