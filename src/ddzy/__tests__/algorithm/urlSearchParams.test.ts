import { URLSearchParams } from "../../utility/algorithm/url-search-params";

// ? URLSearchParams
describe('URLSearchParams tests', () => {
  test('URLSearchParams.handleAppend should add the new value to the tail of the `params` and update the url', () => {
    // !!! https://ddzy.github.io/login?name=ddzy&age=21&isSelf=true
    const received = [
      {
        key: 'skill',
        value: 'programmer',
      },
    ];
    const expected = [
      {
        url: 'https://ddzy.github.io/login?name=ddzy&age=21&isSelf=true&skill=programmer',
        params: {
          name: 'ddzy',
          age: '21',
          isSelf: 'true',
          skill: 'programmer',
        },
      },
    ];
    const usp = new URLSearchParams({});

    for (const [i, v] of received.entries()) {
      const __this__ = usp.handleAppend(v.key, v.value);
      const { url, params } = usp.state;

      // ? check this
      expect(__this__ instanceof URLSearchParams).toBeTruthy();
      // ? check url
      expect(url).toBe(expected[i].url);
      // ? check params
      expect(params).toEqual(expected[i].params);
    }
  });

  test('URLSearchParams.handleDelete should remove the special `key` from url and params', () => {
    const received = [
      'age',
    ];
    const expected = [
      {
        url: 'https://ddzy.github.io/login?name=ddzy&isSelf=true',
        params: {
          name: 'ddzy',
          isSelf: 'true',
        },
      },
    ];
    const usp = new URLSearchParams({});

    for (const [i, v] of received.entries()) {
      const __this__ = usp.handleDelete(v);
      const { url, params } = usp.state;

      // ? check this
      expect(__this__ instanceof URLSearchParams).toBeTruthy();
      // ? check url
      expect(url).toBe(expected[i].url);
      // ? check params
      expect(params).toEqual(expected[i].params);
    }
  });

  test('URLSearchParams.handleGet should received the `key` and return the value of this key', () => {
    const received = [
      '',
      'skill',
      'name',
      'age',
    ];
    const expected = [
      null,
      null,
      'ddzy',
      '21',
    ];
    const usp = new URLSearchParams({});

    for (const [i, v] of received.entries()) {
      const result = usp.handleGet(v);

      expect(result).toBe(expected[i]);
    }
  });

  test('URLSearchParams.handleGetAll should return all of the params liked `[["name", "ddzy"], ...]`', () => {
    const expected = [
      ['name', 'ddzy'],
      ['age', '21'],
      ['isSelf', 'true'],
    ];
    const usp = new URLSearchParams({});
    const result = usp.handleGetAll();

    for (const [i, v] of result.entries()) {
      expect(v[0]).toBe(expected[i][0]);
      expect(v[1]).toBe(expected[i][1]);
    }
  });

  test('URLSearchParams.handleHas should return `true` if the params has its own property that received', () => {
    const received = [
      '',
      'skill',
      'name',
      'age',
    ];
    const expected = [
      false,
      false,
      true,
      true,
    ];
    const usp = new URLSearchParams({});

    for (const [i, v] of received.entries()) {
      const result = usp.handleHas(v);

      expect(result).toBe(expected[i]);
    }
  });

  test('URLSearchParams.handleSet should set all of the new value to the key which was received', () => {
    const received = [
      {
        key: 'name',
        value: 'duanzhaoyang',
      },
      {
        key: 'age',
        value: 50,
      },
    ];
    const expected = [
      {
        url: 'https://ddzy.github.io/login?name=duanzhaoyang&age=21&isSelf=true',
        params: {
          name: 'duanzhaoyang',
          age: '21',
          isSelf: 'true',
        },
      },
      {
        url: 'https://ddzy.github.io/login?name=duanzhaoyang&age=50&isSelf=true',
        params: {
          name: 'duanzhaoyang',
          age: '50',
          isSelf: 'true',
        },
      },
    ];
    const usp = new URLSearchParams({});

    for (const [i, v] of received.entries()) {
      const __this__ = usp.handleSet(v.key, v.value);
      const { url, params } = usp.state;

      // ? check this
      expect(__this__ instanceof URLSearchParams).toBeTruthy();
      // ? check url
      expect(url).toBe(expected[i].url);
      // ? check params
      expect(params).toEqual(expected[i].params);
    }
  });

  test('URLSearchParams.handleKeys should return the `keys-collection` of the params', () => {
    const expected = [
      'name',
      'age',
      'isSelf',
    ];
    const usp = new URLSearchParams({});
    const result = usp.handleKeys();

    for (const [i, v] of expected.entries()) {
      expect(v).toBe(result[i]);
    }
  });

  test('URLSearchParams.handleValues should return the `values-collection` of the params', () => {
    const expected = [
      'ddzy',
      '21',
      'true',
    ];
    const usp = new URLSearchParams({});
    const result = usp.handleValues();

    for (const [i, v] of expected.entries()) {
      expect(v).toBe(result[i]);
    }
  });

  test('URLSearchParams.iterator should being called by the `iterator`', () => {
    const expected = [
      ['name', 'ddzy'],
      ['age', '21'],
      ['isSelf', 'true'],
    ];
    const usp = new URLSearchParams({});

    let count = 0;
    for (const [key, value] of (usp.state.params as any)) {
      expect(key).toBe(expected[count][0]);
      expect(value).toBe(expected[count][1]);
      count++;
    }
  });
});