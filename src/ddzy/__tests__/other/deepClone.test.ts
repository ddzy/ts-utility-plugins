import { deepClone } from "../../utility/others/deepClone";

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

    expect(deepClone(received).name).toBe('duan');
    expect(
      (deepClone(received).skills as string[])[0]
    ).toBe('run');
    expect(
      (deepClone(received).friends as {
        name: string,
        age: number,
      }[])[0].name
    ).toBe('jack');
    expect(
      (deepClone(received).program as any).deepth
    ).toBe(40);
    expect(
      (deepClone(received) as any).program.related.website[0].name
    ).toBe('juejin');

    received.name = 'received';
    received.skills[0] = 'received';
    received.friends[0].name = 'received';
    received.program.deepth = 20;
    received.program.related.website[0].name = 'received';
  });
});
