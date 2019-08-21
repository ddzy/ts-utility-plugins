/**
 * 获取指定范围内的随机任意数
 * @param min 小边界
 * @param max 大边界
 */
export function getAnyRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}