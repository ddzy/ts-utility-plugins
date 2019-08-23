import { now } from "../../utility/date/now";

describe('now', () => {
  test('now should return a timestamp like `Date.now()` and `new Date().getTime()`', () => {
    const expected = {
      type: 'number',
    };

    const result = now();

    expect(typeof result).toBe(expected.type);
  })
})