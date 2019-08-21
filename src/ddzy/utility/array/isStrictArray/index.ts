import { isBasicValue } from "../../others/isBasicValue";

/**
 * 判断是否严格的数组
 * @param origin 目标值
 */
export function isStrictArray(origin: any): boolean {
  if (Array.isArray(origin)) {
    return Array.isArray(origin);
  } else {
    // basic value
    if (isBasicValue(origin)) {
      return false;
    } else if (typeof origin === 'object') {
      if (origin.length) {
        // array like
        return Object.toString.call(() => origin) === '[object Array]';
      } else {
        return false;
      }
    }
    return false;
  }
}