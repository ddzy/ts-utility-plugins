import {
  ListNode,
} from './list-node/index';

export interface IDoubleLinkedCircularListProps<V> {
  nodes?: V[];
};


/**
 * TODO: append -> 追加至末尾
 * TODO: prepend -> 追加至首部
 * TODO: insertBefore -> 追加至某个节点前
 * TODO: insertAfter -> 追加至某个节点后
 * TODO: traversalWithForward -> 正向遍历
 * TODO: traversalWithBackward -> 反向遍历
 * TODO: getHead -> 获取头节点
 * TODO: getTail -> 获取尾节点
 */

export class DoubleLinkedCircularList<V> {
  public static readonly defaultProps: IDoubleLinkedCircularListProps<any> = {
    nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
  }

  public constructor(props: IDoubleLinkedCircularListProps<V>) {
    this.__init__(props);
  }

  private __init__(
    props: IDoubleLinkedCircularListProps<V>,
  ): void {
    this._initProps(props);
  }

  private _initProps(
    props: IDoubleLinkedCircularListProps<V>,
  ): void {
    for (const key in props) {
      DoubleLinkedCircularList.defaultProps[
        key as keyof typeof DoubleLinkedCircularList.defaultProps
      ] = props[
        key as keyof typeof DoubleLinkedCircularList.defaultProps
      ]
    }
  }
}