import { Dimensions, Platform, StatusBar } from 'react-native';
import { isTablet } from 'react-native-device-info';

export function isIosPad(): boolean {
  return Platform.OS === 'ios' && Platform.isPad;
}
export function isPad() {
  return (isWeb() && getWebUAInfo().iPad) || isTablet();
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

// 获取状态栏高度
export function getStatusBarHeight() {
  return Platform.select({
    ios: isIphoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
  });
}

export function getWebUAInfo() {
  let u = window.navigator.userAgent;
  let ua = window.navigator.userAgent.toLocaleLowerCase();

  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf('Android') > -1 || u.indexOf('Mac') > -1, // 安卓终端
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否为iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
    QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
    weiXin: u.indexOf('MicroMessenger') > -1, // 微信
    // @ts-ignore
    QQ: ua.match(/QQ/i) === 'qq', // QQ
    // @ts-ignore
    weiBo: ua.match(/WeiBo/i) === 'weibo', // 微博
    ucLowEnd: u.indexOf('UCWEB7.') > -1, //
    ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
    webview:
      !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) &&
      u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    ucWeb: (function () {
      try {
        return (
          parseFloat(
            // @ts-ignore
            u
              .match(/ucweb\d+\.\d+/gi)
              .toString()
              .match(/\d+\.\d+/)
              .toString(),
          ) >= 8.2
        );
      } catch (e) {
        return u.indexOf('UC') > -1;
      }
    })(),
    Symbian: u.indexOf('Symbian') > -1,
    ucSB: u.indexOf('Firofox/1.') > -1,
  };
}
