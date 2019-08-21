import { _bind } from "../../utility/function/_bind";

export type FunctionKeyType = keyof typeof Function;

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

    Function.prototype['_bind' as FunctionKeyType] = _bind;

    const _bindedFunc = received.printName['_bind' as FunctionKeyType](origin);
    _bindedFunc([20, 30]);
  })
})