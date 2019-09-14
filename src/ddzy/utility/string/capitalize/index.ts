/**
 * 将指定的字符串的首字母大写, 剩下为小写
 * @param text 任意字符串
 * @example
 * // Duan
 * capitalize('duan');
 * @example
 * // Zhao
 * capitalize('ZHAO');
 * @example
 * // Yang
 * capitalize('yANG');
 * @example
 * // _College
 * capitalize('_college');
 */
export function capitalize(
  text: string,
): string {
  if (!text) {
    return text;
  }

  const regLowerCaseCharacter = /[a-z]{1}/;

  text = text
    .toLocaleLowerCase()
    .replace(regLowerCaseCharacter, ($1) => {
      return $1.toLocaleUpperCase();
    });

  return text;
}