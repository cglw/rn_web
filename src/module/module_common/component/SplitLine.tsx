import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type StyleProps = {
  style?: ViewStyle;
};

export function SplitLine(props: StyleProps) {
  return <View style={[styles.line, props?.style]} />;
}
export function SplitLinePosition(props: StyleProps) {
  return <View style={[styles.position_line, props.style]} />;
}
type Props = {
  leftStyle: ViewStyle;
  rightStyle: ViewStyle;
};
export function SplitDoubleLine(props: Props) {
  return (
    <View style={globalStyles.rowItemCenter}>
      <View
        style={{
          backgroundColor: 'transparent',
          height: 0,
          ...props.leftStyle,
        }}
      />
      <View
        style={{
          ...styles.line,
          ...props.rightStyle,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  line: {
    backgroundColor: globalColors.splitLine,
    height: 0.5,
  },
  position_line: {
    position: 'absolute',
    backgroundColor: globalColors.splitLine,
    height: 0.5,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
