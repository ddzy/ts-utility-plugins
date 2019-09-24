/**
 * 模拟实现instanceOf
 * @description 表达式右侧的值是否存在于左侧的原型链上
 * @param leftValue 任意值
 * @param rightValue 任意值
 * @example
 * // true
 * _instanceOf([], Array);
 * // false
 * _instanceOf({}, null);
 */
export function _instanceOf(
  leftValue: any,
  rightValue: any,
): boolean {
  let result = false;
  let oLeftValueProto: any = leftValue;

  try {
    while ((oLeftValueProto = oLeftValueProto.__proto__)) {
      if (oLeftValueProto === rightValue.prototype) {
        result = true;

        break;
      }
    }
  } catch (error) {
    result = false;
  } finally {
    return result;
  }
}