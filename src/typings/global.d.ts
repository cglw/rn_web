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
  function addTranslations(translations: object);
  function routeTo(name: string, params?: object | undefined);
}

export {};
