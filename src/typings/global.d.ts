import { RootStore } from '../module/module_common/store/RootStore';

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
}
// namespace StyleSheet {
//   export function create<T extends NamedStyles<T> | NamedStyles<any>>(
//     styles: T | NamedStyles<T>,
//   ): T;
// }

export {};
