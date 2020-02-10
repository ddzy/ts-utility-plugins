import { _join } from "../../utility/array/_join";

describe('Method _join test:', () => {
  test('_join() should return the empty string when receive an empty array', () => {
    const received = {
      arr: [],
      separator: '',
    };
    const expected = '';

    const result = _join(received.arr, received.separator);

    expect(result).toBe(expected);
  });

  test('_join() should return the composed string when receive an array maked by number', () => {
    const received = {
      arr: [1, 2, 3, 4, 5],
      separator: '',
    };
    const expected = '12345';

    const result = _join(received.arr, received.separator);

    expect(result).toBe(expected);
  });

  test('_join() can config your own separator', () => {
    const received = {
      arr: ['a', 'b', 'c', 'd', 'e'],
      separator: '-',
    };
    const expected = 'a-b-c-d-e';

    const result = _join(received.arr, received.separator);

    expect(result).toBe(expected);
  });
});