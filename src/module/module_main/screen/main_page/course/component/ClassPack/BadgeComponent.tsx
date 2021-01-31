import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

export class BadgeComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>券</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 17.5,
    height: 16,
    'background-image':
      'linear-gradient(to right bottom, #FF8552 50%, #FF526F 50%)',
    borderRadius: 5,
  },
  text: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '100',
  },
});
