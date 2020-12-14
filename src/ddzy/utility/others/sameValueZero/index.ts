import isBoolean from "../isBoolean";
import isNaN from "../isNaN";
import { isNull } from "../isNull";
import isNumber from "../isNumber";
import isString from "../isString";
import isSymbol from "../isSymbol";

/**
 * 使用 SameValueZero 策略比较两个值是否相等
 * @see http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero
 * @description SameValueZero 和 SameValue 的区别在于前者: SameValueZero(0, -0) => true
 * @param a 需要对比的第一个值
 * @param b 需要对比的第二个值
 */
export default function sameValueZero(a: any, b: any): boolean {
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'undefined' && typeof b === 'undefined') {
    return true;
  }
  if (isNull(a) && isNull(b)) {
    return true;
  }
  if (isNumber(a) && isNumber(b)) {
    if (isNaN(a) && isNaN(b)) {
      return true;
    }
    if (a === 0 && b === 0 && (1 / a > 0) && (1 / b) < 0) {
      return true;
    }
    if (a === 0 && b === 0 && (1 / a < 0) && (1 / b) > 0) {
      return true;
    }
    if (a == b) {
      return true;
    }
    return false;
  }
  if (isString(a) && isString(b)) {
    return a === b;
  }
  if (isBoolean(a) && isBoolean(b)) {
    return a === b;
  }
  if (isSymbol(a) && isSymbol(b)) {
    return a === b;
  }
  return a === b;
}