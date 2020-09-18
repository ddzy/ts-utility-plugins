import take from "../../utility/array/take";

describe('take', () => {
  test('Method `take()` should return the correct result', () => {
    const received = [
      {
        arr: [1, 2, 3, 4, 5, 6, 7, 8],
        amount: 5,
      },
      {
        arr: [],
        amount: 3,
      },
      {
        arr: ['a', 'b', 'c', 'd', 'e'],
        amount: 8,
      },
      {
        arr: [[], [], [], [1, 2, 3]],
        amount: 0,
      },
    ];
    const expected = [
      [1, 2, 3, 4, 5],
      [],
      ['a', 'b', 'c', 'd', 'e'],
      [],
    ];

    received.forEach((outerV, outerI) => {
      const result = take<any>(outerV.arr, outerV.amount);

      if (result.length > 0) {
        result.forEach((innerV, innerI) => {
          expect(innerV).toBe(expected[outerI][innerI]);
        });
      } else {
        if (outerI % 2 !== 0) {
          expect(result.length).toBe(expected[outerI].length);
        }
      }
    });
  });
});