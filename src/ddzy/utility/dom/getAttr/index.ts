/**
 * 获取DOM的特定属性值
 * @param ele 目标DOM
 * @param key 属性名
 */
export function getAttr(ele: HTMLElement, key: string): string | null {
  return ele.getAttribute(key);
}