import { isNull } from "util";


describe('isNull', () => {
  test('isNull should return `false` if received a non null value', () => {
    const received = [
      0,
      '',
      undefined,
      {},
      [],
      function () { },
    ];

    for (const v of received) {
      expect(isNull(v)).toBeFalsy();
    }
  });

  test('isNull should return `true` if received a null value', () => {
    const received = [
      null,
    ];

    for (const v of received) {
      expect(isNull(v)).toBeTruthy();
    }
  });
});