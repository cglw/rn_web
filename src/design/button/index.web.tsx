import { Button as Btn } from 'antd-mobile';
import React from 'react';
export default (props: any) => {
  const { onPress, ...rest } = props;
  return <Btn {...rest} onClick={onPress} />;
};
