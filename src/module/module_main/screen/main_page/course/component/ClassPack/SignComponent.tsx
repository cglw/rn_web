import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  value: string;
};

export class SignComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.value}</Text>
        <View style={styles.triangle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: 45,
    height: 18,
    backgroundColor: '#000000',
    borderTopLeftRadius: 2.5,
    borderBottomRightRadius: 2.5,
    position: 'absolute',
    zIndex: 3,
    top: -3.5,
    paddingLeft: 4,
    paddingRight: 4,
    'background-image': 'linear-gradient(to right, #FF8552, #FF526F)',
    // 'background-image': 'linear-gradient(to right, black, white)',
  },
  triangle: {
    position: 'absolute',
    right: -3,
    width: 0,
    height: 0,
    borderTopWidth: 3.5,
    borderLeftWidth: 3,
    borderTopColor: '#fff',
    borderLeftColor: '#DA2748',
  },
  text: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    lineHeight: 18,
  },
});
