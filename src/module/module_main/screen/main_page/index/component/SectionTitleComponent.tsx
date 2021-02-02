import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MoreComponent } from './MoreComponent';

type Props = {
  title: string;
  backgroundColor: string;
};
export class SectionTitleComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[
          styles.section_container,
          { backgroundColor: this.props.backgroundColor },
        ]}>
        <Text style={styles.section_openClassTitle}>{this.props.title}</Text>
        <MoreComponent />
      </View>
    );
  }
}

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
