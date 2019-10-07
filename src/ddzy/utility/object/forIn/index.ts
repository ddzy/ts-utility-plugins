/**
 * 使用 iteratee 遍历对象的自身和继承的可枚举属性. iteratee 会传入3个参数: (value, key, object). 如果返回 false, iteratee 会提前退出遍历.
 * @param origin 源对象
 * @param callback 处理器
 */
export function forIn<I extends object>(
  origin: I,
  callback: (
    v: any,
    i: string | number,
    self: typeof origin,
  ) => void | boolean,
) {
  for (const key in origin) {
    const value = origin[key];
    const isKeep = callback.call(origin, value, key, origin);

    if (isKeep === false) {
      break;
    }
  }
}