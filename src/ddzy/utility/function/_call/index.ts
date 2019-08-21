import { isNull } from "../../others/isNull";

/**
 * 模拟实现`call`方法
 * @param context this上下文
 * @param args 所需参数
 */
export function _call(context: any, ...args: any[]) {
  // TODO: 使用`keyof typeof Function`来解决索引签名报错(`元素隐式具有 "any" 类型，因为类型“Function”没有索引签名`)的问题
  const funcName = this['name' as keyof typeof Function] as any;

  if (isNull(context)) {
    let w = window as any;

    w[funcName] = this;
    w[funcName](...args);
    delete w[funcName];
  } else {
    context[funcName] = this;
    context[funcName](...args);
    delete context[funcName];
  }
}