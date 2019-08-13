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

  describe('getParamNames', () => {
    test("getParamsNames should receive lots of parameters and return the array of each parameter's name.", () => {
      const received = [
        function (..._args: any[]) { },
        function func1(_name: string, _age: number) { },
        function func2(_name: string, _age: number, _address: string, ..._args: any[]) {},
      ];
      const expected = [
        [],
        ['_name', '_age'],
        ['_name', '_age', '_address'],
      ];

      for (const [i, v] of received.entries()) {
        const current = utilityFunction.getParamNames(v);
        expect(current).toEqual(expected[i]);
      }
    });
  });

  describe('_new', () => {
    test('_new should return the instance of target constructor and received non parameter', () => {
      function Person() { }
      Person.prototype = {
        constructor: Person,
        say() {
          return 'Person';
        },
      };

      const received = [
        Person,
      ];
      const expected = [
        {
          constructor: Person,
          say: 'Person',
        },
      ];

      for (const [i, v] of received.entries()) {
        const result: any = utilityFunction._new(v);

        expect(result.constructor).toBe(expected[i]['constructor']);
        expect(result.say()).toBe(expected[i]['say']);
      }
    });

    test('_new should return the instance of target constructor and received many of parameters', () => {
      function Person(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
      Person.prototype = {
        constructor: Person,
        say() {
          return 'Person';
        },
      };

      const received = [
        Person,
      ];
      const expected = [
        {
          name: 'ddzy',
          age: 21,
          constructor: Person,
          say: 'Person',
        },
      ];

      for (const [i, v] of received.entries()) {
        const result: any = utilityFunction._new(v, 'ddzy', 21);

        expect(result.name).toBe(expected[i]['name']);
        expect(result.age).toBe(expected[i]['age']);
        expect(result.constructor).toBe(expected[i]['constructor']);
        expect(result.say()).toBe(expected[i]['say']);
      }
    });
  });

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

      const r1 = utilityFunction.compose(...received.s1);
      const r2 = utilityFunction.compose(...received.s2);

      expect(r1).toBe(expected.p1);
      expect(r2).toBe(expected.p2);
    });
  });
});