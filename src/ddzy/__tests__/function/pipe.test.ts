import { pipe } from "../../utility/function/pipe";

describe('pipe', () => {
  test('pipe should invoke function from left to right', () => {
    function func1() {
      return 2;
    }
    function func2() {
      return func1() * 3;
    }
    function func3() {
      return func2() * 4;
    }

    function func4() {
      return 'duan'
    }
    function func5() {
      return func4() + '*' + 'zhao';
    }
    function func6() {
      return func5() + '*' + 'yang';
    }

    const received = {
      s1: [func1, func2, func3],
      s2: [func4, func5, func6],
    };
    const expected = {
      p1: 24,
      p2: 'duan*zhao*yang',
    };

    const r1 = pipe(...received.s1);
    const r2 = pipe(...received.s2);

    expect(r1).toBe(expected.p1);
    expect(r2).toBe(expected.p2);
  });
});