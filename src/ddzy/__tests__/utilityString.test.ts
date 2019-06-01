import utilityString from "../utility/string";

describe('utilityString tests', () => {
  describe('getRandomStr', () => {
    test('getRandomStr should return default string when not received parameters', () => {
      const expected: [string, number] = [
        'string',
        16,
      ];
      const result: string = utilityString.getRandomStr();

      expect(typeof result).toBe(expected[0]);
      expect(result.length).toBe(expected[1]);
    });

    test('getRandomStr should return default string when received a empty array', () => {
      const received: string[] = [];
      const expected: [string, number] = [
        'string',
        16,
      ];
      const result: string = utilityString.getRandomStr(received);

      expect(typeof result).toBe(expected[0]);
      expect(result.length).toBe(expected[1]);
    });

    test('getRandomStr should return assignment length of string when received the length parameter', () => {
      const received: [string[], number] = [
        ['a', 'b', 'c', '1', '2', '3', '_', '-'],
        8,
      ];
      const expected: [string, number] = [
        'string',
        8,
      ];
      const result: string = utilityString.getRandomStr(...received);

      expect(typeof result).toBe(expected[0]);
      expect(result.length).toBe(expected[1]);
    });

    test('getRandomStr should return a string that not contains special characters when received the truthy parameter names `enableSpecialCharacter`', () => {
      const received: [
        undefined,
        undefined,
        boolean,
      ] = [undefined, undefined, false];
      const expected: RegExp = /[_\-&$@^]+/g;
      const result: string = utilityString.getRandomStr(...received);

      expect(expected.test(result)).toBeFalsy();
    });
  });
});