/**
 * 移出指定DOM元素的单个类名
 * @param el 目标DOM
 * @param className 类名
 */
export function removeClass(el: HTMLElement, className: string) {
  el && el.classList.remove(className);
}