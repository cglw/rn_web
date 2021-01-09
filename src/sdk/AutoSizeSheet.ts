/**
 * @author SMXCWZ
 * @format
 * @flow
 */

import {
  Dimensions,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type Styles = {
  [key: string]: ViewStyle & TextStyle & ImageStyle;
};
export type AutoSizeSheetStyle<S extends Styles> = {
  [key: string]: number;
};

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Creates a StyleSheet style reference from the given object.
 */
// export function create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T;

export default class AutoSizeSheet {
  static create<S extends NamedStyles<S> | NamedStyles<any>>(
    styles: S | NamedStyles<S>,
    screenWidth: number = Dimensions.get('window').width,
    designWidth: number = 375,
  ): S {
    const platformStyles = {};
    Object.keys(styles).forEach(name => {
      // @ts-ignore
      const { ios, android, web, ...style } = styles[name];
      let xeStyle = style;
      if (ios && Platform.OS === 'ios') {
        xeStyle = { ...style, ...ios };
      }
      if (android && Platform.OS === 'android') {
        xeStyle = { ...style, ...android };
      }
      if (android && Platform.OS === 'web') {
        xeStyle = { ...style, ...web };
      }
      if (screenWidth > 0) {
        // @ts-ignore
        xeStyle = this.scaleSize(xeStyle, designWidth, screenWidth);
      }
      // @ts-ignore
      platformStyles[name] = xeStyle;
    });

    // @ts-ignore
    return StyleSheet.create(platformStyles);
  }

  static scaleSize<S extends Styles>(
    style: S,
    designWidth: number,
    screenWidth: number,
  ): number {
    Object.keys(style).forEach(name => {
      // console.info('type===>' + typeof Object.keys(style));
      if (
        this.scaleProps.indexOf(name) >= 0 &&
        typeof style[name] === 'number'
      ) {
        const prop = style[name];
        // @ts-ignore
        style[name] = Math.round((prop * screenWidth) / designWidth);
      }
    });

    // @ts-ignore
    return style;
  }

  static scaleProps = [
    'borderBottomEndRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderBottomStartRadius',
    'borderBottomWidth',
    'borderEndWidth',
    'borderLeftWidth',
    'borderRadius',
    'borderRightWidth',
    'borderStartWidth',
    'borderTopEndRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderTopStartRadius',
    'borderTopWidth',
    'borderWidth',
    'bottom',
    'end',
    'fontSize',
    'height',
    'left',
    'letterSpacing',
    'lineHeight',
    'margin',
    'marginBottom',
    'marginEnd',
    'marginHorizontal',
    'marginLeft',
    'marginRight',
    'marginStart',
    'marginTop',
    'marginVertical',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'padding',
    'paddingBottom',
    'paddingEnd',
    'paddingHorizontal',
    'paddingLeft',
    'paddingRight',
    'paddingStart',
    'paddingTop',
    'paddingVertical',
    'right',
    'start',
    'textShadowRadius',
    'top',
    'width',
  ];
}
