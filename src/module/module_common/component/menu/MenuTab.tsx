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
  Image,
} from 'react-native';
export enum SORT_STATUS {
  INIT,
  DOWN,
  UP,
}

type Props = {
  isChecked: boolean;
  checkColor?: string;
  unCheckColor?: string;
  text: string;
  style?: StyleProp<ViewStyle>;
  selectedValue?: string;
  isSort?: boolean;
  sortStatus?: SORT_STATUS;
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

  let color =
    props.isChecked || !checkEmpty(props.selectedValue)
      ? props.checkColor
      : props.unCheckColor;
  const imageStyle = {
    tintColor: color,
    transform: [
      {
        rotateZ: animationRef.current.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  function sortColor(isChecked: boolean) {
    return isChecked ? globalColors.mainColor : globalColors.contentColor;
  }
  const topArrowImageStyle = {
    ...styles.image,
    tintColor: sortColor(props.sortStatus === SORT_STATUS.UP),
  };
  const bottomArrowImageStyle = {
    tintColor: sortColor(props.sortStatus === SORT_STATUS.DOWN),
    ...styles.image,
    marginTop: 2,
  };
  return (
    <View style={[styles.container, props.style]}>
      <Text style={[styles.text, { color }]}>
        {checkEmpty(props.selectedValue) ? props.text : props.selectedValue}
      </Text>
      {props.isSort ? (
        <View style={styles.double_arrow_container}>
          <Image
            style={topArrowImageStyle}
            source={globalImages.module_common_dropup_arrow}
          />
          <Image
            style={bottomArrowImageStyle}
            source={globalImages.module_common_dropdown_arrow}
          />
        </View>
      ) : (
        <Animated.Image
          source={globalImages.module_common_dropdown_arrow}
          style={[styles.image, imageStyle]}
        />
      )}
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
    marginEnd: 8,
    fontSize: 12,
    color: globalColors.titleColor,
  },
  image: {
    width: 6,
    height: 4,
  },
  double_arrow_container: {
    ...globalStyles.center,
  },
});
