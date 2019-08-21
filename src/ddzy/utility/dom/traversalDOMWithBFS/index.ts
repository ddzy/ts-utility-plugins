/**
 * BFS遍历指定DOM节点
 * @param container 遍历的DOM容器
 * @param callback 回调
 */
export function traversalDOMWithBFS(
  container: HTMLElement,
  callback: (node: HTMLElement) => void,
) {
  if (!this.isDOM(container)) {
    throw new TypeError('Require a DOM element');
  }

  const queue: Element[] = [container];

  while (queue.length) {
    const node = (queue.shift() as HTMLElement);
    callback && callback(node);

    const children = node.children as ArrayLike<Element>;
    queue.push(...(Array.from(children)));
  }
}