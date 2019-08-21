/**
 * 简单的模拟querySelector
 * @param selector 选择器
 */
export function _querySelector(selector: string): Element | null {
  const plainMatcher: RegExp = /^(?:#([a-zA-Z]+))|(?:\.(\w+))|([a-z]+)$/;
  const matched = selector.match(plainMatcher);

  // ? 处理三种基本类型
  if (matched) {
    if (matched[1]) {
      return document.getElementById(matched[1]);
    } else if (matched[2]) {
      return document.getElementsByClassName(matched[2])[0] || null;
    } else {
      return document.getElementsByTagName(matched[3])[0] || null;
    }
  }

  return null;
}