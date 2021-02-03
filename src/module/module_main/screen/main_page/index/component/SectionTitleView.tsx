import { SectionTitleBean } from '@/module/module_main/bean/IndexBean';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MoreView } from './MoreView';

export const SectionTitleView: React.FC<SectionTitleBean> = (
  props: SectionTitleBean,
) => {
  return (
    <View
      style={[
        styles.section_container,
        { backgroundColor: props.backgroundColor },
      ]}>
      <Text style={styles.section_openClassTitle}>{props.title}</Text>
      {props.hasMore ? <MoreView /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  section_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 21.5,
    paddingLeft: 18,
  },
  section_openClassTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginTop: 19.5,
    marginBottom: 20,
  },
});
