import { StyleSheet } from 'react-native';
import { isPad } from '../../../utils/DeviceUtil';
import AutoSizeSheet from '../../../sdk/AutoSizeSheet';
import { getScreenWidth } from '../../../utils/ScreenUtil';

StyleSheet.create = (styles: any, designWidth = 375) => {
  console.info('StyleSheet.create');
  return isPad()
    ? styles
    : AutoSizeSheet.create(styles, getScreenWidth(), designWidth);
};
