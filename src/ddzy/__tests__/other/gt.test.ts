import { gt } from "../../utility/others/gt";

describe('gt tests: ', () => {

  test('gt should return `true` when the param 1 that large than param2', () => {
    const received = [10, 5];
    const expected = true;

    const result = gt(received[0], received[1]);

    expect(result).toBe(expected);
  });

  test('gt should return `false` when the param 1 that equal with param2', () => {
    const received = [10, 10];
    const expected = false;

    const result = gt(received[0], received[1]);

    expect(result).toBe(expected);
  });

  test('gt should return `false` when the param 1 that small than param2', () => {
    const received = [10, 20];
    const expected = false;

    const result = gt(received[0], received[1]);

    expect(result).toBe(expected);
  });

});