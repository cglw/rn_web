import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  value: string;
};

export const SignView: React.FC<Props> = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.value}</Text>
      <View style={styles.triangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
