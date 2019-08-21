/**
 * 防抖函数
 * @param callback 处理器
 * @param options 配置项
 */
export function debounce(
  callback: (...args: any[]) => void,
  options: {
    timestamp?: number,
  }
): (...args: any[]) => void {
  let timer: any = null;
  let {
    timestamp = 500,
  } = options;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(this as any, args);
    }, timestamp);
  }
}