import { trim } from "../../utility/string/trim";

describe('trim() tests', () => {
  test('trim should return a new processed string by using the default replacer when receive an empty string', () => {
    const received = '';
    const expected = '';

    const result = trim(received);

    expect(result).toBe(expected);
  });

  test('trim should return a new processed string that throw away the whitespace by using the default replacer', () => {
    const received = '   ddzy     ';
    const expected = 'ddzy';

    const result = trim(received);

    expect(result).toBe(expected);
  });

  test('trim should return a new processed string by using a special replacer', () => {
    const received = [
      'wow, i like program!',
      'oh... i love you oh',
    ];
    const expected = [
      ', i like program!',
      '... i love you ',
    ];

    const replacer = ['wow', 'oh'];

    const result = received.map((v, i) => {
      return trim(v, replacer[i]);
    });

    result.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });
});