/**
 * 获取指定的所有DOM元素
 * @param sign 任意选择器
 */
export function getAllEle(sign: string): ArrayLike<HTMLElement> | null {
  return document.querySelectorAll(sign);
}