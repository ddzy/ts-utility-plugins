import { forIn } from "../../utility/object/forIn";

describe('forIn tests...', () => {

  test('method forIn should not exit', () => {
    interface IReceivedProps {
      name: string,
      age: number,
      skill: string,
    };

    const received: IReceivedProps = {
      name: 'duanzhaoyang',
      age: 21,
      skill: 'program',
    };
    const expected = received;

    forIn(received, (value, key) => {
      expect(value).toBe(expected[key as keyof typeof expected]);
    });
  });

  test('method forIn should exit when return `false`', () => {
    interface IReceivedProps {
      city: string[];
      position: {
        x: number,
        y: number,
      };
      continue: boolean;
      nextOne: number;
      nextTwo: number;
    };

    const received: IReceivedProps = {
      city: ['Dongguan', 'Foshan', 'Guangzhou'],
      position: {
        x: 100,
        y: 200,
      },
      continue: false,
      nextOne: 1,
      nextTwo: 2,
    };

    const expected = received;
    let count = 0;

    forIn<IReceivedProps>(received, function (value, key, origin) {
      count++;
      expect(value).toBe(expected[key as keyof typeof expected]);
      expect(this).toBe(origin);

      if (key === 'continue') {
        return false;
      }
    });

    expect(count).toBe(3);
  });

});