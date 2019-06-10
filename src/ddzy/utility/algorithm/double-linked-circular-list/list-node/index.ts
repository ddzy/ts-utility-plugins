/**
 * @description 链表节点
 */
export interface IListNodeProps<V> {
  value: V,
  next: ListNode<V> | null,
  prev: ListNode<V> | null,
};

export class ListNode<V> {
  public value: V;
  public next: ListNode<V> | null;
  public prev: ListNode<V> | null;

  public constructor(props: IListNodeProps<V>) {
    this.value = props.value;
    this.next = props.next;
    this.prev = props.prev;
  }
}