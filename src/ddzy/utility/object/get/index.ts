import { isStrictArray } from "../../array/isStrictArray";
import { isUndefined } from "../../others/isUndefined";
import { trim } from "../../string/trim";

/**
 * 根据 object 对象的 path 路径获取值
 * @param origin 提供的源对象
 * @param path 路径信息
 * @param defaultValue 路径对应的值为 undefined 时, 使用该值替代
 */
export function get(
  origin: object,
  path: string | string[],
  defaultValue?: any,
): any {
  const formatedOrigin = origin;
  const formatedPath = typeof path === 'string'
    ? path.split('.')
    : isStrictArray(path)
      ? path
      : [];
  const formatedDefaultValue = defaultValue || undefined;

  const regAttrPicker = /^(\w+)\[(\d{1})\]$/;
  let tempValue: any = formatedOrigin;

  for (let i = 0, every; every = formatedPath[i++];) {
    try {
      const matchedAttr = every.match(regAttrPicker);

      if (matchedAttr) {
        tempValue = tempValue[matchedAttr[1]][matchedAttr[2]];
      } else {
        tempValue = tempValue[every];
      }
    } catch (error) {
      return formatedDefaultValue;
    }
  }

  return isUndefined(tempValue) ? defaultValue : tempValue;
}