import { zip } from "../../utility/array/zip";

describe('Method zip tests...', () => {
  test('zip should return the zipped array correctly when receive an array composed of number', () => {
    const received = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9, 10, 11],
    ];
    const expected = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [10],
      [11]
    ];

    const result = zip<number>(...received);

    expect(result.length).toBe(expected.length);

    result.forEach((outerV, outerI) => {
      outerV.forEach((innerV, innerI) => {
        expect(innerV).toBe(expected[outerI][innerI]);
      });
    });
  });

  test('zip should return the zipped array correctly when receive an mixed array', () => {
    const arr1: any[] = [];
    const obj1 = {
      name: 'duanzhaoyang',
      age: 21,
    }
    const func1 = function () { };

    const received = [
      [998, 899, 989, 898],
      [false, true],
      [arr1, obj1],
      [func1]
    ];
    const expected = [
      [998, false, arr1, func1],
      [899, true, obj1],
      [989],
      [898],
    ];

    const result = zip<any>(...received);

    expect(result.length).toBe(expected.length);

    result.forEach((outerV, outerI) => {
      outerV.forEach((innerV, innerI) => {
        expect(innerV).toBe(expected[outerI][innerI]);
      });
    });
  });
});