import { Carousel } from 'antd-mobile';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Props } from '@/design/banner/Props';

const Banner: React.FC<Props> = props => {
  const { bannerImages } = props;
  let height = 150;
  if (props.style && props.style.height) {
    // @ts-ignore
    height = props.style.height;
  }
  height = adapterSize(height);
  console.info(props.children);
  if (props.children) {
    console.info('length' + props.children.length);
    for (let i = 0; i < props.children.length; i++) {
      let child: React.ReactElement = props.children[i];
      let style = child.props.style;
      style[0].height = height;
    }
  }

  return (
    <Carousel
      {...props}
      // @ts-ignore
      dotStyle={{ ...styles.common_dot, ...props.dotStyle }}
      // @ts-ignore
      dotActiveStyle={{ ...styles.common_dot, ...props.dotActiveStyle }}
      style={{ ...styles.wrapper, height: height }}>
      {props.children
        ? props.children
        : bannerImages?.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => props.onPress?.(index)}>
              <Image
                style={{ ...styles.image, height: height }}
                source={item}
              />
            </TouchableOpacity>
          ))}
    </Carousel>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
  },
  common_dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 20,
  },
});
export default Banner;
