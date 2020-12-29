declare global {
  interface String {
    //国际化
    itn(params?: object): string;
    log();
  }
  interface Number {
    log();
  }
  interface Object {
    log();
  }

  let time: number;
}
export {};
