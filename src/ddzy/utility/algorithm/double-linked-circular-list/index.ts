/**
 * @name 双向循环链表
 * @description 插件
 * @author ddzy
 * @since 2019/6/10
 */

import {
  ListNode,
} from './list-node/index';

export interface IDoubleLinkedCircularListProps<V> {
  nodes?: V[];
};
export interface IDoubleLinkedCircularListState<V> {
  head: ListNode<V> | null;
  tail: ListNode<V> | null;
  length: number;
};

export class DoubleLinkedCircularList<V> {
  public static readonly defaultProps: IDoubleLinkedCircularListProps<any> = {
    nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
  }

  public constructor(props: IDoubleLinkedCircularListProps<V>) {
    this.__init__(props);
  }


  private readonly state: IDoubleLinkedCircularListState<V> = {
    head: null,
    tail: null,
    length: 0,
  };


  private __init__(
    props: IDoubleLinkedCircularListProps<V>,
  ): void {
    this._initProps(props);
    this._initLinkedList();
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

  private _initLinkedList(): void {
    const {
      nodes,
    } = DoubleLinkedCircularList.defaultProps;

    for (const v of (nodes as V[])) {
      this.handleAppend(v);
    }
  }

  private _aidedHandleGetHead(): ListNode<V> | null {
    return this.state.head;
  }

  private _aidedHandleGetTail(): ListNode<V> | null {
    return this.state.tail;
  }

  private _aidedHandleAppend(
    node: ListNode<V>,
  ): void {
    if (!this.state.head) {
      this.state.head = node;
      this.state.tail = node;
      node.next = this.state.head;
      node.prev = this.state.tail;

      this.state.length += 1;
    }
    else {
      let current: ListNode<V> | null = this.state.head;

      while (current && current !== this.state.tail) {
        current = current.next;
      }

      // ? 找到最后一个节点
      if (current) {
        current.next = node;
        node.prev = current;
        this.state.tail = node;
        this.state.tail.next = this.state.head;
        this.state.head.prev = this.state.tail;

        this.state.length += 1;
      }
    }
  }

  private _aidedHandlePrepend(
    node: ListNode<V>,
  ): void {
    if (!this.state.head) {
      this.state.head = node;
      this.state.tail = node;
      node.prev = this.state.head;
      node.next = this.state.head;
    }
    else {
      node.next = this.state.head;
      node.prev = this.state.tail;
      this.state.head.prev = node;
      this.state.head = node;
    }

    this.state.length += 1;
  }

  private _aidedHandleInsertBefore(
    target: V,
    node: ListNode<V>,
  ): void {
    let current: ListNode<V> | null = this.state.head;

    while (current && current !== this.state.tail) {
      if (current.value === target) {
        // ? 如果系头节点
        if (current === this.state.head) {
          this.handlePrepend(node.value);
        }
        else {
          if (current.prev) {
            current.prev.next = node;
            node.prev = current.prev;
            node.next = current;
            current.prev = node;

            this.state.length++;
          }
        }
      }

      current = current.next;
    }

    // ? 最后一个节点
    if (current) {
      if (current.value === target) {
        if (current.prev) {
          current.prev.next = node;
          node.prev = current.prev;
          node.next = current;
          current.prev = node;

          this.state.length++;
        }
      }
    }
  }

  private _aidedHandleInsertAfter(
    target: V,
    node: ListNode<V>,
  ): void {
    let current: ListNode<V> | null = this.state.head;

    while (current && current !== this.state.tail) {
      if (current.value === target) {
        if (current.next) {
          current.next.prev = node;
          node.next = current.next;
          node.prev = current;
          current.next = node;

          this.state.length += 1;
        }
      }

      current = current.next;
    }

    // ? 尾节点
    if (current) {
      if (current.value === target) {
        if (current.next) {
          this.state.tail = node;
          current.next.prev = node;
          node.next = current.next;
          node.prev = current;
          current.next = node;

          this.state.length += 1;
        }
      }
    }
  }

  private _aidedHandleTraversalWithForward(
    callback: (node: ListNode<V>) => void,
  ): void {
    let current: ListNode<V> | null = this.state.head;

    while (current && current !== this.state.tail) {
      callback(current);
      current = current.next;
    }
    if (current) {
      callback(current);
    }
  }

  private _aidedHandleTraversalWithBackward(
    callback: (node: ListNode<V>) => void,
  ): void {
    let current: ListNode<V> | null = this.state.tail;

    while (current && current !== this.state.head) {
      callback(current);
      current = current.prev;
    }
    if (current) {
      callback(current);
    }
  }

  private _aidedHandleGetLength(): number {
    return this.state.length;
  }

  private _aidedHandleRemove(
    value: V,
  ): void {
    let current: ListNode<V> | null = this.state.head;

    while (current && current !== this.state.tail) {
      if (current.value === value) {
        // ? 头节点
        if (current === this.state.head) {
          this.state.head = current.next;

          if (current.next) {
            current.next.prev = this.state.tail;
          }
          if (this.state.tail) {
            this.state.tail.next = this.state.head;
          }
        }
        // ? 其它
        else {
          if (current.prev) {
            current.prev.next = current.next;
          }
          if (current.next) {
            current.next.prev = current.prev;
          }
        }

        this.state.length -= 1;
      }

      current = current.next;
    }

    // ? 尾节点
    if (current && current.value === value) {
      this.state.tail = current.prev;

      if (current.prev) {
        current.prev.next = this.state.head;
      }
      if (this.state.head) {
        this.state.head.prev = this.state.tail;
      }

      this.state.length -= 1;
    }
  }


  /**
   * 获取头节点, 入口
   */
  public handleGetHead(): ListNode<V> | null {
    return this._aidedHandleGetHead();
  }

  /**
   * 获取尾节点, 入口
   */
  public handleGetTail(): ListNode<V> | null {
    return this._aidedHandleGetTail();
  }

  /**
   * 尾部追加节点, 入口
   * @param value 节点值
   */
  public handleAppend(
    value: V,
  ): DoubleLinkedCircularList<V> {
    const node = new ListNode<V>({
      value,
      next: null,
      prev: null,
    });

    this._aidedHandleAppend(node);

    return this;
  }

  /**
   * 首部追加节点, 入口
   * @param value 节点值
   */
  public handlePrepend(
    value: V
  ): DoubleLinkedCircularList<V> {
    const node = new ListNode<V>({
      value,
      next: null,
      prev: null,
    });

    this._aidedHandlePrepend(node);

    return this;
  }

  /**
   * 将目标节点插入至源节点前, 入口
   * @param target 源节点
   * @param value 目标节点
   */
  public handleInsertBefore(
    target: V,
    value: V,
  ): DoubleLinkedCircularList<V> {
    const node = new ListNode<V>({
      value,
      next: null,
      prev: null,
    });

    this._aidedHandleInsertBefore(target, node);

    return this;
  }

  /**
   * 将目标节点插入至源节点后, 入口
   * @param target 源节点
   * @param value 目标节点
   */
  public handleInsertAfter(
    target: V,
    value: V,
  ): DoubleLinkedCircularList<V> {
    const node = new ListNode<V>({
      value,
      next: null,
      prev: null,
    });

    this._aidedHandleInsertAfter(target, node);

    return this;
  }

  /**
   * 正向遍历双向循环链表, 入口
   * @param callback 回调
   */
  public handleTraversalWithForward(
    callback: (node: ListNode<V>) => void,
  ): void {
    this._aidedHandleTraversalWithForward(callback);
  }

  /**
   * 反向遍历双向循环链表, 入口
   * @param callback 回调
   */
  public handleTraversalWithBackward(
    callback: (node: ListNode<V>) => void,
  ): void {
    this._aidedHandleTraversalWithBackward(callback);
  }

  /**
   * 获取链表长度, 入口
   */
  public handleGetLength(): number {
    return this._aidedHandleGetLength();
  }

  public handleRemove(
    value: V,
  ): DoubleLinkedCircularList<V> {
    this._aidedHandleRemove(value);

    return this;
  }
}