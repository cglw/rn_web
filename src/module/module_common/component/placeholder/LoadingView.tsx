// @flow
'use strict';

import React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';

type Props = {
  style: ViewStyle;
  radius: number;
  width: number;
};

export default class LoadingView extends React.Component<Props, any> {
  static defaultProps = {
    radius: 30,
    width: 4,
    style: null,
  };
  spinValue: Animated.Value;
  constructor(props: any) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {};
  }

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.spin());
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ActivityIndicator size="large" color={globalColors.mainColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
