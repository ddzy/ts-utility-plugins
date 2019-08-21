/**
 * 节流函数
 * @param timestamp 时间戳
 * @param callback 执行回调
 */
export function throttle(timestamp: number, callback: (...args: any[]) => void) {
  let lastClickTime = Date.now();

  return (...args: any[]) => {
    const currentClickTime = Date.now();

    if (currentClickTime - lastClickTime > timestamp) {
      callback.apply<ThisType<any>, any[], any>(globalThis, args);
      lastClickTime = currentClickTime;
    }
  }
}