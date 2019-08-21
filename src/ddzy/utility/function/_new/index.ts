import { _reflect } from "../../algorithm/es6-achieve/reflect";
import { isFunction } from "../isFunction/index";

/**
 * 模拟实现`new`操作符
 * @param constructor 构造函数
 * @param args 所需参数
 */
export function _new<T extends Function>(constructor: T, ...args: any[]): keyof T {
  if (!isFunction(constructor)) {
    return null;
  }

  const instance = Object.create(null);
  _reflect.setPrototypeOf(instance, constructor.prototype);
  constructor.apply(instance, args);

  return instance;
}