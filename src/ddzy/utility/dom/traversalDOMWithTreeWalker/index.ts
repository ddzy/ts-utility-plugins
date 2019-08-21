import { isDOM } from "../isDOM";

/**
 * TreeWalker遍历指定DOM节点
 * @param container 遍历的DOM容器
 * @param callback 执行回调
 */
export function traversalDOMWithTreeWalker(
  container: HTMLElement,
  callback: (node: HTMLElement) => void,
) {
  if (!isDOM(container)) {
    throw new TypeError('Require a DOM element');
  }

  const treeWalker: TreeWalker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT,
  );
  let currentNode: Node | null = null;

  while ((currentNode = treeWalker.nextNode())) {
    callback && callback((currentNode as HTMLElement));
  }
}