/**
 * @name _includes
 * @description 模拟ES6的`array.includes()`
 * @author ddzy
 * @license MIT
 * @since 2019-7-29
 */

/**
 * 判断数组中是否存在指定值
 * @param origin 源数组
 * @param target 目标值
 * @param fromIndex 起始位置
 */
export function _includes<I>(
  origin: I[],
  target: any,
  fromIndex?: number,
): boolean {
  let result = false;

  fromIndex = fromIndex
    ? fromIndex < 0
      ? origin.length + fromIndex
      : fromIndex
    : 0;

  do {
    if (Object.is) {
      if (Object.is(target, origin[fromIndex])) {
        result = true;
        break;
      }
    } else {
      if (String(target) === 'NaN' && String(origin[fromIndex]) === 'NaN') {
        result = true;
        break;
      }
      if (target === origin[fromIndex]) {
        result = true;
        break;
      }
    }
  } while ((fromIndex++ < origin.length - 1));

  return result;
}