import { isStrictArray } from "../isStrictArray";

/**
 * 将给定的值强制转成数组
 * @description 如果origin本来就是数组, 则原封不动返回
 * @param origin 任意值
 * @example
 * // [1]
 * castArray(1);
 * @example
 * // [{ a: 1 }]
 * castArray({ a: 1 });
 * @example
 * // arr
 * const arr = [];
 * castArray(arr);
 */
export function castArray<I>(
  origin: I,
): I[] | I {
  // 严格的数组, 直接返回
  if (isStrictArray(origin)) {
    return origin;
  }
  return [origin];
}