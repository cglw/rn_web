import { BookBean } from '@/module/module_main/bean/BookBean';
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { PriceView } from '../../course/component/classpack/PriceView';

type Props = {
  data: BookBean;
};

export const BookView: React.FC<Props> = props => {
  let {
    coverPhoto,
    title,
    author,
    introduction,
    presentPrice,
    originalPrice,
  } = props.data;

  return (
    <View style={styles.container}>
      <Image source={{ uri: coverPhoto }} style={styles.cover_img} />
      <View style={styles.info_content}>
        <View style={styles.info_text}>
          <Text style={styles.info_title}>{title}</Text>
          <Text style={styles.info_author}>作者: {author}</Text>
          <Text style={styles.info_introduction} numberOfLines={2}>
            {introduction}
          </Text>
        </View>
        {presentPrice === 0 ? (
          <PriceView presentPrice={presentPrice} />
        ) : (
          <View style={styles.info_price}>
            <PriceView presentPrice={presentPrice} />
            <View style={styles.info_price_original}>
              <PriceView originalPrice={originalPrice} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cover_img: {
    width: 85,
    height: 119,
    marginRight: 18,
  },
  info_title: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },
  info_author: {
    fontSize: 13,
    color: '#666666',
  },
  info_introduction: {
    fontSize: 13,
    color: '#999',
  },
  info_text: {
    height: 83.5,
    justifyContent: 'space-between',
  },
  info_content: {
    width: 237,
    justifyContent: 'space-between',
  },
  info_price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  info_price_original: {
    marginLeft: 6.5,
  },
});
