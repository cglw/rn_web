import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  ViewProps,
  StyleProp,
  Easing,
} from 'react-native';

type Props = {
  isChecked: boolean;
  checkColor?: string;
  unCheckColor?: string;
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const MenuTabView: React.FC<ViewProps & Props> = props => {
  const animationRef = useRef(new Animated.Value(0));
  useEffect(() => {
    const isChecked = props.isChecked;
    Animated.timing(animationRef.current, {
      toValue: isChecked ? 0.5 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [props.isChecked]);
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.text}</Text>
      <Animated.Image
        source={globalImages.module_common_dropdown_arrow}
        style={[
          styles.image,
          {
            tintColor: props.isChecked ? props.checkColor : props.unCheckColor,
            transform: [
              {
                rotateZ: animationRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};
MenuTabView.defaultProps = {
  checkColor: globalColors.mainColor,
  unCheckColor: globalColors.supportColor,
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    ...globalStyles.center,
  },
  text: {
    fontSize: 12,
    color: globalColors.titleColor,
  },
  image: {
    width: 6,
    height: 4,
    marginStart: 8,
  },
});
