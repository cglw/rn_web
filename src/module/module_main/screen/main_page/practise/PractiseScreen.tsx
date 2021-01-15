import React from 'react';
import { Text } from 'react-native';
import { observer } from 'mobx-react';
export class PractiseScreen extends React.Component {
  render() {
    return wrapWithSafe(
      <>
        <Text>练习</Text>
        <Text
          onPress={() => {
            console.info('add');
            // globalStore.mainListStore.num += 1;
            // globalStore.mainListStore.
          }}>
          add
        </Text>
      </>,
    );
  }
}
export const PractiseScreenContainer = observer(PractiseScreen);
