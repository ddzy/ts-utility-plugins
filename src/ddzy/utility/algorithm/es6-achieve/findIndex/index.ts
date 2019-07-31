/**
 * @name _findIndex
 * @description 模拟ES6的array.findIndex
 * @author ddzy
 * @since 2019-7-31
 * @license MIT
 */


/**
 * 模拟array.findIndex
 * @param arr 源数组
 * @param callback 处理器
 * @param context callback运行时的上下文
 */
export function _findIndex<I, T = null>(
  arr: I[],
  callback: (v: I, i: number, self: typeof arr) => boolean,
  context?: T,
): number {
  let result = -1;
  let count = 0;

  do {
    const temp = callback.call(context, arr[count], count, arr);

    if (temp) {
      result = count;
      break;
    }
  } while ((count++ < arr.length - 1));

  return result;
}