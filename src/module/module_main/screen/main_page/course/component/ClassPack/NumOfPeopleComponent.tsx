import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  numOfPeople: number;
};

export class NumOfPeopleComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <Text style={styles.num}>
        {this.props.numOfPeople > 10000
          ? (this.props.numOfPeople / 10000).toFixed(1) + '万人+已报名'
          : this.props.numOfPeople + '人已报名'}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  num: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
  },
});
