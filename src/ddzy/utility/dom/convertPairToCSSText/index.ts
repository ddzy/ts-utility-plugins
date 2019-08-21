import { convertHumpToHyphen } from "../../others/convertHumpToHyphen";

/**
 * 样式组转化为内联样式(style.cssText)
 * @param pair CSS样式键值对
 */
export function convertPairToCSSText(pair: Partial<CSSStyleDeclaration>): string {
  let text = '';

  for (const key in pair) {
    const value = Reflect.get(pair, key);
    text += `${convertHumpToHyphen(key)}: ${value}; `;
  }

  return text;
}