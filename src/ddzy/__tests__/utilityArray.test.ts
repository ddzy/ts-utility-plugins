import utilityArray from '../utility/array/index';

describe('utilityArray tests', () => {

  describe('isStrictArray', () => {
    test('isStrictArray should return `true` if received a strict array', () => {
      const received = [
        [],
        [1, 2, 4],
        [{}, {}],
      ];

      for (const v of received) {
        expect(utilityArray.isStrictArray(v)).toBeTruthy();
      }
    });

    test('isStrictArray should return `false` if received a non array', () => {
      document.body.innerHTML += `
        <p></p>
        <h3></h3>
        <p></p>
      `;

      const received = [
        { a: 1, b: 2, length: 2 },
        document.querySelectorAll('p'),
        { name: 'duan', age: 20 },
        null,
        undefined,
        0,
        '',
      ];

      for (const v of received) {
        expect(utilityArray.isStrictArray(v)).toBeFalsy();
      }
    });
  })

});