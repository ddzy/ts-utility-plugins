import { toFlatArrayOutPlace } from "../../utility/array/toFlatArrayOutPlace";

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

    const result = toFlatArrayOutPlace(received);

    for (const [outerI, outerV] of result.entries()) {
      expect(outerV).toEqual(expected[outerI]);
    }
  });
});