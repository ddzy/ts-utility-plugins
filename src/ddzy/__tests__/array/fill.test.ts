import { fill } from "../../utility/array/fill";


describe('fill tests...', () => {

  test('method fill should return an empty array when receive an empty array', () => {
    const received: number[] = [];
    const expected = 0;

    const result = fill<number>(received, 100);

    expect(result.length).toBe(expected);
  });

  test('method fill should return the correct array when receive an array composed of number', () => {
    const received: number[] = [1, 2, 3, 4, 5];
    const expected = [1, 2, 200, 200, 200, 200, 200, 200];

    const result = fill<number>(received, 200, 2);

    result.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });

  test('method fill will modify the origin array', () => {
    const received: any[] = [false, 0, '', NaN, true, function () { }];
    const expected = received;

    const result = fill(received, 'duanzhaoyang');

    expect(result).toBe(expected);
    expect(result).toBe(received);
  });

});