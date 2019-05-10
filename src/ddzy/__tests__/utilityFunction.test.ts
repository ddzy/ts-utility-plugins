import utilityFunction from '../utility/function/index';


describe('utilityFunction', () => {

  describe('isFunction', () => {
    test('isFunction should return `true` when received a function object', () => {
      const origin = [
        function () { },
        Symbol,
      ];

      for (const v of origin) {
        expect(utilityFunction.isFunction(v)).toBeTruthy();
      }
    });
  });

});