/**
 * 设置单个DOM样式
 * @param ele 目标DOM
 * @param options 样式键值对
 */
export function setCss(ele: HTMLElement, options: Record<string, any>) {
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const element = options[key];
      ele.style.cssText += `${key}: ${element};`;
    }
  }
}