/**
 * 获取指定数组的第一个元素
 * @param origin 源数组
 * @example
 * // 'duan'
 * head(['duan', 'zhao', 'yang']);
 * // undefined
 * head([]);
 */
export function head<I>(
  origin: I[]
): I {
  return origin[0];
}