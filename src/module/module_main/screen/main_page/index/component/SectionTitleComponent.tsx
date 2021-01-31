import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
};
export class SectionTitleComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <Text style={styles.openClassTitle}>{this.props.title}</Text>;
  }
}

const styles = StyleSheet.create({
  openClassTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginTop: 19.5,
    marginBottom: 20,
  },
});
