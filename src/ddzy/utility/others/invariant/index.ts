/**
 * 自定义异常处理
 * @param condition 判断条件
 * @param message 错误信息
 */
export function invariant(condition: boolean, message: string) {
  if (condition) {
    throw new TypeError(
      `Ddzy's plugin error: ${message}`
    );
  }
}