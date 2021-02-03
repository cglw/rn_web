import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text: string;
};

export const BadgeComponent: React.FC<Props> = () => {
  return (
    <View style={styles.badge_container}>
      <Text style={styles.badge_text_number}>12</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge_container: {
    width: 20,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF2B4E',
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
  },
  badge_text_number: {
    fontSize: 1,
    color: 'white',
    // textAlign: 'center',
    // lineHeight: 12,
  },
});
