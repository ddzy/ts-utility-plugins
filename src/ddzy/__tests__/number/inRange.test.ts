import { inRange } from "../../utility/number/inRange";


describe('inRange tests...', () => {
  test('method inRange should compute the correct result', () => {
    const received = [
      {
        value: 0,
        start: 100,
        end: 200,
      },
      {
        value: 45,
        start: -11,
        end: 98,
      },
      {
        value: 34,
        start: 34,
        end: 34,
      },
      {
        value: 0,
        start: -344,
        end: 0,
      },
    ];
    const expected = [false, true, false, false];

    received.forEach((v, i) => {
      const result = inRange(v.value, v.start, v.end);

      expect(result).toBe(expected[i]);
    });
  });
});