/**
 * 创建一个切片数组, 去除源数组中从特定的 callback 返回假值开始到尾部的部分
 * @param origin 源数组
 * @param callback 处理器
 * @example
 * // { 'user': 'barney',  'active': true }
 * const users = [
 *    { 'user': 'barney',  'active': true },
 *    { 'user': 'fred',    'active': false },
 *    { 'user': 'pebbles', 'active': false }
 * ]
 * dropRightWhile(users, function(v) {
 *    return !v.active;
 * });
 */
export function dropRightWhile<I>(
  origin: I[],
  callback: (v: I, i: number, self: typeof origin) => boolean,
): I[] {
  let result: I[] = [];

  if (!origin.length) {
    return result;
  }

  for (const [i, v] of origin.entries()) {
    const bChecker = callback(v, i, origin);

    if (bChecker) {
      result = origin.slice(0, i);
      break;
    }
  }

  return result;
}