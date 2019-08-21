import { getAnyRandom } from "../../utility/number/getAnyRandom";


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

      const result = getAnyRandom(
        min,
        max,
      );

      expect(typeof result).toBe('number');
      expect(result >= min && result <= max).toBeTruthy();
    }
  });
});