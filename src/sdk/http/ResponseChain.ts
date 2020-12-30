/**
 * 拦截器的思想就是一个U形状调用，每一个任务都有接受参数，跟返回结果的功能
 * 但是每个任务的结果不是立马返回，类似 A->B-C  返回的时候 C->B->A  最终的结果会在最上层的调用层返回
 * 下面RealTaskChain 就是调用链的入口
 * RealTaskChain 维护了一个责任链的集合和索引，每次传递的时候，会new一个自己对象，然后每一个任务都是在
 * RealTaskChain里面执行的，执行交给下面一个，但这个时候最终的结果还没返回，可以传递下去，不传递就是立马返回
 *
 * 调用的感觉就是==>A(B(C())) 如何做到的就是责任链的集合跟索引
 */

/**
 * 任务拦截器的数据返回包装类
 */
export class HttpResponse<T extends any> {
  response: T;
  constructor(response: T) {
    this.response = response;
  }
}

/**
 * 任务拦截器接受参数的封装类，也用来传递参数
 */
export class HttpRequest {
  input: RequestInfo;
  init?: RequestInit;
  constructor(input: RequestInfo, init?: RequestInit) {
    this.input = input;
    this.init = init;
  }
}

/**
 * 责任链基类，不好写成java那样的接口，空实现的函数
 * 这里类似Java 接口，先定义好基础的方法
 */
export interface Chain {
  /**
   * 读取当前的request 做个只是一个思想，通过方法读取变量，不直接读变量
   * @returns {null}
   */
  request(): HttpRequest;

  /**
   * 处理责任链逻辑
   * @returns {null}
   */
  proceed(request: HttpRequest): Promise<HttpResponse<any>>;
}

export interface Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>>;
}

/**
 * 责任链控制类
 */
export class RealTaskChain implements Chain {
  /**
   * 拦截器就是可以看作一个个的任务
   * @param mInterceptors 存放拦截器的
   * @param index 当前拦截器的索引
   * @param request 每个拦截器收到上一个拦截器的入参
   */
  mInteceptors: Array<Interceptor>;
  mIndex: number;
  mRequest: HttpRequest;
  mPromise: Promise<any>;
  constructor(
    interceptors: Array<Interceptor>,
    index: number,
    request: HttpRequest,
    promise: Promise<any>,
  ) {
    this.mInteceptors = interceptors;
    this.mIndex = index;
    this.mRequest = request;
    this.mPromise = promise;
  }

  proceed(request: HttpRequest): Promise<any> {
    if (this.mIndex > this.mInteceptors.length) {
      throw new Error('index error');
    }
    //获取下一个拦截器
    let next = new RealTaskChain(
      this.mInteceptors,
      this.mIndex + 1,
      request,
      this.mPromise,
    );
    //执行下一个拦截器并返回结果
    return this.mInteceptors[this.mIndex].intercept(next);
  }

  //获取当前拦截器的入参
  request(): HttpRequest {
    return this.mRequest;
  }
}
