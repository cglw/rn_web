import { InfomationBean } from '@/module/module_main/bean/IndexBean';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const InfomationView: React.FC<InfomationBean> = (
  props: InfomationBean,
) => {
  return (
    <View style={styles.container}>
      <View style={styles.info_view}>
        <Text style={styles.info_title} numberOfLines={2}>
          {props.title}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.info_text}>{props.time}</Text>
          <Text style={styles.info_text}>{props.numOfVisitors}人浏览</Text>
        </View>
      </View>
      <Image source={{ uri: props.picture }} style={styles.picture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info_title: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },
  picture: {
    width: 109,
    height: 72.5,
  },
  info_text: {
    color: '#999',
    fontSize: 12,
  },
  info_view: { justifyContent: 'space-between', marginRight: 18, flex: 1 },
});
