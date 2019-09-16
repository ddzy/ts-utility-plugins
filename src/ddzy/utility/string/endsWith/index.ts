/**
 * 检查字符串text是否以给定的target字符串结尾
 * @param text 源字符串
 * @param target 需要检索的字符
 * @param [position] 检索的位置
 * @example
 * // false
 * endsWith('ddzy', 'z');
 * // true
 * endsWith('duanzhaoyang', 'g');
 * // true
 * endsWith('alioe', 'o', 2);
 */
export function endsWith(
  text: string,
  target: string,
  position = text.length,
): boolean {
  const regSubStr = new RegExp(`${target}`, 'g');

  let matchedStrArr = regSubStr.exec(text);

  while (matchedStrArr !== null) {
    const foundIndex = matchedStrArr['index'];

    if (position === text.length) {
      if (foundIndex === position - 1 || foundIndex === text.length - position) {
        return true;
      }
    } else {
      if (text.length - foundIndex === position) {
        return true;
      }
    }

    matchedStrArr = regSubStr.exec(text);
  }

  return false;
}