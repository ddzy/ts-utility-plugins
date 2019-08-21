/**
 * 延迟wait毫秒后执行处理器callback
 * @param callback 处理器
 * @param wait 等待延时
 * @param args 传递的参数
 */
export function delay(
  callback: (...args: any[]) => void,
  wait: number,
  ...args: any[]
): number {
  return window.setTimeout(callback, wait, ...args);
}