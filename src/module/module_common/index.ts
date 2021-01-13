import './extensions/index';
import './res/index';
import './i18n/i18n';
import { RouterManager } from '../../sdk/router/RouterManager';
import { RootStore } from './store/RootStore';

import { StyleSheet } from 'react-native';
import AutoSizeSheet from '../../sdk/AutoSizeSheet';
import { getWindowWidth } from '../../utils/ScreenUtil';
import { isPad } from '../../utils/DeviceUtil';

globalService = {};
globalRouter = RouterManager.getInstance();
globalStore = new RootStore();

StyleSheet.create = (styles: any) => {
  return isPad() ? styles : AutoSizeSheet.create(styles, getWindowWidth(), 375);
};
