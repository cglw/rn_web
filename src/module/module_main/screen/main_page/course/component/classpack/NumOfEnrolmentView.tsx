import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  numOfPeople: number;
};

export const NumOfEnrolmentView: React.FC<Props> = (props: Props) => {
  return (
    <Text style={styles.num}>
      {props.numOfPeople > 10000
        ? (props.numOfPeople / 10000).toFixed(1) + '万人+已报名'
        : props.numOfPeople + '人已报名'}
    </Text>
  );
};

const styles = StyleSheet.create({
  num: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
  },
});
