import { isDOM } from "../isDOM";

/**
 * NodeIterator遍历指定DOM节点
 * @param container 遍历的DOM容器
 * @param callback 执行回调
 */
export function traversalDOMWithNodeIterator(
  container: HTMLElement,
  callback: (node: HTMLElement) => void,
) {
  if (!isDOM(container)) {
    throw new TypeError('Require a DOM element');
  }

  const nodeIterator: NodeIterator = document.createNodeIterator(
    container,
    NodeFilter.SHOW_ELEMENT,
  );
  let currentNode: Node | null = null;

  while ((currentNode = nodeIterator.nextNode())) {
    callback && callback(currentNode as HTMLElement);
  }
}