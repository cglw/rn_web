// @flow
'use strict';

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class EmptyView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{'noData'.itn()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.center,
    // flex: 1,这里有点问题在flatList
    height: '100%',
    backgroundColor: globalColors.backgroundColor,
  },
});
