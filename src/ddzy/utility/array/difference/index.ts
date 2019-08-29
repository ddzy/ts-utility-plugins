/**
 * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中
 * @param origin 源数组
 * @param args 任意数量的参数
 */
export function difference<I>(
  origin: I[],
  ...args: any[]
): I[] {
  const result: I[] = [];
  const cache = new Map<I, number>();

  args.forEach((v) => {
    cache.set(v, 1);
  });

  origin.forEach((v) => {
    if (!cache.has(v)) {
      result.push(v);
    }
  });

  return result;
}