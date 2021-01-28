import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import { LoadDataContainerView } from '../../module_common/component/LoadDataContainerView';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ErrorView from '@/module/module_common/component/placeholder/ErrorView';
import { Toast, Modal } from '@design';
import { Portal } from '@ant-design/react-native';

type Props = {};

export class LoadStateDemoScreen extends Component<Props, any> {
  data = observable.box(0);
  componentDidMount() {
    // Modal.alert()
    let key = Portal.add(
      <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />,
    );
    setTimeout(() => {
      Portal.remove(key);
    }, 2000);
    // Portal.remove()
    // Modal.prompt(
    //   'Input password',
    //   'password message',
    //   password => console.log(`password: ${password}`),
    //   'secure-text',
    //   'defaultValue',
    // );
  }

  render() {
    return (
      <View style={styles.container}>
        <LoadDataContainerView
          errorView={
            <ErrorView
              onPress={() => {
                Toast.info('Toast without mask !!!', 1, undefined, false);
              }}
            />
          }
          loadingView={<Text>is loading</Text>}
          onFetch={() =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // resolve({ date: '7777', tv: '888' });
                reject({ date: '7777', tv: '888' });
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
