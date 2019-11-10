import { curry } from "../../utility/function/curry";

describe('curry() tests...', () => {
  test('method curry should works normally', () => {
    const received = function (a: number, b: number, c: number, d: number) {
      return a + b + c + d;
    }

    const curriedFunc = curry(received);

    expect(curriedFunc(1, 2, 3)(4)).toBe(10);
    expect(curriedFunc(100)(200)(300)(400)).toBe(1000);
    expect(curriedFunc(23)(34, 45)(56)).toBe(158);
  });
});