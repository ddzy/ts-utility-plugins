/**
 * 函数柯里化
 * @description 柯里化可以将一个复杂的函数解耦, 使其逻辑分离, 便于复用, 适用于函数式编程
 * @param fn 原函数
 * @param outerArgs 初始参数列表
 * @example
 * // 未柯里化的函数
 * curry(1, 2, 3, 4);
 * // 柯里化的函数
 * curry(1)(2)(3)(4);
 * curry(1)(2, 3)(4);
 * curry(1, 2, 3)(4);
 */
export function curry(this: any, fn: Function, ...outerArgs: any[]) {
  if (outerArgs.length >= fn.length) {
    return fn.apply(this, outerArgs);
  }

  return function (...innerArgs: any[]) {
    return curry(fn, ...outerArgs.concat(innerArgs));
  }
}