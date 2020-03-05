/**
 * 按照指定模式, 拆分字符串 string 中的词为数组
 * @param text 任意字符
 * @param pattern 匹配模式
 */
export function words(
  text: string,
  pattern: RegExp
): string[] {
  const defaultPattern = pattern || /\s+/g;

  return text
    .replace(defaultPattern, '|')
    .split('|');
}