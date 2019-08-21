/**
 * 指定DOM添加单个类名
 * @param el 目标DOM
 * @param className 类名
 */
export function addClass(el: HTMLElement, className: string) {
  el && el.classList.add(className);
}