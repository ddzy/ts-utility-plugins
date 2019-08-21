import { getFullRandom } from "../../utility/number/getFullRandom";

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

      const result = getFullRandom(
        min,
        max,
      );

      expect(Number.isInteger(result)).toBeTruthy();
      expect(result >= min && result <= max).toBeTruthy();
    }
  });
});