import { convertURLParameterToObject } from "../../utility/others/convertURLParameterToObject";

describe('convertURLParameterToObject', () => {
  test('convertURLParameterToObject should return the truthy key-value-pair when received a URL string', () => {
    const received = [
      'https://github.com/ddzy?username=duan&age=20&token=kslgjadg',
      'https://github.com/ddzy??username=duan&&age=20',
      'https://github.com/ddzy/username=duan?age=20&token=askndg',
      'https://github.com/ddzy&username=duan?age=20?token=askndg',
    ];
    const expected = [
      {
        username: 'duan',
        age: '20',
        token: 'kslgjadg',
      },
      {
        username: 'duan',
        age: '20',
      },
      {
        age: '20',
        token: 'askndg',
      },
      {
        age: '20',
        token: 'askndg',
      },
    ];

    for (const [i, v] of received.entries()) {
      expect(convertURLParameterToObject(v)).toEqual(expected[i]);
    }
  });
});