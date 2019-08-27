import { _concat } from "../../utility/array/_concat";

describe('_concat', () => {
  test('_concat should return an new array being composed of number', () => {
    const received = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8];

    const result = _concat<number>(received, 6, 7, 8);

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }

    // Should not change the origin array
    expect(received.length).toBe(5);
  });

  test('_concat should return an new array being composed of any value', () => {
    const received: any[] = [1, 0, '', undefined, null, [[100]], { name: 'ddzy' }];
    const expected = 10;

    const result = _concat<any>(received, [[200], [300]], { age: 21 });

    expect(result.length).toBe(expected);
  });
});