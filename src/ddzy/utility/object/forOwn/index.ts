/**
 * @name forOwn
 * @description 遍历对象自身的可枚举属性, 不包括继承而来的属性
 * @author ddzy
 * @since 2019/12/12
 * @param origin 需要遍历的源对象
 * @param callback 回调处理器
 */
export function forOwn<O extends object | Function>(
  origin: O,
  callback: (
    i: string | number,
    v: any,
    self: typeof origin,
  ) => void | boolean,
) {
  for (const key in origin) {
    if (origin.hasOwnProperty(key)) {
      const value = origin[key];
      const isContinue = callback.call(origin, key, value, origin);

      // 如果处理器中返回 false, 则终止遍历
      if (isContinue === false) {
        break;
      }
    }
  }
}