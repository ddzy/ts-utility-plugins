/**
 * 转换字符串string以空格分开单词, 并转换为小写
 * @param text 任意字符串
 * @example
 * // duan zhao
 * lowerCase('--Duan-Zhao--');
 * // alioeduan
 * lowerCase('alioeDuan');
 * // duan zhao yang
 * lowerCase('__DUAN_ZHAO_YANG__');
 */
export function lowerCase(
  text: string,
): string {
  const regSpecialCharacter = /[\W_]+/g;

  return text
    .toLocaleLowerCase()
    .replace(regSpecialCharacter, ' ')
    .trim();
}