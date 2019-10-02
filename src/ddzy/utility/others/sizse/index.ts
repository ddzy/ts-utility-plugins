import { isPlainObject } from "../../object/isPlainObject";

/**
 * 返回collection（集合）的长度, 如果集合是类数组或字符串, 返回其 length;
 * 如果集合是对象, 返回其可枚举属性的个数.
 * @param origin 任意值
 * @example
 * // 4
 * size('ddzy');
 * @example
 * // 0
 * size([]);
 * @example
 * // 2
 * size({ name: 'ddzy', age: 21 });
 */
export function size(
  origin: any
): number {
  let result = 0;

  try {
    if (origin.length) {
      result = origin.length;
    } else if (isPlainObject(origin)) {
      for (const key in origin) {
        if (origin.hasOwnProperty(key)) {
          result++;
        }
      }
    }
  } catch (error) {
    result = 0;
  } finally {
    return result;
  }
}