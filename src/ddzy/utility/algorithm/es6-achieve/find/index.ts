/**
 * @name _find
 * @description 模拟ES6的`array.find()`
 * @author ddzy
 * @license MIT
 * @since 2019-7-17
 */


/**
 * 模拟ES6的find()
 * @param arr 源数组
 * @param callback 迭代器
 * @param thisArg callback上下文
 */
export function _find<I, T = null>(
  arr: I[],
  callback: (v: I, i: number, self: typeof arr) => boolean,
  context?: T,
): I | undefined {
  let result = undefined;
  let count = 0;

  do {
    const temp = callback.call(context, arr[count], count, arr);

    if (temp) {
      result = arr[count];
      break;
    }
  } while ((count++ < arr.length - 1));

  return result;
}