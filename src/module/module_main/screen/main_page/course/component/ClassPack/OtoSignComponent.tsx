import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

export class OtoSignComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>一对一</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 19,
    backgroundColor: '#000000',
    opacity: 0.5,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    zIndex: 3,
  },
  text: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    lineHeight: 19,
  },
});
