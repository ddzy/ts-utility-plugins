import { capitalize } from "../../utility/string/capitalize";

describe('capitalize tests...', () => {
  test('capitalize should return the origin text when receive an empty string', () => {
    const received = '';
    const expected = '';

    const result = capitalize(received);

    expect(result).toBe(expected);
  });

  test('capitalize should return the converted string correctly', () => {
    const received = ['ZHAO', 'duan'];
    const expected = ['Zhao', 'Duan'];

    const result = received.map((v) => {
      return capitalize(v);
    });

    result.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });

  test('capitalize should return the converted string when receive a text contains special characters', () => {
    const received = ['_DDZY', '___&*duanzhaoYANg'];
    const expected = ['_Ddzy', '___&*Duanzhaoyang'];

    const result = received.map((v) => {
      return capitalize(v);
    });

    result.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });
});