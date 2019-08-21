import { toStrictArray } from "../../utility/array/toStrictArray";

describe('toStrictArray', () => {
  test('toStrictArray should receive an `ArrayLike` and return the `Array`', () => {
    document.body.innerHTML += `
      <div></div>
      <div></div>
    `;
    const received1 = { length: 0 };
    const received2 = {
      0: 'ddzy',
      1: 20,
      length: 2,
    };
    const received3 = document.querySelectorAll('div');
    const received4 = [1, 2, 3, 4];

    const result1 = toStrictArray(received1);
    const result2 = toStrictArray(received2);
    const result3 = toStrictArray(received3);
    const result4 = toStrictArray(received4);

    expect(result1.length).toBe(0);
    expect(result2.length).toBe(2);
    expect(result3.length).toBe(2);
    expect(result4.length).toBe(4);

    expect(result2[0]).toBe(received2[0]);
    expect(result3[0]).toBe(received3[0]);
    expect(result4[0]).toBe(received4[0]);
  });
});