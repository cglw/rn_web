import { SegmentedControl } from '@ant-design/react-native';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';

export class SegmentedComponent extends React.Component {
  render() {
    return (
      <View>
        <Text>Disabled</Text>
        {/* <SegmentedControl values={['Segment1', 'Segment2']} disabled /> */}
        <SegmentedControl
          values={['Segment1', 'Segment2', 'Segment3']}
          tintColor={'#ff0000'}
          style={{ height: 40, width: 280 }}
        />
      </View>
    );
  }
}
