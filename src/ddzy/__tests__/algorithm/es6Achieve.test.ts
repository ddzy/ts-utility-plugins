import { ES6Achieve } from "../../utility/algorithm/es6-achieve";

  // ? ES6Achieve
  describe('ES6Achieve tests', () => {
    // ? _reflect
    describe('ES6Achieve._reflect tests', () => {
      const _reflect = ES6Achieve._reflect;

      test('_reflect.get should return the value of the special key from target object', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          'name',
          0,
          'skill',
        ];
        const expected = [
          'ddzy',
          undefined,
          undefined,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.get(obj, v);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.set should set the new value to the designative key', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          {
            key: 'skill',
            value: 'program',
          },
          {
            key: 'hobby',
            value: ['run', 'play-game'],
          },
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.set(obj, v.key, v.value);
          expect(temp).toBe(expected[i]);
        }

        expect(obj['skill' as keyof typeof obj]).toBe('program');
        expect(Array.isArray(obj['hobby' as keyof typeof obj])).toBeTruthy();
      });

      test('_reflect.has should return `true` when the designative key was in target object, otherwise `false`', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          'name',
          'age',
          'skill',
          'hobby',
        ];
        const expected = [
          true,
          true,
          false,
          false,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.has(obj, v);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.apply should be called same as native API named `apply`', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        function func1() {
          return 'Hello world';
        }
        function func2(...args: any[]) {
          return args[0];
        }
        function func3() {
          return this;
        }
        const received = [
          func1,
          func2,
          func3,
        ];
        const expected = [
          'Hello world',
          'Hello ddzy',
          obj,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.apply(v, obj, ['Hello ddzy']);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.construct should return the `instance` of the designative function', () => {
        function Person1() { }
        const Person2 = () => { };

        const received = [
          Person1,
          Person2,
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.construct(v, []);
          expect(temp instanceof v).toBe(expected[i]);
        }
      });

      test('_reflect.deleteProperty should remove the designative `key` from target object', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          'name',
          'skill',
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.deleteProperty(obj, v);
          expect(temp).toBe(expected[i]);
          expect(v in obj).toBeFalsy();
        }

        const temp = _reflect.deleteProperty(function () { }, 'name');
        expect(temp).toBeTruthy();
      });

      test('_reflect.getPrototypeOf should return the `__proto__` of the designative instance', () => {
        const obj = {};
        function Person1() { }
        const person = _reflect.construct(Person1, []);
        const str = '';
        const arr: any[] = [];
        const num = 0;
        const received = [
          obj,
          person,
          str,
          arr,
          num,
        ];
        const expected = [
          obj.__proto__,
          person.__proto__,
          str.__proto__,
          arr.__proto__,
          num.__proto__,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.getPrototypeOf(v);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.setPrototypeOf should set the new prototype to the designative instance', () => {
        function Person1() { }
        Person1.prototype = {
          constructor: Person1,
          say() { },
        };
        const p1 = new Person1();
        const p2 = {
          run() { },
        };

        const received = [
          null,
          p2,
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.setPrototypeOf(p1, v);
          expect(temp).toBe(expected[i]);
        }
      });
    });

    // ? _map
    describe('ES6Achieve._map tests', () => {
      const _map = ES6Achieve._map;

      test('_map should handle each of value which were in `source array` with `callback`', () => {
        const received = [
          [1, 2, 3, 4, 5, 6],
          [24, 42, 4, 1, 2, 9, 58],
        ];
        const expected = [
          [2, 4, 6, 8, 10, 12],
          [48, 84, 8, 2, 4, 18, 116],
        ];

        for (const [outerI, outerV] of received.entries()) {
          const result = _map<number, number>(
            outerV,
            (outerVV) => {
              return outerVV * 2;
            },
          );

          for (const [innerI, innerV] of result.entries()) {
            expect(innerV).toBe(expected[outerI][innerI]);
          }
        }
      });

      test('_map should handle `callback` with customized `this` context', () => {
        interface IContext {
          name: string,
          age: number,
        };
        const context: IContext = {
          name: 'ddzy',
          age: 21,
        };

        const received = [
          ['', 'd', 'dd', 'ddz', 'ddzy'],
        ];
        const expected = [
          [' 980808', 'd 980808', 'dd 980808', 'ddz 980808', 'ddzy 980808'],
        ];

        for (const [outerI, outerV] of received.entries()) {
          const result = _map<string, string, IContext>(
            outerV,
            (outerVV, _outerII, __this__) => {
              // ? test `this` context
              expect(__this__).toBe(context);

              return outerVV + ' 980808';
            },
            context,
          );

          for (const [innerI, innerV] of result.entries()) {
            expect(innerV).toBe(expected[outerI][innerI]);
          }
        }
      });

      test('_map should return a `new` array and cannot modify the `origin` array', () => {
        interface IContext {
          uuid: number,
          age: number,
        };

        const received = [
          [
            { uuid: 1, age: 10 },
            { uuid: 2, age: 20 },
            { uuid: 3, age: 30 },
          ],
        ];
        const expected = [
          [
            { uuid: 1, age: 110 },
            { uuid: 2, age: 120 },
            { uuid: 3, age: 130 },
          ],
        ];

        for (const [outerI, outerV] of received.entries()) {
          const result = _map<IContext, IContext>(
            outerV,
            (outerVV) => {
              return {
                uuid: outerVV.uuid,
                age: outerVV.age + 100,
              };
            },
          );

          for (const [innerI, innerV] of result.entries()) {
            expect(innerV.uuid).toBe(expected[outerI][innerI].uuid);
            expect(innerV.age).toBe(expected[outerI][innerI].age);
          }

          // ?
          result.push({
            uuid: 4,
            age: 140,
          });
          expect(outerV.length).toBe(3);
          expect(result.length).toBe(4);
        }
      });
    });

    // ? _reduce
    describe('ES6Achieve._reduce tests', () => {
      const _reduce = ES6Achieve._reduce;

      test('_reduce should return `undefined` when received an empty array', () => {
        const received: any[] = [];

        const result = _reduce(received, (total, current) => {
          return total + current;
        });

        expect(result).toBeUndefined();
      });

      test('_reduce should return `number` when received an array being composed of `number`', () => {
        const received = [1, 2, 3, 4, 5];
        const expected = 15;

        const result = _reduce<number, number>(received, (total, current) => {
          return total + current;
        });

        expect(result).toBe(expected);
      });

      test('_reduce should return `number` when received an array being composed of `number` and an `initialValue`', () => {
        const received = [1, 2, 3, 4, 5];
        const expected = 25;

        const result = _reduce<number, number>(received, (total, current) => {
          return total + current;
        }, 10);

        expect(result).toBe(expected);
      });

      test('_reduce should return `number` when received an array being composed of `object`', () => {
        const received = [
          { uuid: 1, name: 'duan', age: 10 },
          { uuid: 2, name: 'duan', age: 20 },
          { uuid: 3, name: 'duan', age: 30 },
        ];
        const expected = 60;

        const result = _reduce<typeof received[0], number>(received, (total, current) => {
          return total + current.age;
        }, 0);

        expect(result).toBe(expected);
      });

      test('_reduce should return `string` when received an array being composed of `number`', () => {
        const received = [1, 2, 3, 4, 5];
        const expected = '12345';

        const result = _reduce<number, string>(received, (total, current) => {
          return total + current;
        }, '');

        expect(result).toBe(expected);
      });
    });

    // ? _filter
    describe('ES6Achieve._filter tests', () => {
      const _filter = ES6Achieve._filter;

      test('_filter should return a new empty array when receive an empty array', () => {
        const received: number[] = [];

        const result = _filter<number>(received, (v) => {
          return !!v;
        });

        expect(result.length).toBe(0);
        received.push(2);
        received.push(3);
        expect(received.length).toBe(2);
        expect(result.length).toBe(0);
      });

      test('_filter should return the eligible array when receive an array composed of number', () => {
        const received: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        const expected: number[] = [2, 4, 6, 8];

        const result = _filter<number>(received, (v) => {
          return v % 2 === 0;
        });

        for (const [i, v] of result.entries()) {
          expect(v).toBe(expected[i]);
        }
      });

      test('_filter should return the eligible array when receive an array composed of plain object', () => {
        interface User {
          name: string,
          age: number,
        };
        const received: User[] = [
          { name: 'duan', age: 20 },
          { name: 'zhao', age: 30 },
          { name: 'yang', age: 40 },
        ];
        const expected: User[] = [
          { name: 'zhao', age: 30 },
          { name: 'yang', age: 40 },
        ];

        const result = _filter<User>(received, (v) => {
          return v.age >= 30;
        });

        for (const [i, v] of result.entries()) {
          expect(v.name).toBe(expected[i].name);
          expect(v.age).toBe(expected[i].age);
        }
      });

      test('_filter should return the aligible array and print the truthy context when receive an array composed of number', () => {
        interface Obj {
          secret: string,
          say: (secret: string) => void,
        };

        const obj: Obj = {
          secret: '980808',
          say() {
            console.log(this.secret);
          },
        };
        const received = [-1, 1, -2, 2, -3, 3];
        const expected = {
          context: obj,
          arr: [1, 2, 3],
        };

        const result = _filter<number, Obj>(received, function (v) {
          expect(this).toBe(expected.context);

          return v > 0;
        }, obj);

        for (const [i, v] of result.entries()) {
          expect(v).toBe(expected.arr[i]);
        }
      });
    });

    // ? _every
    describe('ES6Achieve._every tests', () => {
      const _every = ES6Achieve._every;

      test('_every should always return `true` when receive an empty array', () => {
        const received: number[] = [];
        const expected = true;

        const result = _every<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should return `true` when receive an array composed of `number` that accord with condition', () => {
        const received: number[] = [1, 2, 3, 4, 5];
        const expected = true;

        const result = _every<number, null>(received, (v) => {
          return v < 10;
        });

        expect(result).toBe(expected);
      });

      test('_every should return `false` when receive an array composed of `object` that not accord with condition', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = false;

        const result = _every<IPair, null>(received, (v) => {
          return v.age < 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should called by custom `this` context', () => {
        const context = {
          name: 'ddzy',
          printName() {
            return this.name;
          },
        };

        const received: number[] = [1, 2, 3, 4, 5];
        const expected = {
          context,
          result: true,
        };

        const result = _every<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v < 6;
        }, context);

        expect(result).toBe(expected.result);
      });
    });

    // ? _find
    describe('ES6Achieve._find tests', () => {
      const _find = ES6Achieve._find;

      test('_every should always return `undefined` when receive an empty array', () => {
        const received: number[] = [];
        const expected = undefined;

        const result = _find<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should return first value that has been found when receive an array composed of `number`', () => {
        const received: number[] = [-1, -2, 1, 2, 3];
        const expected = 1;

        const result = _find<number, null>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should return the first that has been found when receive an array composed of `object`', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = received[1];

        const result = _find<IPair, null>(received, (v) => {
          return v.age >= 31;
        });

        expect(result).toBe(expected);
      });

      test('_every should called by custom `this` context', () => {
        const context = {
          secret: 'duanzhaoyang',
          printSecret() {
            return this.secret;
          },
        };

        const received: number[] = [1, 2, 3, 4, 5];
        const expected = {
          context,
          result: 5,
        };

        const result = _find<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v === 5;
        }, context);

        expect(result).toBe(expected.result);
      });
    });

    // ? _startsWith
    describe('ES6Achieve._startsWith tests', () => {
      const _startsWith = ES6Achieve._startsWith;

      test('_startsWith should return whether the `origin` string is composed of `target`', () => {
        const origin = 'ddzy';
        const received = ['d', 'yang', 'ddzyy'];
        const expected = [true, false, false];

        for (const [i, v] of received.entries()) {
          const result = _startsWith(origin, v);

          expect(result).toBe(expected[i]);
        }
      });

      test('_startsWith should return whether the `origin` string is composed of `target` at special `index`', () => {
        const origin = 'ddzy';
        const received = ['ddz', 'dzy'];
        const expected = [false, false];

        for (const [i, v] of received.entries()) {
          const result = _startsWith(origin, v, 1);

          expect(result).toBe(expected[i]);
        }
      });
    });

    // ? _some
    describe('ES6Achieve._some tests', () => {
      const _some = ES6Achieve._some;

      test('_some should always return `false` when receive an empty array', () => {
        const received: number[] = [];
        const expected = false;

        const result = _some<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_some should return `true` when receive an array composed of `number` that at least one accord with condition', () => {
        const received: number[] = [1, 2, 3, 4, 5];
        const expected = true;

        const result = _some<number, null>(received, (v) => {
          return v < 10;
        });

        expect(result).toBe(expected);
      });

      test('_some should return `false` when receive an array composed of `object` that nobody accord with condition', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = false;

        const result = _some<IPair, null>(received, (v) => {
          return v.age < 0;
        });

        expect(result).toBe(expected);
      });

      test('_some should called by custom `this` context', () => {
        const context = {
          name: 'ddzy',
          printName() {
            return this.name;
          },
        };

        const received: number[] = [1, 2, 3, 4, 5];
        const expected = {
          context,
          result: true,
        };

        const result = _some<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v < 6;
        }, context);

        expect(result).toBe(expected.result);
      });
    });

    // ? _includes
    describe('ES6Achieve._includes tests', () => {
      const _includes = ES6Achieve._includes;

      test('_includes should always return `false` when receive an empty array', () => {
        const received: number[] = [];
        const expected = false;

        const result = _includes<number>(received, 2);

        expect(result).toBe(expected);
      });

      test('_includes should return `false` when receive an array composed of `number` that no one accord with condition', () => {
        const received: number[] = [1, 2, 3, 4, 5];
        const expected = false;

        const result = _includes<number>(received, 6);

        expect(result).toBe(expected);
      });

      test('_includes should return `true` when receive an array composed of `number` that at least one accord with condition', () => {
        const received: number[] = [1, 2, 3, 4, 5];
        const expected = true;

        const result = _includes<number>(received, 3);

        expect(result).toBe(expected);
      });

      test('_includes should return `false` when receive an array composed of `object` that nobody accord with condition', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = false;

        const result = _includes<IPair>(received, {
          name: 'duan',
          age: 21,
        });

        expect(result).toBe(expected);
      });

      test('_includes should return `true` when receive `NaN` and also in origin array', () => {
        const received: number[] = [1, 2, NaN, 4, 5];
        const expected = true;

        const result = _includes<number>(received, NaN);

        expect(result).toBe(expected);
      });
    });

    // ? _findIndex
    describe('ES6Achieve._findIndex tests', () => {
      const _findIndex = ES6Achieve._findIndex;

      test('_findIndex should always return `-1` when receive an empty array', () => {
        const received: number[] = [];
        const expected = -1;

        const result = _findIndex<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_findIndex should return `-1` when not found', () => {
        const received: number[] = [23, 4, 56, 73, 1];
        const expected = -1;

        const result = _findIndex<number>(received, (v) => {
          return v < 0;
        });

        expect(result).toBe(expected);
      });

      test('_findIndex should return the place of the first value which was eligible', () => {
        const received: number[] = [444, 45, -4, 78, -5];
        const expected = 2;

        const result = _findIndex<number>(received, (v) => {
          return v < 0;
        });

        expect(result).toBe(expected);
      });

      test('_findIndex should be called by custom `context`', () => {
        const context = {
          secret: 'ddzy',
        };

        const received: number[] = [45, 2, 1, 33, -5];
        const expected = {
          place: 0,
          context,
        };

        const result = _findIndex<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v > 40;
        }, context);

        expect(result).toBe(expected.place);
      });
    });
  });