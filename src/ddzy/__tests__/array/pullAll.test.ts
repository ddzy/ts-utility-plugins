import { pullAll } from "../../utility/array/pullAll";


describe('pullAll tests...', () => {
  test('Method pullAll should receive an array composed of number and return the filtered array', () => {
    const received = {
      origin: [1, 2, 3, 1, 2, 3],
      selector: [2, 3],
    };
    const expected = {
      isEqual: true,
      result: [1, 1],
    };

    const result = pullAll<number>(received.origin, received.selector);

    expect(result === received.origin).toBe(expected.isEqual);

    result.forEach((v, i) => {
      expect(v).toBe(expected.result[i]);
    });
  });

  test('Method pullAll should receive an array composed of plain object and return the filtered array', () => {
    interface IOriginParams {
      name: string,
      age: number,
    };

    const received = {
      origin: [
        {
          name: 'duan',
          age: 21,
        },
        {
          name: 'zhao',
          age: 22,
        },
        {
          name: 'duan',
          age: 21,
        },
      ],
      selector: [
        {
          name: 'duan',
          age: 21,
        },
      ],
    };
    const expected = {
      isEqual: true,
      result: [
        {
          name: 'duan',
          age: 21,
        },
        {
          name: 'zhao',
          age: 22,
        },
        {
          name: 'duan',
          age: 21,
        },
      ],
    };

    const result = pullAll<IOriginParams>(received.origin, received.selector);

    expect(result === received.origin).toBe(expected.isEqual);

    expect(result.length).toBe(expected.result.length);
  });

  test('Method pullAll should receive an array composed of mixed value and return the filtered array', () => {
    const received = {
      origin: [
        0,
        19980808,
        'duanzhaoyang',
        false,
        null,
        undefined,
        Symbol('a'),
        function () { },
        {},
        [],
      ],
      selector: [false, undefined, 19980808, []],
    };
    const expected = {
      isEqual: true,
      result: [
        0,
        'duanzhaoyang',
        null,
        Symbol('a'),
        function () { },
        {},
        [],
      ],
    };

    const result = pullAll<any>(received.origin, received.selector);

    expect(result === received.origin).toBe(expected.isEqual);

    expect(result.length).toBe(expected.result.length);
  });
});