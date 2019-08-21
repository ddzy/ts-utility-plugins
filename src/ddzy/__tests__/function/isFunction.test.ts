import { isFunction } from "../../utility/function/isFunction";

describe('isFunction', () => {
  test('isFunction should return `true` when received a function object', () => {
    const origin = [
      function () { },
      Symbol,
    ];

    for (const v of origin) {
      expect(isFunction(v)).toBeTruthy();
    }
  });
});