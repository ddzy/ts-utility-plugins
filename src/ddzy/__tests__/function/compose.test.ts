import { compose } from "../../utility/function/compose";

describe('compose', () => {
  test('compose should invoke function from right to left', () => {
    function func1() {
      return func2() * 2;
    }
    function func2() {
      return func3() * 3;
    }
    function func3() {
      return 4;
    }

    function func4() {
      return func5() + '*' + 'yang';
    }
    function func5() {
      return func6() + '*' + 'zhao';
    }
    function func6() {
      return 'duan';
    }

    const received = {
      s1: [func1, func2, func3],
      s2: [func4, func5, func6],
    };
    const expected = {
      p1: 24,
      p2: 'duan*zhao*yang',
    };

    const r1 = compose(...received.s1);
    const r2 = compose(...received.s2);

    expect(r1).toBe(expected.p1);
    expect(r2).toBe(expected.p2);
  });
});