/**
 * 判断是否为null
 * @param origin 任意值
 */
export function isNull(origin: any): boolean {
  return !(utilityOthers.isUndefined(origin))
    && origin == undefined;
}