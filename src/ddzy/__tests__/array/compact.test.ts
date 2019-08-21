import { compact } from "../../utility/array/compact";

describe('compact', () => {
  test('compact should return an empty array when receive an empty array', () => {
    const received: any[] = [];
    const expected = 0;

    const result = compact<any>(received);

    expect(result.length).toBe(0);
  });

  test('compact should return the array only contains truthy value', () => {
    const received: any[] = [true, false, 0, '', undefined, NaN, null, 22];
    const expected = [true, 22];

    const result = compact<any>(received);

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }
  });

  test('compact should return a new array', () => {
    const received: number[] = [0, 1, 2, 3, 4];
    const expected: number[] = [1, 2, 3, 4];

    const result = compact<number>(received);

    received.push(5);

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }
  });
})