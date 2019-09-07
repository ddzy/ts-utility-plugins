import { head } from "../../utility/array/head";

describe('head tests: ', () => {
  test('head should return the first field that was in origin array', () => {
    const received: number[] = [1, 2, 3, 4, 5];
    const expected = 1;

    const result = head<number>(received);

    expect(result).toBe(expected);
  });

  test('head should return undefined when receive an empty array', () => {
    const received: any[] = [];
    const expected = undefined;

    const result = head<any>(received);

    expect(result).toBe(expected);
  });
});