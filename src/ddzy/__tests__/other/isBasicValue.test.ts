import { isBasicValue } from "../../utility/others/isBasicValue";

describe('isBasicValue', () => {
  test('isBasicValue should return `true` if received a basic value', () => {
    const received = [
      0,
      Number.MAX_SAFE_INTEGER,
      '',
      'ddzy',
      Symbol('ddzy'),
      null,
      undefined,
    ];

    for (const v of received) {
      expect(isBasicValue(v)).toBeTruthy();
    }
  });

  test('isBasicValue should return `false` if received a non basic value', () => {
    const received = [
      { name: 'duan', age: 20 },
      document.body,
      [1, 2, 3],
      function () { },
    ];

    for (const v of received) {
      expect(isBasicValue(v)).toBeFalsy();
    }
  });
})