import binarySearch from "../../utility/others/binarySearch";

describe('binarySearch tests...', () => {
  test('The method named `binarySearch() should return a correct index value', () => {
    const arr = [10, 867, 4, 34, 9, 98, 45, 67];
    const received = [
      {
        arr,
        value: 34,
      },
      {
        arr,
        value: 99,
      },
    ];
    const expected = [3, -1];

    for (const [key, value] of received.entries()) {
      const result = binarySearch(value.arr, value.value);

      expect(result).toBe(expected[key]);
    }
  });
});