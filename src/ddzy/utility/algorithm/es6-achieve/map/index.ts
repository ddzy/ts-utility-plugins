/**
 * @name _map
 * @description 模拟实现ES6的`array.map()`API
 * @author ddzy
 * @since 2019-7-5
 * @see https://github.com/ddzy
 */


/**
 * 模拟`array.map`()方法
 * @param arr 源数组
 * @param callback 回调函数
 * @param thisArg callback执行时的上下文
 */
export function _map<I, O = any, T = null>(
  arr: I[],
  callback: (v: I, i: number, thisArg: T | null) => O,
  thisArg?: T,
) {
  const result: O[] = [];
  let count = 0;

  do {
    result[count] = callback.call(
      thisArg ? thisArg : null,
      arr[count],
      count,
      thisArg ? thisArg : null,
    );
  } while ((count++ < arr.length - 1));

  return result;
}