import {Dimensions} from 'react-native';
export function getWindowWidth() {
  return Dimensions.get('window').width;
}
export function getWindowWidthIgnoreDir() {
  return Math.min(getWindowWidth(), getWindowHeight());
}
export function getWindowHeight() {
  return Dimensions.get('window').height;
}
export function getScreenWidth() {
  return Dimensions.get('screen').width;
}
export function getScreenHeight() {
  return Dimensions.get('screen').height;
}
export function getScreenScale() {
  return Dimensions.get('screen').scale;
}
export function getWindowScale() {
  return Dimensions.get('window').scale;
}
export function getWindowWidthPx() {
  return getWindowWidth() * getWindowScale();
}
