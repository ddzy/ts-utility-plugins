import utilityOthers from "../others";
import {
  _reflect,
} from "../algorithm/es6-achieve/reflect";

export interface IUtilityFunctionProps {
  isFunction(el: any): boolean;

  _call(context: any, ...args: any[]): void;
  _bind(context: any): (...args: any[]) => any;
  _new<T extends Function>(constructor: T, ...args: any[]): keyof T;

  getParamNames(origin: Function): string[];

  compose(...callback: Function[]): any;
}

const utilityFunction: IUtilityFunctionProps = {

  /**
   * 判断是否函数(Function || Symbol)
   * @param ele 任意值
   */
  isFunction(ele) {
    return typeof ele === 'function';
  },

  /**
   * 模拟实现`call`方法
   * @param context this上下文
   * @param args 所需参数
   */
  _call(context, ...args) {
    // TODO: 使用`keyof typeof Function`来解决索引签名报错(`元素隐式具有 "any" 类型，因为类型“Function”没有索引签名`)的问题
    const funcName = this['name' as keyof typeof utilityFunction] as any;

    if ( utilityOthers.isNull(context) ) {
      let w = window as any;

      w[funcName] = this;
      w[funcName](...args);
      delete w[funcName];
    } else {
      context[funcName] = this;
      context[funcName](...args);
      delete context[funcName];
    }
  },

  /**
   * 模拟实现`bind`方法
   * @param context this上下文
   * @returns {(...args: any[]) => void}
   */
  _bind(context) {
    const that = this;
    Function.prototype['_call' as 'prototype'] = utilityFunction._call;

    return function (args) {
      that['_call'](context, ...args);
    }
  },

  /**
   * 获取函数的形参名称数组
   * @param origin 目标函数
   * @returns {string[]} 函数参数名称数组
   */
  getParamNames(origin) {
    if (!utilityFunction.isFunction(origin)) {
      return [];
    }

    let final: string[] = [];
    const originToStr: string = origin.toString();
    const matchParamsReg: RegExp = /(?:(?<=\()(.+)(?=\)))/;
    const matchedResult = originToStr.match(matchParamsReg);

    if ( matchedResult ) {
      let matchedParams = matchedResult[1];
      final = matchedParams.split(/[,\s]+/g);
    }

    return final;
  },

  /**
   * 模拟实现`new`操作符
   * @param constructor 构造函数
   * @param args 所需参数
   */
  _new(constructor, ...args) {
    if (!utilityFunction.isFunction(constructor)) {
      return null;
    }

    const instance = Object.create(null);
    _reflect.setPrototypeOf(instance, constructor.prototype);
    constructor.apply(instance, args);

    return instance;
  },

  /**
   * 从右往左执行处理器函数
   * @param callbacks 处理器
   */
  compose(...callbacks) {
    return callbacks.reduceRight((total, current) => {
      return current(total);
    });
  },
};


export default utilityFunction;