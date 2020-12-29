// @flow
'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import {Http} from '../../module_common/Http';
type State = {
  count: number;
};
type Props = {
  navigation: any;
};

export class MainScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Http.get('api/app/banner')
      .then((res) => {
        console.info('response======>');
        console.info(res.code);
      })
      .catch((error) => {
        console.info('error=====>');
        console.info(error);
      });

    // Http.get('api/app/getUCenterInfo')
    //   .then((res) => {
    //     console.info('response======>');
    //     console.info(res.code);
    //   })
    //   .catch((error) => {
    //     console.info('error=====>');
    //     console.info(error);
    //   });
  }

  render() {
    console.info('5555');
    // console.info()
    return (
      <View style={{marginTop: 100}}>
        <Button>Start</Button>
        <TouchableOpacity
          onPress={() => {
            console.log('77777');
            this.props.navigation.navigate('test');
            // RouterManager.getInstance().push('test', {name: 'Jane'});
          }}>
          <View
            style={{
              width: 100,
              height: 200,
              backgroundColor: 'red',
              marginBottom: 100,
            }}
          />
        </TouchableOpacity>
        <Text
          onPress={() => {
            console.info('77777');
          }}>
          {'test'}
        </Text>
        <Text
          onPress={() => {
            console.info('77777');
          }}>
          dkflsdklfks
        </Text>
        {/*<Switch></Switch>*/}
      </View>
    );
  }
}
