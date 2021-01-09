import { Platform, View, StyleSheet } from 'react-native';
import {
  getStatusBarHeight,
  isAndroid,
  isWeb,
} from '../../../utils/DeviceUtil';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { getWindowHeight } from '../../../utils/ScreenUtil';

export const wrapWithSafe = (component: any, isNeedSafe = true, style = {}) => {
  if (isWeb()) {
    return <View style={styles.container}>{component}</View>;
  }
  if (isAndroid()) {
    let paddingStyle = { paddingTop: isNeedSafe ? getStatusBarHeight() : 0 };
    return (
      <View style={[paddingStyle, styles.container, style]}>{component}</View>
    );
  }
  return isNeedSafe ? (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[styles.container, style]}>
      {component}
    </SafeAreaView>
  ) : (
    <View style={[styles.container, style]}>{component}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    ...Platform.select({
      web: {
        height: getWindowHeight(),
      },
    }),
    backgroundColor: 'white',
  },
});
