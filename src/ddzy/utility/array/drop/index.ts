/**
 * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
 * @param origin 源数组
 * @param count 丢弃的个数
 * @example
 * // [4, 5, 6]
 * drop([1, 2, 3, 4, 5, 6], 3);
 */
export function drop<I>(
  origin: I[],
  count = 1,
): I[] {
  const result: I[] = [];

  if (!origin.length) {
    return result;
  }

  let sign = count;
  do {
    result.push(origin[sign]);
  } while ((sign++ < origin.length - 1));

  return result;
}