import {
  Button,
  Drawer,
  WhiteSpace,
  // WingBlank,
} from '@ant-design/react-native';
import { observable } from 'mobx';
import React from 'react';
import { Text, View } from 'react-native';

export class AntDesignTestScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  drawer: any;
  isOpen = observable.box(true);
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Drawer
          sidebar={<Text>6666</Text>}
          position="right"
          open={true}
          drawerRef={el => (this.drawer = el)}
          //    onOpenChange={this.onOpenChange}
          drawerBackgroundColor="#ccc">
          <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
            <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
              Open drawer
            </Button>
            <WhiteSpace />
          </View>
        </Drawer>
      </View>
    );
  }
  _view() {
    return (
      <View
        style={{
          backgroundColor: '#ccc',
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }
}
