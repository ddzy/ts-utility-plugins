import { lowerCase } from "../../utility/string/lowerCase";

describe('lowerCase tests...', () => {

  test('lowerCase should return `` when receive an empty string', () => {
    const received = '';
    const expected = '';

    const result = lowerCase(received);

    expect(result).toBe(expected);
  });

  test('lowerCase should return the converted string correctly', () => {
    const received = ['--Duan-Zhao--', 'alioeDuan', '__DUAN_ZHAO_YANG__'];
    const expected = ['duan zhao', 'alioeduan', 'duan zhao yang'];

    received.forEach((v, i) => {
      const result = lowerCase(v);

      expect(result).toBe(expected[i]);
    });
  });

});