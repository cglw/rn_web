import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

type Props = {
  data: any;
};

export class DropdownMenu extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'red',
            flexDirection: 'row',
          }}>
          {/*{this.props.data.map((rows, index) => (*/}
          {/*  <TouchableOpacity*/}
          {/*    activeOpacity={1}*/}
          {/*    onPress={this.openOrClosePanel.bind(this, index)}*/}
          {/*    key={index}*/}
          {/*    style={{*/}
          {/*      flex: 1,*/}
          {/*      height: 48,*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*    }}>*/}

          {/*      {this.renderDropDownArrow(index)}*/}
          {/*    </View>*/}
          {/*  </TouchableOpacity>)}*/}
        </View>
        {this.props.children}
        {this.renderActivityPanel()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
