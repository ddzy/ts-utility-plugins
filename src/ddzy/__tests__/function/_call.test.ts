import { _call } from "../../utility/function/_call";

export type FunctionKeyType = keyof typeof Function;

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

    Function.prototype['_call' as FunctionKeyType] = _call;

    received.printName['_call' as FunctionKeyType](origin, 0, 1);
  });
});