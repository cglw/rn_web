import { StyleSheet } from 'react-native';
import { isPad } from '@utils/DeviceUtil';
import AutoSizeSheet from '../../../sdk/AutoSizeSheet';
import { getScreenWidth } from '@utils/ScreenUtil';
import { CommonConstants } from '@/module/module_common/constants/Constants';

StyleSheet.create = (styles: any) => {
  return isPad()
    ? styles
    : AutoSizeSheet.create(
        styles,
        getScreenWidth(),
        CommonConstants.DESIGN_WIDTH,
      );
};
