// import { DatePicker, List } from '@ant-design/react-native';
import React from 'react';
import { View } from 'react-native';

export class DatePickerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <DatePicker
          // value={}
          mode="date"
          defaultDate={new Date()}
          minDate={new Date(2015, 7, 6)}
          maxDate={new Date(2026, 11, 3)}
          onChange={() => {
            console.log('点击');
          }}
          format="YYYY-MM-DD">
          <List.Item arrow="horizontal">Select Date</List.Item>
        </DatePicker> */}
      </View>
    );
  }
}
