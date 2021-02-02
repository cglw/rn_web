import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text?: string;
  type: string;
};

export class BadgeComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    switch (this.props.type) {
      case 'number':
        return (
          <View style={styles.badge_container}>
            <Text style={styles.badge_text_number}>{this.props.text}</Text>
          </View>
        );
      case 'str':
        return <View />;
      default:
        return <View />;
    }
  }
}

const styles = StyleSheet.create({
  badge_container: {
    width: 20,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF2B4E',
    position: 'absolute',
    left: 16.5,
    top: -3,
  },
  badge_text_number: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    lineHeight: 12,
  },
});
