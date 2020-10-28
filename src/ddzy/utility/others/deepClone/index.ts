import { isStrictArray } from "../../array/isStrictArray";
import { isBasicValue } from "../isBasicValue";

/**
 * 深拷贝
 * @param origin 需要拷贝的目标对象
 */
export default function deepClone(origin: any[] | object) {
  const target = isStrictArray(origin)
    ? []
    : {} as { [key: string]: any };

  for (const [key, value] of Object.entries(origin)) {
    // 普通对象或数组
    if (typeof value === 'object') {
      target[key] = deepClone(value);
    }
    // 基本值
    else if (isBasicValue(value)) {
      target[key] = value;
    }
  }

  return target;
}