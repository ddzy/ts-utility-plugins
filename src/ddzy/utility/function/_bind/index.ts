import { _call } from "../_call";

/**
 * 模拟实现`bind`方法
 * @param context this上下文
 * @returns {(...args: any[]) => void}
 */
export function _bind(context: any): (...args: any[]) => any {
  const that = this;
  Function.prototype['_call' as 'prototype'] = _call;

  return function (args) {
    that['_call'](context, ...args);
  }
}