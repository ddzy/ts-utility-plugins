/**
 * 获取指定单个DOM元素
 * @param sign 任意选择器
 */
export function getEle(sign: string): HTMLElement | null {
  return document.querySelector(sign);
}