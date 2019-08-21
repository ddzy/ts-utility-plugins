/**
 * 驼峰字符串转连字符
 * @param hump 驼峰形式字符串
 */
export function convertHumpToHyphen(hump: string): string {
  const reg: RegExp = /[A-Z]+/;

  return hump.replace(reg, (matched) => {
    return `-${matched.toLowerCase()}`;
  });
}