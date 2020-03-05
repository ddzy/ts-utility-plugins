import { words } from "../../utility/string/words";

describe('Method words() test: ', () => {
  test('words() should use the default pattern while receive none pattern', () => {
    const received = {
      str: 'duan zhao _*$*$  y & ang a p     g',
      reg: /\W+/,
    };
    const expected = ["duan", "zhao _*$*$  y & ang a p     g"];

    const result = words(received.str, received.reg);

    result.forEach((v, i) => {
      expect(v).toBe(expected[i]);
    });
  });

  test('words() can use custom pattern', () => {
    const received = [
      {
        str: 'duan  zhao    yang',
        reg: /\s+/g,
      },
      {
        str: 'duan ### zhaoyang |%# s d h   dan',
        reg: /#+/g,
      },
    ];
    const expected = [
      ["duan", "zhao", "yang"],
      ["duan ", " zhaoyang ", "%", " s d h   dan"],
    ];

    received.forEach((outerV, outerI) => {
      const result = words(outerV.str, outerV.reg);

      result.forEach((innerV, innerI) => {
        expect(innerV).toBe(expected[outerI][innerI]);
      });
    });
  });
});