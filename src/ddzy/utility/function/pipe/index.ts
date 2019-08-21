/**
 * 从左往右依次执行处理器函数
 * @param callbacks 处理器
 */
export function pipe(...callbacks: Function[]): any {
  return callbacks.reduce((total, current) => {
    return current(total);
  });
}