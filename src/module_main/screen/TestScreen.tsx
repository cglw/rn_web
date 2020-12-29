import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {RouterManager} from '../../router/RouterManager';
type State = {};
type Props = {
  navigation: any;
};

export class TestScreen extends Component<Props, State> {
  render() {
    console.info('Platform.OS' + Platform.OS);
    console.info(String.prototype);
    return (
      <View style={{marginTop: 100, backgroundColor: 'green'}}>
        <Text
          onPress={() => {
            RouterManager.getInstance().goBack();
          }}>
          {'login'.itn()}
          {'device'.itn({formatted_number: 8})}
          {'common.register'.itn()}
        </Text>
      </View>
    );
  }
}
