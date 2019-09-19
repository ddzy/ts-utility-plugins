/**
 * 从源数组的右侧开始, 舍弃指定个数的值
 * @param origin 源数组
 * @param gap 需要丢弃的个数
 * @example
 * // [1, 2, 3]
 * dropRight([1, 2, 3, 4, 5], 2);
 */
export function dropRight<I>(
  origin: I[],
  gap = 1,
): I[] {
  return origin.slice(0, origin.length - gap);
}