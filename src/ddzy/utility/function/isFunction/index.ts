/**
 * 判断是否函数(Function || Symbol)
 * @param ele 任意值
 */
export function isFunction(ele: any): boolean {
  return typeof ele === 'function';
}