/**
 * @description 将数组中的所有元素转换为由 separator 分隔的字符串。
 * @param origin 源数组
 * @param separator 分隔符
 * @returns 字符串
 */
export function _join<I>(
  origin: I[],
  separator = '',
): string {
  let result = '';

  for (let i = 0; i < origin.length; i++) {
    result += `${origin[i]}${i === origin.length - 1 ? '' : separator}`;
  }

  return result;
}