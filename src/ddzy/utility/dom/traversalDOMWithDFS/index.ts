import { isDOM } from "../isDOM";

/**
 * DFS遍历指定DOM节点
 * @param container 遍历的DOM容器
 * @param callback 回调
 */
export function traversalDOMWithDFS(
  container: HTMLElement,
  callback: (node: HTMLElement) => void,
) {
  if (!isDOM(container)) {
    throw new TypeError('Require a DOM element');
  }

  callback && callback(container);

  _aidedTraversal(container.children);

  function _aidedTraversal(children: HTMLCollection) {
    if (children.length === 0) {
      return;
    }

    for (let i = 0, every; every = children[i++];) {
      callback && callback(every as HTMLElement);
      _aidedTraversal(every.children);
    }
  }
}