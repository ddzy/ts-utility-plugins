import { trunk } from "../../utility/array/trunk";

describe('trunk', () => {
  test('trunk should return an empty array when receive an empty array', () => {
    const received: number[] = [];
    const expected = 0;

    const result = trunk<number>(received);

    expect(result.length).toBe(expected);
  });

  test('trunk should return the divided array by default size', () => {
    const received: number[] = [1, 2, 3, 4, 5, 6, 7];
    const expected = {
      length: 7,
      value: [[1], [2], [3], [4], [5], [6], [7]],
    };

    const result = trunk<number>(received);

    for (const [i, v] of result.entries()) {
      for (const [ii, vv] of v.entries()) {
        expect(vv).toBe(expected.value[i][ii]);
      }
      expect(v.length).toBe(expected.value[i].length);
    }
    expect(result.length).toBe(expected.length);
  });

  test('trunk should return the divided array by customized size', () => {
    const received: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = {
      s2: [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]],
      s5: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]],
      s7: [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10]],
      s10: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    };

    const p2 = trunk<number>(received, 2);
    const p5 = trunk<number>(received, 5);
    const p7 = trunk<number>(received, 7);
    const p10 = trunk<number>(received, 10);

    for (const [i, v] of p2.entries()) {
      for (const [ii, vv] of v.entries()) {
        expect(vv).toBe(expected.s2[i][ii]);
      }
      expect(v.length).toBe(expected.s2[i].length);
    }

    for (const [i, v] of p5.entries()) {
      for (const [ii, vv] of v.entries()) {
        expect(vv).toBe(expected.s5[i][ii]);
      }
      expect(v.length).toBe(expected.s5[i].length);
    }

    for (const [i, v] of p7.entries()) {
      for (const [ii, vv] of v.entries()) {
        expect(vv).toBe(expected.s7[i][ii]);
      }
      expect(v.length).toBe(expected.s7[i].length);
    }

    for (const [i, v] of p10.entries()) {
      for (const [ii, vv] of v.entries()) {
        expect(vv).toBe(expected.s10[i][ii]);
      }
      expect(v.length).toBe(expected.s10[i].length);
    }
  });
});