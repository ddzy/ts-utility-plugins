import { after } from "../../utility/function/after";

describe('after', () => {
  test('after should fire the handler with no params after the special times of function call', () => {
    function doingWorkAsync(
      props: { type: string, sign: (...args: any[]) => void },
    ) {
      setTimeout(() => {
        props.sign();
      }, 0);
    }

    const employees = ['jack', 'rose', 'riven'];
    const fragment = after(employees.length, () => {
      expect(true).toBeTruthy();
    });

    for (const employee of employees) {
      doingWorkAsync({ type: employee, sign: fragment });
    }
  });

  test('after should fire the handler with any params after special times of function call', () => {
    function doingWorkAsyncWithParams(
      props: { type: string, sign: (...args: any[]) => void },
    ) {
      setTimeout(() => {
        props.sign(props.type);
      }, 0);
    }

    const employees = ['jack', 'rose', 'riven'];
    const fragment = after(employees.length, (type) => {
      expect(type).toBe('riven');
    });

    for (const employee of employees) {
      doingWorkAsyncWithParams({ type: employee, sign: fragment });
    }
  });
})