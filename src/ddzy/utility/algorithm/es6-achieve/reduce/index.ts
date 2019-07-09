/**
 * @name _reduce
 * @description 模拟实现ES6的`array.reduce()`API
 * @author ddzy
 * @since 2019-7-8
 * @see https://github.com/ddzy/ts-utility-plugins
 */


import utilityOthers from "../../../others";

/**
 * 模拟es6的`array.reduce`
 * @param arr 源数组
 * @param callback 迭代函数
 * @param [initialValue] 初始值
 */
export function _reduce<I, O>(
  arr: I[],
  callback: (total: O, current: I, index: number, self: typeof arr) => typeof total,
  initialValue?: O,
): typeof total {
  let dummy = !utilityOthers.isUndefined(initialValue) ? initialValue : arr[0];
  let total: I | O | undefined = dummy;
  let count = !utilityOthers.isUndefined(initialValue) ? 0 : 1;

  if (!arr.length) {
    return total;
  }

  do {
    total = callback(total as O, arr[count], count, arr);
  } while ((count++ < arr.length - 1));

  return total;
}