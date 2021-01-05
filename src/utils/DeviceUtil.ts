import {Dimensions, Platform} from 'react-native';

export function isIosPad(): boolean {
  return Platform.OS === 'ios' && Platform.isPad;
}
export function isIphoneX() {
  const dimes = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimes.height === 812 ||
      dimes.width === 812 ||
      dimes.height === 896 ||
      dimes.width === 896 ||
      dimes.height === 844 ||
      dimes.width === 844 ||
      dimes.height === 926 ||
      dimes.width === 926)
  );
}
export function isIphone678P() {
  const dimes = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    dimes.height === 736
  );
}

export function isIphone5SCE() {
  const dimes = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    dimes.height === 568
  );
}
export function isIOS(): boolean {
  return Platform.OS === 'ios';
}

export function isAndroid(): boolean {
  return Platform.OS === 'android';
}
export function isWeb(): boolean {
  return Platform.OS === 'web';
}
