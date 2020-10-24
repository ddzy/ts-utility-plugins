import { Sort } from "../../utility/algorithm/sort";

describe('Sort tests', () => {
  // ? bubbleSort
  describe('Sort.bubbleSort tests', () => {
    const bubbleSort = Sort.bubbleSort;

    test('The method `bubbleSort()` should return the correct array', () => {
      const received = [
        [29, 51, 72, 68, 45, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [5, 4, 3, 2, 1],
        [1]
      ];
      const expected = [
        [29, 45, 51, 68, 72, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [1, 2, 3, 4, 5],
        [1]
      ];

      for (let i = 0; i < received.length; i++) {
        const result = bubbleSort(received[i]);

        for (let j = 0; j < result.length; j++) {
          expect(result[j]).toBe(expected[i][j]);
        }
      }
    });
  });
  // ? selectSort
  describe('Sort.selectSort tests', () => {
    const selectSort = Sort.selectSort;

    test('The method `selectSort()` should return the correct array', () => {
      const received = [
        [29, 51, 72, 68, 45, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [5, 4, 3, 2, 1],
        [1]
      ];
      const expected = [
        [29, 45, 51, 68, 72, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [1, 2, 3, 4, 5],
        [1]
      ];

      for (let i = 0; i < received.length; i++) {
        const result = selectSort(received[i]);

        for (let j = 0; j < result.length; j++) {
          expect(result[j]).toBe(expected[i][j]);
        }
      }
    });
  });
  // ? insertSort
  describe('Sort.insertSort tests', () => {
    const insertSort = Sort.insertSort;

    test('The method `insertSort()` should return the correct array', () => {
      const received = [
        [29, 51, 72, 68, 45, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [5, 4, 3, 2, 1],
        [1],
        [1045, 765, 32, 678, 98, 14, 20000],
      ];
      const expected = [
        [29, 45, 51, 68, 72, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [1, 2, 3, 4, 5],
        [1],
        [14, 32, 98, 678, 765, 1045, 20000],
      ];

      for (let i = 0; i < received.length; i++) {
        const result = insertSort(received[i]);

        for (let j = 0; j < result.length; j++) {
          expect(result[j]).toBe(expected[i][j]);
        }
      }
    });
  });
  // ? shellSort
  describe('Sort.shellSort tests', () => {
    const shellSort = Sort.shellSort;

    test('The method `shellSort()` should return the correct array', () => {
      const received = [
        [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [5, 4, 3, 2, 1],
        [1],
        [1045, 765, 32, 678, 98, 14, 20000],
      ];
      const expected = [
        [4, 13, 27, 38, 49, 49, 55, 65, 76, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [1, 2, 3, 4, 5],
        [1],
        [14, 32, 98, 678, 765, 1045, 20000],
      ];

      for (let i = 0; i < received.length; i++) {
        const result = shellSort(received[i]);

        for (let j = 0; j < result.length; j++) {
          expect(result[j]).toBe(expected[i][j]);
        }
      }
    });
  });
  // ? quickSort
  describe('Sort.quickSort tests', () => {
    const quickSort = Sort.quickSort;

    test('The method `quickSort()` should return the correct array', () => {
      const received = [
        [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [5, 4, 3, 2, 1],
        [1],
        [1045, 765, 32, 678, 98, 14, 20000],
      ];
      const expected = [
        [4, 13, 27, 38, 49, 49, 55, 65, 76, 97],
        [],
        [1, 2, 3, 4, 5],
        [3, 3, 3, 3, 3],
        [1, 2, 3, 4, 5],
        [1],
        [14, 32, 98, 678, 765, 1045, 20000],
      ];

      for (let i = 0; i < received.length; i++) {
        const result = quickSort(received[i]);

        for (let j = 0; j < result.length; j++) {
          expect(result[j]).toBe(expected[i][j]);
        }
      }
    });
  });
});