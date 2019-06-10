/**
 * @description 链表节点
 */
export interface IListNodeProps<V> {
  value: V,
  next: ListNode<V>,
  prev: ListNode<V>,
};

export class ListNode<V> {
  public value: V;
  public next: ListNode<V>;
  public prev: ListNode<V>;

  public constructor(props: IListNodeProps<V>) {
    this.value = props.value;
    this.next = props.next;
    this.prev = props.prev;
  }
}