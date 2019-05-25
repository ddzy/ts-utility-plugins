import utilityOthers from '../utility/others/index';


describe('utilityOthers tests', () => {
  describe('invariant', () => {

    // ! Test successed
    // test('invariant should throw error when the condition to be true', () => {
    //   expect(utilityOthers.invariant(true, 'test error')).toThrowErrorMatchingSnapshot();
    // });

    test('invariant should not do anything when the condition to be false', () => {
      expect(utilityOthers.invariant(false, 'test error')).toBeFalsy();
    });
  });

  describe('isBasicValue', () => {
    test('isBasicValue should return `true` if received a basic value', () => {
      const received = [
        0,
        Number.MAX_SAFE_INTEGER,
        '',
        'ddzy',
        Symbol('ddzy'),
        null,
        undefined,
      ];

      for (const v of received) {
        expect(utilityOthers.isBasicValue(v)).toBeTruthy();
      }
    });

    test('isBasicValue should return `false` if received a non basic value', () => {
      const received = [
        { name: 'duan', age: 20 },
        document.body,
        [1, 2, 3],
        function() {},
      ];

      for (const v of received) {
        expect(utilityOthers.isBasicValue(v)).toBeFalsy();
      }
    });
  })

  describe('deepClone', () => {
    test('deepClone should copy the whole object and return', () => {
      const received = {
        name: 'duan',
        age: 20,
        skills: ['run', 'programm', 'read'],
        friends: [
          {
            name: 'jack',
            age: 21,
          },
          {
            name: 'lucy',
            age: 22,
          },
        ],
        program: {
          deepth: 40,
          related: {
            website: [
              {
                name: 'juejin',
                address: 'https://juejin.io/timeline',
              },
              {
                name: 'zhihu',
                address: 'https://zhihu.com'
              },
            ],
          },
        },
        focus: true,
      };

      expect(utilityOthers.deepClone(received).name).toBe('duan');
      expect(
        (utilityOthers.deepClone(received).skills as string[])[0]
      ).toBe('run');
      expect(
        (utilityOthers.deepClone(received).friends as {
          name: string,
          age: number,
        }[])[0].name
      ).toBe('jack');
      expect(
        (utilityOthers.deepClone(received).program as any).deepth
      ).toBe(40);
      expect(
        (utilityOthers.deepClone(received) as any).program.related.website[0].name
      ).toBe('juejin');

      received.name = 'received';
      received.skills[0] = 'received';
      received.friends[0].name = 'received';
      received.program.deepth = 20;
      received.program.related.website[0].name = 'received';
    });
  });

  describe('isNull', () => {
    test('isNull should return `false` if received a non null value', () => {
      const received = [
        0,
        '',
        undefined,
        {},
        [],
        function() {},
      ];

      for (const v of received) {
        expect(utilityOthers.isNull(v)).toBeFalsy();
      }
    });

    test('isNull should return `true` if received a null value', () => {
      const received = [
        null,
      ];

      for (const v of received) {
        expect(utilityOthers.isNull(v)).toBeTruthy();
      }
    });
  })
});