import { divideByThousand } from "../../utility/number/divideByThousand";


describe('divideByThousand tests...', () => {

  test('method divideByThousand should return the correct value', () => {
    const received: number[] = [
      // 小于千位的数字
      11, 45, -56, 0,
      // 刚好等于千位的数字
      110, -323,
      // 大于千位的数字
      1100, 3456687, -4534236423642364,
    ];
    const expected = [
      '11', '45', '-56', '0',
      '110', '-323',
      '1,100', '3,456,687', '-4,534,236,423,642,364'
    ];

    received.forEach((v, i) => {
      const result = divideByThousand(v);

      expect(result).toBe(expected[i]);
    });
  });

  test('method divideByThousand should use customized separator that passed', () => {
    const received = [
      {
        num: 12345,
        separator: '_',
      },
    ];
    const expected = ['12_345'];

    received.forEach((v, i) => {
      const result = divideByThousand(v.num, v.separator);

      expect(result).toBe(expected[i]);
    });
  });

})