/**
 * 设置单个DOM属性
 * @param ele 目标DOM
 * @param options 属性键值对
 */
export function setAttr(ele: HTMLElement, options: {
  [key: string]: any
}) {
  for (const key in options) {
    ele.setAttribute(key, options[key]);
  }
}