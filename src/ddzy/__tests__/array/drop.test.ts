import { drop } from "../../utility/array/drop";

describe('drop tests', () => {
  test('drop should return an empty array when receive an empty array', () => {
    const received: number[] = [];
    const expected = [];

    const result = drop<number>(received);

    expect(result.length).toBe(expected.length);
  });

  test('drop should return the droped array by using customized number when receive an array being composed of number', () => {
    const received: number[] = [1, 2, 3, 4, 5, 6];
    const expected: number[] = [4, 5, 6];

    const result = drop<number>(received, 3);

    result.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });

  test('drop should not change the origin array', () => {
    const received: number[] = [100, 300, 500];
    const expected: number[] = [100, 300, 500];

    const result = drop<number>(received, 0);
    result.push(700, 900);

    expect(result.length).toBe(5);
    received.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });
});