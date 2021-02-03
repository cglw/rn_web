import { PriceBean } from '@/module/module_main/bean/ClassPackBean';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  originalPrice?: number;
  presentPrice?: number;
};

export const PriceView: React.FC<PriceBean> = (props: PriceBean) => {
  if (props.presentPrice === 0) {
    return <Text style={styles.price_present}>免费</Text>;
  } else {
    return props.originalPrice ? (
      <Text style={styles.price_original}>
        <View style={styles.price_original_midLine} />¥
        {(props.originalPrice / 100).toFixed(2)}
      </Text>
    ) : props.presentPrice ? (
      <Text style={styles.price_present}>
        <Text style={styles.price_present_sign}>¥</Text>
        <Text style={styles.price_present_big}>
          {(props.presentPrice / 100).toFixed(2).split('.')[0] + '.'}
        </Text>
        <Text style={styles.price_present_small}>
          {(props.presentPrice / 100).toFixed(2).split('.')[1]}
        </Text>
      </Text>
    ) : null;
  }
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  price_original: {
    alignSelf: 'flex-end',
    color: '#999999',
    justifyContent: 'center',
    fontSize: 12,
  },
  price_present: {
    color: '#FF2424',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  price_original_midLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#999999',
    alignSelf: 'center',
    position: 'relative',
    top: 9,
  },
  price_present_big: {
    fontWeight: '700',
    fontSize: 17,
  },
  price_present_small: {
    fontSize: 13,
  },
  price_present_sign: {
    fontSize: 12,
  },
});
