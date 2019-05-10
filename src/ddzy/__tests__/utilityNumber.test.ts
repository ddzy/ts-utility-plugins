import utilityNumber from '../utility/number/index';
import { exportAllDeclaration } from '@babel/types';


describe('utilityNumber', () => {

  describe('getFullRandom', () => {
    test('getFullRandom should receive two numbers and return a interger between these two numbers', () => {
      const origin = [
        {
          min: 0,
          max: 10,
        },
        {
          min: Number.MIN_SAFE_INTEGER,
          max: Number.MAX_SAFE_INTEGER,
        },
        {
          min: -1,
          max: 1,
        }
      ];

      for (const v of origin) {
        const { min, max } = v;

        const result = utilityNumber.getFullRandom(
          min,
          max,
        );

        expect(Number.isInteger(result)).toBeTruthy();
        expect(result >= min && result <= max).toBeTruthy();
      }
    });
  });

  describe('getAnyRandom', () => {
    test('getAnyRandom should receive two numbers and return a float number or a interger between these two numbers ', () => {
      const origin = [
        {
          min: 0,
          max: 10,
        },
        {
          min: Number.MIN_SAFE_INTEGER,
          max: Number.MAX_SAFE_INTEGER,
        },
        {
          min: -1,
          max: 1,
        }
      ];

      for (const v of origin) {
        const { min, max } = v;

        const result = utilityNumber.getAnyRandom(
          min,
          max,
        );

        expect(typeof result).toBe('number');
        expect(result >= min && result <= max).toBeTruthy();
      }
    });
  });

  describe('getRadian', () => {
    test('getRadian should receive an angle and convert it to radian', () => {
      const origin = [
        0,
        78,
        90,
        180,
        360
      ];
      const expected = [
        0,
        1.361356816555577,
        1.5707963267948966,
        3.141592653589793,
        6.283185307179586,
      ];
      const result: number[] = [];

      for (const v of origin) {
        result.push(utilityNumber.getRadian(v));
      }

      for (const [i, v] of result.entries()) {
        expect(v === expected[i]).toBeTruthy();
      }
    });
  });

});