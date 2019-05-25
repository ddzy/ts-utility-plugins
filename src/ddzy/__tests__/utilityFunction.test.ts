import utilityFunction from '../utility/function/index';

export type FunctionKeyType = keyof typeof Function;


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


  describe('_call', () => {
    test('_call should change the `this` when processing', () => {
      const origin = {
        name: 'ddzy',
      };
      const expected = {
        name: 'ddzy',
        arg0: 0,
        arg1: 1,
      };

      const received = {
        printName(...args: any[]) {
          const name = this['name' as keyof typeof received];
          const arg0 = args[0];
          const arg1 = args[1];

          expect({ name, arg0, arg1 }).toEqual(expected);
        },
      };

      Function.prototype['_call' as FunctionKeyType] = utilityFunction._call;

      received.printName['_call' as FunctionKeyType](origin, 0, 1);
    });
  });

  describe('_bind', () => {
    test('_bind should return `function` which can change the `this`', () => {
      const origin = {
        name: 'ddzy is a fe programmer',
      };
      const expected = {
        name: 'ddzy is a fe programmer',
        arg0: 20,
        arg1: 30,
      };

      const received = {
        printName(...args: any[]) {
          const name = this['name' as keyof typeof received];
          const arg0 = args[0];
          const arg1 = args[1];

          expect({ name, arg0, arg1 }).toEqual(expected);
        },
      };

      Function.prototype['_bind' as FunctionKeyType] = utilityFunction._bind;

      const _bindedFunc = received.printName['_bind' as FunctionKeyType](origin);
      _bindedFunc([20, 30]);
    })
  })

});