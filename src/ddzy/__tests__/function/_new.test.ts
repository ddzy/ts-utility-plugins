import { _new } from "../../utility/function/_new";

describe('_new', () => {
  test('_new should return the instance of target constructor and received non parameter', () => {
    function Person() { }
    Person.prototype = {
      constructor: Person,
      say() {
        return 'Person';
      },
    };

    const received = [
      Person,
    ];
    const expected = [
      {
        constructor: Person,
        say: 'Person',
      },
    ];

    for (const [i, v] of received.entries()) {
      const result: any = utilityFunction._new(v);

      expect(result.constructor).toBe(expected[i]['constructor']);
      expect(result.say()).toBe(expected[i]['say']);
    }
  });

  test('_new should return the instance of target constructor and received many of parameters', () => {
    function Person(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    Person.prototype = {
      constructor: Person,
      say() {
        return 'Person';
      },
    };

    const received = [
      Person,
    ];
    const expected = [
      {
        name: 'ddzy',
        age: 21,
        constructor: Person,
        say: 'Person',
      },
    ];

    for (const [i, v] of received.entries()) {
      const result: any = _new(v, 'ddzy', 21);

      expect(result.name).toBe(expected[i]['name']);
      expect(result.age).toBe(expected[i]['age']);
      expect(result.constructor).toBe(expected[i]['constructor']);
      expect(result.say()).toBe(expected[i]['say']);
    }
  });
});