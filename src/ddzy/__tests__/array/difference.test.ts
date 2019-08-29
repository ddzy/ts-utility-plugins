import { difference } from "../../utility/array/difference";

describe('difference tests', () => {
  test('difference should receive an array being composed of number and return the processed array', () => {
    const received = {
      origin: [1, 2, 3, 4, 5],
      filter: [1, 4],
    };
    const expected = [2, 3, 5];

    const result = difference<number>(received.origin, ...received.filter);

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }
  });

  test('difference should return a new array', () => {
    const received = {
      origin: [100, 200, 300, 300, 500],
      filter: [300],
    };
    const expected = [100, 200, 500];

    const result = difference<number>(received.origin, ...received.filter);

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }

    received.origin.push(800);

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }
  });

  test('difference should receive an array being composed of any value and return a new array', () => {
    const received = {
      origin: [null, undefined, NaN, '', 0, false, function () { }, {}, []],
      filter: [function () { }, [], null],
    };
    const expected = [undefined, NaN, '', 0, false, function () { }, {}, []];

    const result = difference<any>(received.origin, ...received.filter);

    expect(result.length).toBe(expected.length);
  });
});