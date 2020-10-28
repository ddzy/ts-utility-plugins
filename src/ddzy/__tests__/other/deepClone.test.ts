import deepClone from "../../utility/others/deepClone";

describe('deepClone', () => {
  test('deepClone should copy the whole object and return', () => {
    const received = {
      a: 1,
      b: [1, 2, 3, 4],
      c: {
        d: 1,
        e: 2,
        f: [
          {
            g: 1,
            h: 2,
          },
          {
            i: 1,
            j: 2,
          },
        ],
      },
    };

    const result = deepClone(received);

    expect(result === received).toBeFalsy();

    result.b.push(5);
    result.c.d = 2;

    expect(result.b.length).toBe(5);
    expect(result.c.d).toBe(2);
    expect(received.b.length).toBe(4);
    expect(received.c.d).toBe(1);
  });
});
