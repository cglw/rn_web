import { View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { SplitLinePosition } from './SplitLine';

type Props = {
  title: string;
  rightView?: any;
  back?: string;
  leftRightSpace?: number;
  //rightView 宽度大于45需要设置，这个是title距离左右边界的距离
  edgeWidth?: number;
  isShowBottomLine?: boolean;
};

export function HeaderView(props: Props) {
  let backText = '返回';
  if (props.back !== void 0) {
    backText = props.back;
  }
  let edgeWidth = 0;
  if (props.edgeWidth !== void 0) {
    edgeWidth = props.edgeWidth;
  }
  let widthStyle = { minWidth: Math.max(45, edgeWidth) };
  return (
    <View style={styles.container}>
      <View style={[styles.back_container, widthStyle]}>
        <Image
          style={styles.back_image}
          source={globalImages.module_common_back}
        />
        <Text style={styles.back_text}>{backText}</Text>
      </View>
      <View style={styles.title_container}>
        <Text numberOfLines={1} style={styles.title_style}>
          {props?.title}
        </Text>
      </View>
      <View style={[styles.right_container, widthStyle]}>
        {props?.rightView}
      </View>
      {props.isShowBottomLine ? <SplitLinePosition /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back_container: {
    marginStart: 15,
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
  },
  back_image: {
    width: 9.5,
    height: 17,
    marginTop: 0,
  },
  back_text: {
    fontSize: 14,
    color: globalColors.titleColor,
    marginStart: 5,
  },
  title_container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    ...globalStyles.center,
  },
  title_style: {
    color: globalColors.titleColor,
    fontSize: 18,
  },
  right_container: {
    marginEnd: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
