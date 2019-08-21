/**
 * 从右往左执行处理器函数
 * @param callbacks 处理器
 */
export function compose(...callbacks: Function[]): any {
  return callbacks.reduceRight((total, current) => {
    return current(total);
  });
}