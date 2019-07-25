/**
 * @name _find
 * @description 模拟ES6的`array.some()`
 * @author ddzy
 * @license MIT
 * @since 2019-7-25
 */

export function _some<I, T = null>(
  arr: I[],
  callback: (v: I, i: number, self: typeof arr) => boolean,
  context?: T,
): boolean {
  let result = false;
  let count = 0;

  if (!arr.length) {
    return result;
  }

  do {
    result = callback.call(context, arr[count], count, arr);

    if (result) {
      break;
    }
  } while ((count++ < arr.length - 1));

  return result;
}