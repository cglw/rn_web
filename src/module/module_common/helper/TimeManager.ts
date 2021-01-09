export class TimeManager {
  private static instance: TimeManager;
  //以前服务器时间 - 以前服务器时间的获取时刻的系统启动时间
  differenceTime: number;
  //是否是服务器时间
  isServerTime: boolean;
  timeOrigin: number;
  lastTime: number;
  private constructor() {
    this.differenceTime = 0;
    this.timeOrigin = performance.timeOrigin;
    this.lastTime = performance.now();
    this.isServerTime = false;
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new TimeManager();
    }
    return this.instance;
  }

  getServerTime() {
    if (this.isServerTime) {
      return new Date().getTime();
    }
    this.updateOriginTime();
    return this.differenceTime + this.timeOrigin;
  }
  getServerTimeSec() {
    return (this.getServerTime() / 1000).toFixed(1);
  }

  updateOriginTime() {
    let now = performance.now();
    this.timeOrigin = this.timeOrigin + (now - this.lastTime);
    this.lastTime = now;
  }

  /**
   * 获取服务器时间后进行调用
   * @param serverReturnTime
   */
  calculateDiff(serverReturnTime: number) {
    console.info('serverReturnTime' + serverReturnTime);

    if (serverReturnTime === 0) {
      return;
    }
    this.updateOriginTime();
    this.differenceTime = serverReturnTime - this.timeOrigin;
  }
}
