/**
 * @name _every
 * @description 模拟ES6的`array.every()`
 * @author ddzy
 * @license MIT
 * @since 2019-7-14
 */

/**
 * 模拟`array.every`方法
 * @param arr 源数组
 * @param callback 处理器
 * @param context this上下文
 */
export function _every<I, T = null>(
  arr: I[],
  callback: (v: I, i: number, self: typeof arr) => boolean,
  context?: T,
): boolean {
  let result = true;
  let count = 0;

  if (!arr.length) {
    return result;
  }

  do {
    result = callback.call(context, arr[count], count, arr);

    if (!result) {
      result = false;
      break;
    }
  } while ((count++ < arr.length - 1));

  return result;
}