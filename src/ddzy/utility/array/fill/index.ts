import { isUndefined } from "../../others/isUndefined";


/**
 * 使用 value 值来填充（替换） array. 从 start 位置开始, 到 end 位置结束(但不包含 end 位置).
 * @param origin 源数组
 * @param value 需要填充的值
 * @param start 填充的起始位置
 * @param end 填充的终止位置
 */
export function fill<I>(
  origin: I[],
  value: I,
  start?: number,
  end?: number,
): typeof origin {
  start = isUndefined(start) ? 0 : start as number;
  end = isUndefined(end) ? origin.length : end as number;

  start = start > end ? end : start;
  end = start > end ? start : end;

  for (let i = start; i < end; i++) {
    origin[i] = value;
  }

  return origin;
}