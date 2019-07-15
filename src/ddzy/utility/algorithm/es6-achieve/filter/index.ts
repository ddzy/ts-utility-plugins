/**
 * @name _filter
 * @description 模拟实现ES6的array.filter
 * @author ddzy
 * @license MIT
 * @since 2019-7-11
 */

export function _filter<I, T = null>(
  arr: I[],
  callback: (v: I, i: number, self: typeof arr) => boolean,
  thisArg?: T,
): I[] {
  const result: I[] = [];
  let count = 0;

  do {
    const isPassing = callback.call(thisArg, arr[count], count, arr);

    isPassing && (result.push(arr[count]));
  } while ((count++ < arr.length - 1));

  return result;
}