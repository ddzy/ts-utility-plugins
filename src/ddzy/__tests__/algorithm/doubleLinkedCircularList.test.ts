import { DoubleLinkedCircularList } from "../../utility/algorithm/double-linked-circular-list";
import { ListNode } from "../../utility/algorithm/double-linked-circular-list/list-node";

// ? Double Linked Circular List
describe('DLCL', () => {
  test('dlcl1.handleGetHead should return the `head` of linked-list', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected = [2, 5, 8, 3, 7, 19, 23, 14, 41];
    const head = dlcl1.handleGetHead();
    const tail = dlcl1.handleGetTail();

    // ? 正向遍历
    let current: ListNode<number> | null = head;
    let count: number = 0;
    while (current && current !== tail) {
      expect(current.value).toBe(expected[count]);

      count++;
      current = current.next;
    }
    if (current) {
      expect(current.value).toBe(expected[count]);
      // ? 重置
      current = tail;
      count = expected.length - 1;
    }

    // ? 反向遍历
    while (current && current !== head) {
      expect(current.value).toBe(expected[count]);

      count--;
      current = current.prev;
    }
    if (current) {
      expect(current.value).toBe(expected[count]);
    }
  });

  test('dlcl1.handleGetTail should return the `tail` of linked-list', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected = [2, 5, 8, 3, 7, 19, 23, 14, 41];
    const tail = dlcl1.handleGetTail();
    const head = dlcl1.handleGetHead();

    let current: ListNode<number> | null = tail;
    let count: number = expected.length - 1;
    // ? 反向遍历
    while (current && current !== head) {
      expect(current.value).toBe(expected[count]);

      count--;
      current = current.prev;
    }
    if (current) {
      expect(current.value).toBe(expected[count]);

      // ? 重置
      count = 0;
      current = head;
    }

    // ? 正向遍历
    while (current && current !== tail) {
      expect(current.value).toBe(expected[count]);

      count++;
      current = current.next;
    }
    if (current) {
      expect(current.value).toBe(expected[count]);
    }
  });

  test('dlcl1.handleGetLength should return the length of linked-list', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected_1 = 9;
    const expected_2 = 8;
    const expected_3 = 10;

    const result_1: number = dlcl1.handleGetLength();
    expect(result_1).toBe(expected_1);

    const result_2: number = dlcl1.handleRemove(41).handleGetLength();
    expect(result_2).toBe(expected_2);

    const result_3: number = dlcl1.handleAppend(41).handleAppend(100).handleGetLength();
    expect(result_3).toBe(expected_3);
  });

  test('dlcl1.handleAppend should add new node to the tail of the linked-list', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected_length_1 = 9;
    const expected_value_1 = 41;
    const expected_length_2 = 10;
    const expected_value_2 = 100;
    const expected_length_3 = 11;
    const expected_value_3 = 200;

    const result_length_1: number = dlcl1.handleGetLength();
    const result_value_1: number = (dlcl1.handleGetTail() as ListNode<number>).value;
    expect(result_length_1).toBe(expected_length_1);
    expect(result_value_1).toBe(expected_value_1);

    const result_length_2: number = dlcl1.handleAppend(100).handleGetLength();
    const result_value_2: number = (dlcl1.handleGetTail() as ListNode<number>).value;
    expect(result_length_2).toBe(expected_length_2);
    expect(result_value_2).toBe(expected_value_2);

    const result_length_3: number = dlcl1.handleAppend(200).handleGetLength();
    const result_value_3: number = (dlcl1.handleGetTail() as ListNode<number>).value;
    expect(result_length_3).toBe(expected_length_3);
    expect(result_value_3).toBe(expected_value_3);
  });

  test('dlcl1.handlePrepend should add new node to the head of the linked-list', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected_length_1 = 9;
    const expected_value_1 = 2;
    const expected_length_2 = 10;
    const expected_value_2 = 100;
    const expected_length_3 = 11;
    const expected_value_3 = 200;

    const result_length_1: number = dlcl1.handleGetLength();
    const result_value_1: number = (dlcl1.handleGetHead() as ListNode<number>).value;
    expect(result_length_1).toBe(expected_length_1);
    expect(result_value_1).toBe(expected_value_1);

    const result_length_2: number = dlcl1.handlePrepend(100).handleGetLength();
    const result_value_2: number = (dlcl1.handleGetHead() as ListNode<number>).value;
    expect(result_length_2).toBe(expected_length_2);
    expect(result_value_2).toBe(expected_value_2);

    const result_length_3: number = dlcl1.handlePrepend(200).handleGetLength();
    const result_value_3: number = (dlcl1.handleGetHead() as ListNode<number>).value;
    expect(result_length_3).toBe(expected_length_3);
    expect(result_value_3).toBe(expected_value_3);
  });

  test('dlcl1.handleInsertBefore should add new list-node to the front of the target node', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected_length_1 = 10;
    const expected_value_1 = 100;
    const expected_length_2 = 11;
    const expected_value_2 = 200;

    // ? 头节点
    const result_length_1: number = dlcl1.handleInsertBefore(2, 100).handleGetLength();
    const result_value_1: number = (dlcl1.handleGetHead() as ListNode<number>).value;
    expect(result_length_1).toBe(expected_length_1);
    expect(result_value_1).toBe(expected_value_1);

    // ? 其它部位
    const result_length_2: number = dlcl1.handleInsertBefore(2, 200).handleGetLength();
    const result_value_2: number = ((dlcl1.handleGetHead() as ListNode<number>).next as ListNode<number>).value;
    expect(result_length_2).toBe(expected_length_2);
    expect(result_value_2).toBe(expected_value_2);
  });

  test("dlcl1.handleInsertAfter should add new list-node to the back of the target node", () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });

    const expected_length_1 = 10;
    const expected_value_1 = 100;
    const expected_length_2 = 11;
    const expected_value_2 = 200;

    // ? 尾部节点
    const result_length_1: number = dlcl1.handleInsertAfter(41, 100).handleGetLength();
    const result_value_1: number = (dlcl1.handleGetTail() as ListNode<number>).value;
    expect(result_length_1).toBe(expected_length_1);
    expect(result_value_1).toBe(expected_value_1);

    // ? 其它部位
    const result_length_2: number = dlcl1.handleInsertAfter(41, 200).handleGetLength();
    const result_value_2: number = ((dlcl1.handleGetTail() as ListNode<number>).prev as ListNode<number>).value;
    expect(result_length_2).toBe(expected_length_2);
    expect(result_value_2).toBe(expected_value_2);
  });

  test('dlcl1.handleRemove should remove special node from the linked-list', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });
    const received_value = 7;
    const expected_length = 8;
    const expected_value = false;

    const result_length: number = dlcl1.handleRemove(7).handleGetLength();
    expect(result_length).toBe(expected_length);

    let sign: boolean = false;
    dlcl1.handleTraversalWithForward((node) => {
      if (node.value === received_value) {
        sign = true;
      }
    });
    expect(sign).toBe(expected_value);
  });

  test('dlcl1.handleTraversalWithForward should traversal the linked-list forwardly', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });
    const expected = [2, 5, 8, 3, 7, 19, 23, 14, 41];
    let sign = false;
    let count = 0;

    dlcl1.handleTraversalWithForward((node) => {
      node.value !== expected[count] && (sign = true);
      count++;
    });

    expect(sign).toBeFalsy();
  });

  test('dlcl1.handleTraversalWithBackward should traversal the linked-list backwardly', () => {
    const dlcl1 = new DoubleLinkedCircularList<number>({
      nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
    });
    const expected = [41, 14, 23, 19, 7, 3, 8, 5, 2];

    let sign = false;
    let count = 0;

    dlcl1.handleTraversalWithBackward((node) => {
      node.value !== expected[count] && (sign = true);
      count++;
    });

    expect(sign).toBeFalsy();
  });
});