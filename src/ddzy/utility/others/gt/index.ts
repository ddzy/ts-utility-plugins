/**
 * 检查x是否大于y
 * @param x 比数
 * @param y 被比数
 * @example
 * // true
 * gt(10, 5);
 * // false
 * gt(10, 10);
 * // false,
 * gt(10, 20);
 */
export function gt(
  x: number,
  y: number,
): boolean {
  return x > y;
}