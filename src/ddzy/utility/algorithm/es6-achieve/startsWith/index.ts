/**
 * @name _find
 * @description 模拟ES6的`array.find()`
 * @author ddzy
 * @license MIT
 * @since 2019-7-17
 */


/**
 *
 * @param origin 源字符串
 * @param target 需要比对的字符
 * @param startIndex 起始位置
 */
export function _startsWith(
  origin: string,
  target: string,
  startIndex: number = 0,
): boolean {
  const subStr = origin.substring(startIndex, target.length);

  return subStr === target;
}