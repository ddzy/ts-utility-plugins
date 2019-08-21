import { isPlainObject } from "../../utility/object/isPlainObject";

describe('isPlainObject', () => {
  test('isPlainObject should return `true` if received a plain object', () => {
    const received = [
      { name: 'duan', age: 20 },
      {},
    ];

    for (const v of received) {
      expect(isPlainObject(v)).toBeTruthy();
    }
  });

  test('isPlainObject should return `false` if received a non plain object', () => {
    document.body.innerHTML += `
      <p></p>
      <p></p>
    `;

    const received = [
      document.querySelectorAll('p'),
      [1, 2, 3],
      null,
      undefined,
      0,
      '',
      false,
      true
    ];

    for (const v of received) {
      expect(isPlainObject(v)).toBeFalsy();
    }
  });
})
