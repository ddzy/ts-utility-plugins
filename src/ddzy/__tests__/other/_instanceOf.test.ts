import { _instanceOf } from "../../utility/others/_instanceOf";

describe('_instanceOf tests...', () => {

  test('_instanceOf should return the correct result', () => {
    interface PersonConstructor {
      new(): PersonInterface;
    };
    interface PersonInterface {
    };

    class Person implements PersonInterface {
      constructor() {
      }
    }

    const received: Array<{
      left: any,
      right: any,
    }> = [
        {
          left: new Person(),
          right: Person,
        },
        {
          left: {},
          right: Object,
        },
        {
          left: [],
          right: Array,
        },
        {
          left: [],
          right: Object,
        },
        {
          left: 2,
          right: 8,
        },
        {
          left: 'ddzy',
          right: {},
        },
        {
          left: {},
          right: null,
        },
      ];
    const expected = [true, true, true, true, false, false, false,];

    received.forEach((v, i) => {
      const result = _instanceOf(v.left, v.right);

      expect(result).toBe(expected[i]);
    });
  });

});