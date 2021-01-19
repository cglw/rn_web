import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import { LoadDataContainerView } from '../../module_common/component/LoadDataContainerView';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

type Props = {};

export class LoadStateDemoScreen extends Component<Props, any> {
  data = observable.box(0);

  render() {
    return (
      <View style={styles.container}>
        <LoadDataContainerView
          loadingView={<Text>is loading</Text>}
          onFetch={() =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve({ date: '7777', tv: '888' });
              }, 2000);
            })
          }
          onLoadFail={() => {
            console.info('error======>');
          }}
          onLoadSuccess={(res, setLoadState) => {
            console.info(res);
            this.data.set(res.tv);
            console.info(setLoadState);
            // setLoadState(LoadState.Error);
          }}>
          <View style={{ backgroundColor: 'red', width: 100, height: 100 }}>
            <Text>{this.data.get()}</Text>
          </View>
        </LoadDataContainerView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export const LoadStateDemoScreenContainer = observer(LoadStateDemoScreen);
