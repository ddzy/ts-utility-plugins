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
});