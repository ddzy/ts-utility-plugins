/**
 * 创建并返回一个函数, 等待函数运行指定次数后执行处理器
 * @param time 等待的次数
 * @param callback time次数耗尽之后执行的处理器
 * @example
 * // Work completed!
 * function doingWorkAsync({ type: string, sign: Function }) {
 *    setTimeout(sign, 1000);
 * }
 *
 * const employees = ['jack', 'rose', 'riven'];
 * const fragment = after(employees.length, () => {
 *    console.log('Work completed!');
 * });
 *
 * employees.forEach((employee) => {
 *    doingWorkAsync({ type: 'washing', sign: fragment });
 * });
 */
export function after(
  time: number,
  callback: (...args: any[]) => void,
): (...args: any[]) => void {
  let count = 0;

  return (...args: any[]) => {
    if (count === time - 1) {
      return callback(...args);
    }

    count++;
  };
}