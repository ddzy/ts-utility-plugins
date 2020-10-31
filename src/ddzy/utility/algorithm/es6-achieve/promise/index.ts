/**
 * Promise 的几大标准
 * 1. 一个 Promise 对象有三种状态(pending: 默认状态、fulfilled: 成功状态、rejected: 失败状态), 状态的改变只能从 pending -> fulfilled 或 pending -> rejected, 并且是不可逆的
 * 2. promise.then 方法接收两个参数(onFulfilled、onRejected), 分别当状态变为(fulfilled、rejected)时执行
 * 3. promise.then 方法返回一个新的 Promise 实例, 借此来实现链式调用
 */
export type IPromiseCallback = (
  onFulfilled: IFulfilledCallback,
  onRejected: (value: IPromiseValue) => void,
) => void;
export type IFulfilledCallback = (value: IPromiseValue) => void;
export type IResolveCallback = (value: IPromiseValue) => void;
export interface IFulfilledParams {
  currentFulfilled: IFulfilledCallback;
  nextResolve: IResolveCallback;
};
export type IPromiseValue = any;

const STATUS = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export default class _Promise {
  public status: string = STATUS.pending;
  public value: IPromiseValue = null;
  public error: any = null;
  public fulfilledList: IFulfilledParams[] = [];

  constructor(callback: IPromiseCallback) {
    callback(this.resolve.bind(this), this.reject.bind(this));
  }

  public resolve(value: IPromiseValue) {
    if (this.status === STATUS.pending) {
      this.status = STATUS.fulfilled;
      this.value = value;
      this.fulfilledList.forEach((callback) => {
        callback.nextResolve(callback.currentFulfilled(this.value));
      });
    }
  }

  public reject() {
    // TODO
  }

  public then(onFulfilled: IFulfilledCallback) {
    return new _Promise((nextResolve) => {
      // 如果当前异步操作已经执行完毕
      if (this.status === STATUS.fulfilled) {
        nextResolve(onFulfilled(this.value));
      }
      // 反之, 加入到回调队列
      else if (this.status === STATUS.pending) {
        this.fulfilledList.push({
          currentFulfilled: onFulfilled,
          nextResolve,
        });
      }
    });
  }
}