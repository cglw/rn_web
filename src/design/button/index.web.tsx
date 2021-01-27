import { Button as Btn } from 'antd-mobile';
import React from 'react';
import { StyleSheet } from 'react-native';
export const Button = (props: any) => {
  // console.info('Button=====>
  const { onPress, ...rest } = props;
  return (
    <Btn
      style={{
        backgroundColor: 'red',
        boxShadow: '0 0 10px green',
        ...styles.container,
      }}
      {...rest}
      onClick={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});
