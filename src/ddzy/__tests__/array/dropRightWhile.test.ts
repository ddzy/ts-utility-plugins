import { dropRightWhile } from "../../utility/array/dropRightWhile";

describe('dropRightWhile tests...', () => {

  test('dropRightWhile should return an empty array when receve an empty array', () => {
    const received: number[] = [];
    const expected = 0;

    const result = dropRightWhile<number>(received, function (v) {
      return !!v;
    });

    expect(result.length).toBe(expected);
  });

  test('dropRightWhile should return the filtered array when receive an array being composed of number', () => {
    const received: number[] = [23, 34, -1, -5, 54, 22, 0];
    const expected: number[] = [23, 34];

    const result = dropRightWhile(received, function (v) {
      return v < 0;
    })

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }
  });

  test('dropRightWhile should return the filtered array when receive an array being composed of object', () => {
    interface IReceivedParams {
      name: string;
      age: number;
    };
    const received: IReceivedParams[] = [
      { name: 'duan', age: 20 },
      { name: 'zhao', age: 30 },
      { name: 'yang', age: 40 },
    ];
    const expected = [received[0]];


    const result = dropRightWhile<IReceivedParams>(received, function (v) {
      return v.age === 30;
    });

    for (const [i, v] of result.entries()) {
      expect(v).toBe(expected[i]);
    }
  });

});