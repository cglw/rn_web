// @flow
'use strict';
import React, {Component, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import {Http} from '../../module_common/http/Http';
import {StorageHelper} from '../../sdk/storage/StorageHelper';
import {LruStorageHelper} from '../../sdk/storage/LruStorageHelper';
type State = {
  count: number;
};
type Props = {
  navigation: any;
};
type HelloProps = {
  name: string;
};
//
// const Hello: React.FC<HelloProps> = (props: HelloProps) => {
//   return <View />;
// };
function Hello(props) {
  let [count, setCount] = useState(0);
  // hook

  return (
    <Text
      onPress={() => {
        setCount(++count);
      }}>
      {count}
    </Text>
  );
}

export class MainScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Http.get('api/app/banner')
    //   .then((res) => {
    //     console.info('response======>');
    //     console.info(res.code);
    //   })
    //   .catch((error) => {
    //     console.info('error=====>');
    //     console.info(error);
    //   });

    let body = {
      id: 21,
    };
    Http.load('api/app/courseChapterApp')
      .body(body)
      .post()
      .then((res) => {
        console.info(res);
      })
      .catch((error) => {
        console.info(error);
      });
    Http.post('api/app/courseChapterApp', body)
      .then((res) => {
        console.info(res.code);
      })
      .catch((error) => {
        console.info(error);
      });

    let a;
    a = [];
    console.info('check');
    console.info(typeof a);
    LruStorageHelper.get('test').then((res) => {
      console.info(res);
    });
  }

  render() {
    console.info('5555');
    // console.info()
    return (
      <View style={{marginTop: 100}}>
        <Hello />
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
//
// const styles = AutoSizeSheet.create({
//   test: {
//     marginTop: 100,
//   },
// });
