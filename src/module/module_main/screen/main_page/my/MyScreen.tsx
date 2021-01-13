import React from 'react';
import { Text } from 'react-native';
import { RouterManager } from '../../../../../sdk/router/RouterManager';
export class MyScreen extends React.Component {
  componentDidMount() {
    console.info('index====>');
    RouterManager.getInstance().push('login', { router: 'person' });
  }

  render() {
    return <Text onPress={() => {}}>我的32</Text>;
  }
}
