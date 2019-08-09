import utilityArray from '../utility/array/index';

describe('utilityArray tests', () => {

  describe('isStrictArray', () => {
    test('isStrictArray should return `true` if received a strict array', () => {
      const received = [
        [],
        [1, 2, 4],
        [{}, {}],
      ];

      for (const v of received) {
        expect(utilityArray.isStrictArray(v)).toBeTruthy();
      }
    });

    test('isStrictArray should return `false` if received a non array', () => {
      document.body.innerHTML += `
        <p></p>
        <h3></h3>
        <p></p>
      `;

      const received = [
        { a: 1, b: 2, length: 2 },
        document.querySelectorAll('p'),
        { name: 'duan', age: 20 },
        null,
        undefined,
        0,
        '',
      ];

      for (const v of received) {
        expect(utilityArray.isStrictArray(v)).toBeFalsy();
      }
    });
  });

  describe('toFlatArrayOutPlace', () => {
    test('toFlatArrayOutPlace should flatten the origin array', () => {
      const received = [
        'duan',
        1998,
        [
          'a',
          'b',
          [
            'c',
            'd',
            [
              'e',
              'f',
              123
            ],
          ],
        ],
        {
          name: 'duan',
          age: 20,
        },
      ];
      const expected = [
        'duan',
        1998,
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        123,
        { name: 'duan', age: 20 },
      ];

      const result = utilityArray.toFlatArrayOutPlace(received);

      for (const [outerI, outerV] of result.entries()) {
        expect(outerV).toEqual(expected[outerI]);
      }
    });
  });

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

      const result1 = utilityArray.toStrictArray(received1);
      const result2 = utilityArray.toStrictArray(received2);
      const result3 = utilityArray.toStrictArray(received3);
      const result4 = utilityArray.toStrictArray(received4);

      expect(result1.length).toBe(0);
      expect(result2.length).toBe(2);
      expect(result3.length).toBe(2);
      expect(result4.length).toBe(4);

      expect(result2[0]).toBe(received2[0]);
      expect(result3[0]).toBe(received3[0]);
      expect(result4[0]).toBe(received4[0]);
    });
  })

  describe('trunk', () => {
    test('trunk should return an empty array when receive an empty array', () => {
      const received: number[] = [];
      const expected = 0;

      const result = utilityArray.trunk<number>(received);

      expect(result.length).toBe(expected);
    });

    test('trunk should return the divided array by default size', () => {
      const received: number[] = [1, 2, 3, 4, 5, 6, 7];
      const expected = {
        length: 7,
        value: [[1], [2], [3], [4], [5], [6], [7]],
      };

      const result = utilityArray.trunk<number>(received);

      for (const [i, v] of result.entries()) {
        for (const [ii, vv] of v.entries()) {
          expect(vv).toBe(expected.value[i][ii]);
        }
        expect(v.length).toBe(expected.value[i].length);
      }
      expect(result.length).toBe(expected.length);
    });

    test('trunk should return the divided array by customized size', () => {
      const received: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const expected = {
        s2: [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]],
        s5: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]],
        s7: [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10]],
        s10: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
      };

      const p2 = utilityArray.trunk<number>(received, 2);
      const p5 = utilityArray.trunk<number>(received, 5);
      const p7 = utilityArray.trunk<number>(received, 7);
      const p10 = utilityArray.trunk<number>(received, 10);

      for (const [i, v] of p2.entries()) {
        for (const [ii, vv] of v.entries()) {
          expect(vv).toBe(expected.s2[i][ii]);
        }
        expect(v.length).toBe(expected.s2[i].length);
      }

      for (const [i, v] of p5.entries()) {
        for (const [ii, vv] of v.entries()) {
          expect(vv).toBe(expected.s5[i][ii]);
        }
        expect(v.length).toBe(expected.s5[i].length);
      }

      for (const [i, v] of p7.entries()) {
        for (const [ii, vv] of v.entries()) {
          expect(vv).toBe(expected.s7[i][ii]);
        }
        expect(v.length).toBe(expected.s7[i].length);
      }

      for (const [i, v] of p10.entries()) {
        for (const [ii, vv] of v.entries()) {
          expect(vv).toBe(expected.s10[i][ii]);
        }
        expect(v.length).toBe(expected.s10[i].length);
      }
    });
  })
});