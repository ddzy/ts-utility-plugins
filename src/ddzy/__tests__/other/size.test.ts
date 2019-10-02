import { size } from "../../utility/others/sizse";

describe('size tests...', () => {

  test('size() should return zero when receive a special character', () => {
    const received = [0, 100, undefined, null, Symbol('ddzy'), function () { }];
    const expected = [0, 0, 0, 0, 0, 0];

    received.forEach((v, i) => {
      const result = size(v);

      expect(result).toBe(expected[i]);
    });
  });

  test('size() should return the correct length of string', () => {
    const received = ['', 'ddzy'];
    const expected = [0, 4];

    received.forEach((v, i) => {
      const result = size(v);

      expect(result).toBe(expected[i]);
    });
  });

  test('size() should return the correct length of array', () => {
    const received = [[], [0, 1, 2, 3, 4, 5]];
    const expected = [0, 6];

    received.forEach((v, i) => {
      const result = size(v);

      expect(result).toBe(expected[i]);
    });
  });

  test('size() should return the correct length of array', () => {
    const received = [{}, { name: 'duanzhaoyang', age: 21 }];
    const expected = [0, 2];

    received.forEach((v, i) => {
      const result = size(v);

      expect(result).toBe(expected[i]);
    });
  });

});