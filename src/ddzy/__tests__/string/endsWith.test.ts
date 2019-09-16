import { endsWith } from "../../utility/string/endsWith";

describe('endsWith tests...', () => {

  test('endsWith should return the correct value', () => {
    interface IReceivedParams {
      text: string;
      target: string;
      position: number | undefined;
    };

    const received: IReceivedParams[] = [
      {
        text: 'duanzhaoyang',
        target: 'a',
        position: 3,
      },
      {
        text: 'duanzhaoyang',
        target: 'ao',
        position: undefined,
      },
      {
        text: 'ddzy',
        target: 'y',
        position: undefined,
      },
      {
        text: 'duan',
        target: 'd',
        position: 4,
      },
    ];
    const expected = [true, false, true, true];

    received.forEach((v, i) => {
      const result = endsWith(v.text, v.target, v.position);

      expect(result).toBe(expected[i]);
    });
  });

});