import { OpenClassBean } from '@/module/module_main/bean/IndexBean';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const OpenClassView: React.FC<OpenClassBean> = (
  props: OpenClassBean,
) => {
  return (
    <View style={styles.container}>
      <View style={styles.info_content}>
        <Text style={styles.info_title} numberOfLines={1}>
          {props.title}
        </Text>
        <View>
          <Text style={styles.name}>
            {props.anchorName}

            {props.state ? (
              <Text style={styles.live_broadcast_status}>
                <Image
                  source={globalImages.module_main_m}
                  style={styles.live_broadcast_sign}
                />
                {' 直播中'}
              </Text>
            ) : null}
          </Text>
          <Text style={styles.live_broadcast_startTime}>
            {props.startTime}开始直播
          </Text>
        </View>
      </View>
      <Image source={props.headPortrait} style={styles.images} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 294,
    height: 104,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  info_content: {
    height: 104,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    color: '#333333',
    justifyContent: 'center',
  },
  live_broadcast_status: {
    height: 16,
    backgroundColor: '#FBC712',
    borderRadius: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    paddingLeft: 7,
    paddingRight: 9,
    paddingTop: 1,
    paddingBottom: 1,
    marginLeft: 5,
  },
  live_broadcast_sign: {
    width: 9,
    height: 9,
  },
  live_broadcast_startTime: {
    color: '#999999',
    marginTop: 4.5,
  },
  info_title: {
    width: 150,
    fontSize: 15,
    fontWeight: '600',
    // marginBottom: 19.5,
    // overflow: 'hidden',
  },
  images: {
    width: 104,
    height: 104,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
