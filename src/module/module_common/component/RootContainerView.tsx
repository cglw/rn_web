import { View, StyleSheet } from 'react-native';
import {
  getStatusBarHeight,
  isAndroid,
  isWeb,
} from '../../../utils/DeviceUtil';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { getWindowHeight } from '../../../utils/ScreenUtil';

export const wrapWithSafeImpl = (
  component: any,
  isNeedSafe = true,
  style = {},
) => {
  let containerStyle = styles.container;

  if (isWeb()) {
    //不要写在下面。这个容器高度不需要适配!!!
    return (
      <View style={{ height: getWindowHeight(), ...containerStyle }}>
        {component}
      </View>
    );
  }
  if (isAndroid()) {
    let paddingStyle = { paddingTop: isNeedSafe ? getStatusBarHeight() : 0 };
    return (
      <View style={[paddingStyle, containerStyle, style]}>{component}</View>
    );
  }
  return isNeedSafe ? (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[containerStyle, style]}>
      {component}
    </SafeAreaView>
  ) : (
    <View style={[containerStyle, style]}>{component}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
