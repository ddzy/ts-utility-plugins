/**
 * 将源数组根据指定大小分片
 * @param origin 源数组
 * @param size 分片大小
 */
export function trunk<I>(origin: I[], size = 1) {
  const result: I[][] = [];
  let count = 0;

  if (!origin.length) {
    return result;
  }

  do {
    result.push(origin.slice(count, count + size));
  } while ((count += size) < origin.length);

  return result;
}