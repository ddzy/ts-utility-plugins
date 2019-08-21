/**
 * 检查是否DOM元素
 * @param node 指定目标
 */
export function isDOM(node: any): boolean {
  return node
    && typeof node === 'object'
    && node.nodeType === 1;
}