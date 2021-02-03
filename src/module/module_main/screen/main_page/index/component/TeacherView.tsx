import { TeacherBean } from '@/module/module_main/bean/TeacherBean';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const TeacherView: React.FC<TeacherBean> = (props: TeacherBean) => {
  return (
    <View style={styles.container}>
      {props.photo ? (
        <Image source={{ uri: props.photo }} style={styles.head_portrait} />
      ) : (
        <View style={styles.head_portrait} />
      )}
      <View>
        <Text style={styles.text_name}>
          {props.teacherName}
          <Text style={styles.text_levelName}>{props.levelName}</Text>
        </Text>
        <Text style={styles.introduction}>{props.introduction}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  head_portrait: {
    width: 70,
    height: 70,
    marginRight: 18,
    borderRadius: 100,
  },
  text_name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6.5,
  },
  text_levelName: {
    color: '#C69C41',
    fontSize: 11,
    marginLeft: 10,
    fontWeight: 'normal',
    borderWidth: 0.5,
    borderColor: '#C69C41',
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 3,
  },
  introduction: { color: '#999999', fontSize: 11, marginTop: 11 },
});
