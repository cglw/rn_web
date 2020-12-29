class BaseResponse<T> {
  code: number = 0;
  msg: string = '';
  data?: T;
  constructor() {}
}
