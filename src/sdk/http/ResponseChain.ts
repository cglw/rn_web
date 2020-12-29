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
//
// class T1Task implements Interceptor {
//   intercept(chain) {
//     //获取参数
//     let request = chain.request();
//     //自己执行
//     let result = request.data + 4;
//     if (result > 10) {
//       return new Response('this is a error input by T1Task');
//     } else {
//       //把结果交给下一个，记住这个时候其实还没返回给最上层
//       let response = chain.proceed(new Request(result));
//       //由于下层返回会改变数据模型
//       if (response.data.hasOwnProperty('resultKey')) {
//         response.data = response.data.resultKey;
//       }
//       return response;
//       //也可以这样，就是不新建立参数对象，可以复用上一次传进来的
//       // request.data+1
//       // return chain.proceed(request.data);
//     }
//   }
// }
//
// class T2Task implements Interceptor {
//   intercept(chain) {
//     //获取入参
//     let request = chain.request();
//     //执行结果
//     let result = (request.data += 5);
//
//     //自己的逻辑
//     if (result > 13) {
//       return new HttpResponse('this is a error input By T2Task');
//     } else {
//       //交给下一层
//       return chain.proceed(new HttpRequest({resultKey: result}));
//     }
//   }
// }
//
// //修改Task4的返回
// class T3Task implements Interceptor {
//   intercept(chain) {
//     let request = chain.request();
//     request.data.resultKey += 3;
//     //不需要传递了就不用执行chain.proceed(request)，直接返回一个结果
//     return new Response(request.data);
//   }
// }
//
// //任务加入到拦截器集合中
// let intercepts = [new T1Task(), new T2Task(), new T3Task()];
// //这个Request是第一个任务的入参,
// //T1Task  执行+4 结果>10错误 否则传递
// //T2Task  执行+5 结果>13错误 否则传递
// //T3Task  执行+3 返回结果
//
// //输入startRequest  1  ===> 结果：13
// //输入startRequest  5  ===> 结果：this is a error input By T2Task
// //输入startRequest  10 ===> 结果：this is a error input by T1Task
// let startRequest = new Request(1);
// let realTaskChain = new RealTaskChain(intercepts, 0, startRequest);
// //责任链开始执行
// let response = realTaskChain.proceed(startRequest);
//
// let startRequest1 = new Request(5);
// let realTaskChain1 = new RealTaskChain(intercepts, 0, startRequest1);
// //责任链开始执行
// let response1 = realTaskChain.proceed(startRequest1);
//
// let startRequest2 = new Request(10);
// let realTaskChain2 = new RealTaskChain(intercepts, 0, startRequest2);
// //责任链开始执行
// let response2 = realTaskChain2.proceed(startRequest2);

//记住data是任意类型，你可以完全自己控制每一层传递不一样也可以
