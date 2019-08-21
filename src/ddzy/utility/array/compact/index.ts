/**
 * 过滤指定数组中的假值(0、''、false、null、undefined、NaN)
 * @param origin 源数组
 * @returns 新数组
 */
export function compact<I>(origin: I[]) {
  const result: I[] = [];

  origin.forEach((v) => {
    v && (result.push(v));
  });

  return result;
}