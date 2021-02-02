import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {};

export const MoreComponent: React.FC<Props> = () => {
  return (
    <View style={styles.more_container}>
      <Text style={styles.more_text}>更多</Text>
      <Image
        source={globalImages.module_main_jiantou}
        style={styles.more_img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  more_container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  more_text: {
    fontSize: 13,
    color: '#999',
    marginRight: 4.5,
  },
  more_img: { width: 6.5, height: 11 },
});
