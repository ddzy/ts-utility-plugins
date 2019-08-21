/**
 * 判断是否普通的对象
 * @param origin 目标值
 */
export function isPlainObject(origin: any): boolean {
  return origin && (
    ({}).toString.call(origin) === '[object Object]'
  );
}