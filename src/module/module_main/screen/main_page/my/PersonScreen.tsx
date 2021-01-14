import React from 'react';
import { Text } from 'react-native';
export class PersonScreen extends React.Component {
  componentDidMount() {
    console.info('index====>');
  }

  render() {
    return <Text onPress={() => {}}>我的32</Text>;
  }
}
