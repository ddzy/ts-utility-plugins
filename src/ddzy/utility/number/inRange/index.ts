/**
 * 检查指定值是否在 start 与 end 之间, 但是不包括 end
 * @param value 需要检验的值
 * @param start 起始位置
 * @param end 终止位置
 */
export function inRange(
  value: number,
  start: number,
  end: number,
) {
  start = start > end ? end : start;
  end = start > end ? start : end;

  return value >= start && value < end;
}