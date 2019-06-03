import utilityAlgorithm from "../utility/algorithm";

describe('utilityAlgorithm tests', () => {
  // Binary Search Tree
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
});