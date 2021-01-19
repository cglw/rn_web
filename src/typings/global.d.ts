import {
  Constructor,
  NativeMethods,
  RefreshControlComponent,
} from 'react-native';

declare global {
  interface String {
    //国际化
    itn(params?: object): string;
  }
  interface Date {
    format(params?: string): string;
  }
  let globalStyles: any;
  let globalColors: any;
  let globalDimes: any;
  let globalI18n: any;
  let globalImages: any;
  let globalStore: any;
  let globalService: any;
  let globalRouter: any;
  function addTranslations(translations: object): void;
  function routeTo(name: string, params?: object | undefined): void;
  function checkEmpty(obj: any): boolean;
  function wrapWithSafe(
    component: any,
    isNeedSafe?: boolean,
    style?: object,
  ): any;
}

declare const RefreshControlBase: Constructor<NativeMethods> &
  typeof RefreshControlComponent;
export class RefreshControl extends RefreshControlBase {
  static SIZE: Object; // Undocumented
}

export {};
