import utilityAlgorithm from "../utility/algorithm";
import {
  ListNode,
} from "../utility/algorithm/double-linked-circular-list/list-node";

describe('utilityAlgorithm tests', () => {
  // ? Binary Search Tree
  describe('BST', () => {
    const bst = new utilityAlgorithm.BST({
      nodes: [2, 5, 3, 8, 7, 4, 9, 12, 23, 10, 1],
    });

    test('bst.handleHasValue should receive a number and return true or false if the value was exist', () => {
      const received = [2, 5, 3, 8, 7, 4, 9, 12, 23, 10, 1];

      for (const v of received) {
        expect(bst.handleHasValue(v)).toBeTruthy();
      }
    });

    test('bst.handleInsert should receive a number and insert it to root', () => {
      const received = [100, 200, 300];

      for (const v of received) {
        bst.handleInsert(v);
        expect(bst.handleHasValue(v)).toBeTruthy();
      }
    });

    test('bst.handleRemove should receive a number and remove it from root', () => {
      const received = [100, 200, 300];

      for (const v of received) {
        bst.handleRemove(v);
        expect(bst.handleHasValue(v)).toBeFalsy();
      }
    });

    test('bst.handleGetDepth should return the whole tree depth when received undefined', () => {
      const expected = 6;

      expect(bst.handleGetDepth()).toBe(expected);
    });

    test('bst.handleGetDepth should receive a number and return its depth which was in tree', () => {
      const received = [5, 7, 23];
      const expected = [2, 4, 6];

      for (const [i, v] of received.entries()) {
        expect(bst.handleGetDepth(v)).toBe(expected[i]);
      }
    });

    test('bst.handleGetHeight should return whe whole tree height when received undefined', () => {
      const expected = 6;

      expect(bst.handleGetHeight()).toBe(expected);
    });

    test('bst.handleGetHeight should receive a number and return its height which was in tree', () => {
      const received = [5, 7, 23];
      const expected = [5, 1, 1];

      for (const [i, v] of received.entries()) {
        expect(bst.handleGetHeight(v)).toBe(expected[i]);
      }
    });

    test('bst.handleGetLeaves should return the collection of leaves node', () => {
      const expected = [1, 4, 7, 10, 23];
      const result = bst.handleGetLeaves();

      for (const [i, v] of result.entries()) {
        expect(v.value).toBe(expected[i]);
      }
    });

    test('bst.handleFrontOrderTraversal should ergodic the whole tree by using front-order and execute callback parameter', () => {
      const expected = [2, 1, 5, 3, 4, 8, 7, 9, 12, 10, 23];
      let count = 0;

      bst.handleFrontOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      });
    });

    test('bst.handleMiddleOrderTraversal should ergodic the whole tree by using middle-order and execute callback parameter', () => {
      const expected = [1, 2, 5, 3, 4, 8, 7, 9, 12, 10, 23];
      let count = 0;

      bst.handleMiddleOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      })
    });

    test('bst.handleBackOrderTraversal should ergodic the whole tree by using back-order and execute callback parameter', () => {
      const expected = [1, 5, 3, 4, 8, 7, 9, 12, 10, 23, 2];
      let count = 0;

      bst.handlBackOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      })
    });

    test('bst.handleGetRoot should return the whole tree', () => {
      const expected = [2, 1, 5, 3, 4, 8, 7, 9, 12, 10, 23];
      let count = 0;

      bst.handleFrontOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      });
    });

    test('bst.handleGetMaxValue should return the maximum node which was in tree', () => {
      const expected = 23;
      const result = bst.handleGetMaxValue();

      expect(result).toBe(expected);
    });

    test('bst.handleGetMinValue should return the minimum node which was in tree', () => {
      const expected = 1;
      const result = bst.handleGetMinValue();

      expect(result).toBe(expected);
    });
  });

  // ? Double Linked Circular List
  describe('DLCL', () => {
    test('dlcl1.handleGetHead should return the `head` of linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
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
});