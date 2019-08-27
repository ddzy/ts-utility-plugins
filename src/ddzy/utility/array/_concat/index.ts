import { isStrictArray } from "../isStrictArray";

/**
 * 将给定的任意数量的值追加至源数组
 * @description Array.concat的Polyfill
 * @param origin 源数组
 * @param args 需要被连接的值
 * @returns 新数组
 */
export function _concat<I>(
  origin: I[],
  ...args: I[]
): I[] {
  const result: I[] = origin.slice(0);

  let count = 0;
  do {
    if (isStrictArray(args[count])) {
      const arr = args[count] as unknown as any[];

      arr.forEach((v) => {
        result.push(v);
      });

      continue;
    }

    result.push(args[count]);
  } while ((count++ < args.length - 1));

  return result;
}