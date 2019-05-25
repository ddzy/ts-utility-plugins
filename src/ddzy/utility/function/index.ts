export interface IUtilityFunctionProps {
  isFunction(el: any): boolean;

  _call(context: any, ...args: any[]): void;
  _bind(context: any): (args: any[]) => any;
}

// TODO: 提取至utilityOthers
function isNull(origin: any) {
  return typeof origin !== undefined
    && origin == undefined;
}

const utilityFunction: IUtilityFunctionProps = {

  /**
   * 检查是否函数
   * @param ele 任意值
   */
  isFunction(ele) {
    return typeof ele === 'function';
  },

  _call(context, ...args) {
    // TODO: 使用`keyof typeof Function`来解决索引签名报错(`元素隐式具有 "any" 类型，因为类型“Function”没有索引签名`)的问题
    const funcName = this['name' as keyof typeof utilityFunction] as any;

    if ( isNull(context) ) {
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

  _bind(context) {
    const that = this;
    Function.prototype['_call' as 'prototype'] = utilityFunction._call;

    return function (args) {
      that['_call'](context, ...args);
    }
  }

};


export default utilityFunction;