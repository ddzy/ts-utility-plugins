import create from "../../utility/object/create";

export interface IStaticObject {
  [key: string]: any;
};
describe('create tests...', () => {
  test('The method `create()` should return the correct value while receiving a plain object', () => {
    const received: IStaticObject[] = [
      {
        prototype: {
          name: 'duanzhaoyang',
          age: 22,
        },
        props: {},
      },
      {
        prototype: {},
        props: {
          skill: 'running',
        },
      },
    ];
    const expected: IStaticObject[] = [
      {},
      {
        skill: 'running',
      },
    ];

    received.forEach((v, i) => {
      const result = create(v.prototype, v.props);

      for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          const value = result[key];

          expect(expected[i].hasOwnProperty(key)).toBeTruthy();
          expect(expected[i][key]).toBe(value);
        }
      }
    });
  });
  test('The method `create()` should return the correct value while receiving `null`', () => {
    const received: IStaticObject[] = [
      {
        prototype: null,
        props: {},
      },
      {
        prototype: null,
        props: {
          a: 1,
          b: 2,
        },
      },
    ];
    const expected: IStaticObject[] = [
      {},
      {
        a: 1,
        b: 2,
      },
    ];

    received.forEach((v, i) => {
      const result = create(v.prototype, v.props);

      for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          const value = result[key];

          expect(expected[i].hasOwnProperty(key)).toBeTruthy();
          expect(expected[i][key]).toBe(value);
        }
      }
    });
  });
});