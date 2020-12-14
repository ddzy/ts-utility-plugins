/**
 * 判断给定的值是否为 Symbol 类型
 * @param a 任意值
 */
export default function isSymbol(a: any): boolean {
  return typeof a === 'symbol';
}