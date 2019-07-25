import utilityAlgorithm from "../utility/algorithm";
import {
  ListNode,
} from "../utility/algorithm/double-linked-circular-list/list-node";


describe('utilityAlgorithm tests', () => {
  // ? Binary Search Tree
  describe('BST', () => {
    const bst = new utilityAlgorithm.BST({
      nodes: [2, 5, 3, 8, 7, 4, 9, 12, 23, 10, 1],
    });

    test('bst.handleHasValue should receive a number and return true or false if the value was exist', () => {
      const received = [2, 5, 3, 8, 7, 4, 9, 12, 23, 10, 1];

      for (const v of received) {
        expect(bst.handleHasValue(v)).toBeTruthy();
      }
    });

    test('bst.handleInsert should receive a number and insert it to root', () => {
      const received = [100, 200, 300];

      for (const v of received) {
        bst.handleInsert(v);
        expect(bst.handleHasValue(v)).toBeTruthy();
      }
    });

    test('bst.handleRemove should receive a number and remove it from root', () => {
      const received = [100, 200, 300];

      for (const v of received) {
        bst.handleRemove(v);
        expect(bst.handleHasValue(v)).toBeFalsy();
      }
    });

    test('bst.handleGetDepth should return the whole tree depth when received undefined', () => {
      const expected = 6;

      expect(bst.handleGetDepth()).toBe(expected);
    });

    test('bst.handleGetDepth should receive a number and return its depth which was in tree', () => {
      const received = [5, 7, 23];
      const expected = [2, 4, 6];

      for (const [i, v] of received.entries()) {
        expect(bst.handleGetDepth(v)).toBe(expected[i]);
      }
    });

    test('bst.handleGetHeight should return whe whole tree height when received undefined', () => {
      const expected = 6;

      expect(bst.handleGetHeight()).toBe(expected);
    });

    test('bst.handleGetHeight should receive a number and return its height which was in tree', () => {
      const received = [5, 7, 23];
      const expected = [5, 1, 1];

      for (const [i, v] of received.entries()) {
        expect(bst.handleGetHeight(v)).toBe(expected[i]);
      }
    });

    test('bst.handleGetLeaves should return the collection of leaves node', () => {
      const expected = [1, 4, 7, 10, 23];
      const result = bst.handleGetLeaves();

      for (const [i, v] of result.entries()) {
        expect(v.value).toBe(expected[i]);
      }
    });

    test('bst.handleFrontOrderTraversal should ergodic the whole tree by using front-order and execute callback parameter', () => {
      const expected = [2, 1, 5, 3, 4, 8, 7, 9, 12, 10, 23];
      let count = 0;

      bst.handleFrontOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      });
    });

    test('bst.handleMiddleOrderTraversal should ergodic the whole tree by using middle-order and execute callback parameter', () => {
      const expected = [1, 2, 5, 3, 4, 8, 7, 9, 12, 10, 23];
      let count = 0;

      bst.handleMiddleOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      })
    });

    test('bst.handleBackOrderTraversal should ergodic the whole tree by using back-order and execute callback parameter', () => {
      const expected = [1, 5, 3, 4, 8, 7, 9, 12, 10, 23, 2];
      let count = 0;

      bst.handlBackOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      })
    });

    test('bst.handleGetRoot should return the whole tree', () => {
      const expected = [2, 1, 5, 3, 4, 8, 7, 9, 12, 10, 23];
      let count = 0;

      bst.handleFrontOrderTraversal((node) => {
        expect(node.value).toBe(expected[count]);

        count++;
      });
    });

    test('bst.handleGetMaxValue should return the maximum node which was in tree', () => {
      const expected = 23;
      const result = bst.handleGetMaxValue();

      expect(result).toBe(expected);
    });

    test('bst.handleGetMinValue should return the minimum node which was in tree', () => {
      const expected = 1;
      const result = bst.handleGetMinValue();

      expect(result).toBe(expected);
    });
  });

  // ? Double Linked Circular List
  describe('DLCL', () => {
    test('dlcl1.handleGetHead should return the `head` of linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected = [2, 5, 8, 3, 7, 19, 23, 14, 41];
      const head = dlcl1.handleGetHead();
      const tail = dlcl1.handleGetTail();

      // ? 正向遍历
      let current: ListNode<number> | null = head;
      let count: number = 0;
      while (current && current !== tail) {
        expect(current.value).toBe(expected[count]);

        count++;
        current = current.next;
      }
      if (current) {
        expect(current.value).toBe(expected[count]);
        // ? 重置
        current = tail;
        count = expected.length - 1;
      }

      // ? 反向遍历
      while (current && current !== head) {
        expect(current.value).toBe(expected[count]);

        count--;
        current = current.prev;
      }
      if (current) {
        expect(current.value).toBe(expected[count]);
      }
    });

    test('dlcl1.handleGetTail should return the `tail` of linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected = [2, 5, 8, 3, 7, 19, 23, 14, 41];
      const tail = dlcl1.handleGetTail();
      const head = dlcl1.handleGetHead();

      let current: ListNode<number> | null = tail;
      let count: number = expected.length - 1;
      // ? 反向遍历
      while (current && current !== head) {
        expect(current.value).toBe(expected[count]);

        count--;
        current = current.prev;
      }
      if (current) {
        expect(current.value).toBe(expected[count]);

        // ? 重置
        count = 0;
        current = head;
      }

      // ? 正向遍历
      while (current && current !== tail) {
        expect(current.value).toBe(expected[count]);

        count++;
        current = current.next;
      }
      if (current) {
        expect(current.value).toBe(expected[count]);
      }
    });

    test('dlcl1.handleGetLength should return the length of linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected_1 = 9;
      const expected_2 = 8;
      const expected_3 = 10;

      const result_1: number = dlcl1.handleGetLength();
      expect(result_1).toBe(expected_1);

      const result_2: number = dlcl1.handleRemove(41).handleGetLength();
      expect(result_2).toBe(expected_2);

      const result_3: number = dlcl1.handleAppend(41).handleAppend(100).handleGetLength();
      expect(result_3).toBe(expected_3);
    });

    test('dlcl1.handleAppend should add new node to the tail of the linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected_length_1 = 9;
      const expected_value_1 = 41;
      const expected_length_2 = 10;
      const expected_value_2 = 100;
      const expected_length_3 = 11;
      const expected_value_3 = 200;

      const result_length_1: number = dlcl1.handleGetLength();
      const result_value_1: number = (dlcl1.handleGetTail() as ListNode<number>).value;
      expect(result_length_1).toBe(expected_length_1);
      expect(result_value_1).toBe(expected_value_1);

      const result_length_2: number = dlcl1.handleAppend(100).handleGetLength();
      const result_value_2: number = (dlcl1.handleGetTail() as ListNode<number>).value;
      expect(result_length_2).toBe(expected_length_2);
      expect(result_value_2).toBe(expected_value_2);

      const result_length_3: number = dlcl1.handleAppend(200).handleGetLength();
      const result_value_3: number = (dlcl1.handleGetTail() as ListNode<number>).value;
      expect(result_length_3).toBe(expected_length_3);
      expect(result_value_3).toBe(expected_value_3);
    });

    test('dlcl1.handlePrepend should add new node to the head of the linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected_length_1 = 9;
      const expected_value_1 = 2;
      const expected_length_2 = 10;
      const expected_value_2 = 100;
      const expected_length_3 = 11;
      const expected_value_3 = 200;

      const result_length_1: number = dlcl1.handleGetLength();
      const result_value_1: number = (dlcl1.handleGetHead() as ListNode<number>).value;
      expect(result_length_1).toBe(expected_length_1);
      expect(result_value_1).toBe(expected_value_1);

      const result_length_2: number = dlcl1.handlePrepend(100).handleGetLength();
      const result_value_2: number = (dlcl1.handleGetHead() as ListNode<number>).value;
      expect(result_length_2).toBe(expected_length_2);
      expect(result_value_2).toBe(expected_value_2);

      const result_length_3: number = dlcl1.handlePrepend(200).handleGetLength();
      const result_value_3: number = (dlcl1.handleGetHead() as ListNode<number>).value;
      expect(result_length_3).toBe(expected_length_3);
      expect(result_value_3).toBe(expected_value_3);
    });

    test('dlcl1.handleInsertBefore should add new list-node to the front of the target node', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected_length_1 = 10;
      const expected_value_1 = 100;
      const expected_length_2 = 11;
      const expected_value_2 = 200;

      // ? 头节点
      const result_length_1: number = dlcl1.handleInsertBefore(2, 100).handleGetLength();
      const result_value_1: number = (dlcl1.handleGetHead() as ListNode<number>).value;
      expect(result_length_1).toBe(expected_length_1);
      expect(result_value_1).toBe(expected_value_1);

      // ? 其它部位
      const result_length_2: number = dlcl1.handleInsertBefore(2, 200).handleGetLength();
      const result_value_2: number = ((dlcl1.handleGetHead() as ListNode<number>).next as ListNode<number>).value;
      expect(result_length_2).toBe(expected_length_2);
      expect(result_value_2).toBe(expected_value_2);
    });

    test("dlcl1.handleInsertAfter should add new list-node to the back of the target node", () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });

      const expected_length_1 = 10;
      const expected_value_1 = 100;
      const expected_length_2 = 11;
      const expected_value_2 = 200;

      // ? 尾部节点
      const result_length_1: number = dlcl1.handleInsertAfter(41, 100).handleGetLength();
      const result_value_1: number = (dlcl1.handleGetTail() as ListNode<number>).value;
      expect(result_length_1).toBe(expected_length_1);
      expect(result_value_1).toBe(expected_value_1);

      // ? 其它部位
      const result_length_2: number = dlcl1.handleInsertAfter(41, 200).handleGetLength();
      const result_value_2: number = ((dlcl1.handleGetTail() as ListNode<number>).prev as ListNode<number>).value;
      expect(result_length_2).toBe(expected_length_2);
      expect(result_value_2).toBe(expected_value_2);
    });

    test('dlcl1.handleRemove should remove special node from the linked-list', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });
      const received_value = 7;
      const expected_length = 8;
      const expected_value = false;

      const result_length: number = dlcl1.handleRemove(7).handleGetLength();
      expect(result_length).toBe(expected_length);

      let sign: boolean = false;
      dlcl1.handleTraversalWithForward((node) => {
        if (node.value === received_value) {
          sign = true;
        }
      });
      expect(sign).toBe(expected_value);
    });

    test('dlcl1.handleTraversalWithForward should traversal the linked-list forwardly', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });
      const expected = [2, 5, 8, 3, 7, 19, 23, 14, 41];
      let sign = false;
      let count = 0;

      dlcl1.handleTraversalWithForward((node) => {
        node.value !== expected[count] && (sign = true);
        count++;
      });

      expect(sign).toBeFalsy();
    });

    test('dlcl1.handleTraversalWithBackward should traversal the linked-list backwardly', () => {
      const dlcl1 = new utilityAlgorithm.DLCL<number>({
        nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
      });
      const expected = [41, 14, 23, 19, 7, 3, 8, 5, 2];

      let sign = false;
      let count = 0;

      dlcl1.handleTraversalWithBackward((node) => {
        node.value !== expected[count] && (sign = true);
        count++;
      });

      expect(sign).toBeFalsy();
    });
  });

  // ? EventEmitter
  describe('EventEmitter tests', () => {
    test("EventEmitter.handleOn should put handlers into events and return the handler's own index", () => {
      const event = new utilityAlgorithm.EventEmitter({});
      const fun1 = function () {
        console.log('fun1');
      }
      const fun2 = function () {
        console.log('fun2');
      }
      const received = [
        {
          type: 'click',
          handler: fun1,
        },
        {
          type: 'click',
          handler: fun2,
        }
      ];
      const expected = [
        {
          type: 'click',
          index: 0,
        },
        {
          type: 'click',
          index: 1,
        }
      ];

      received.forEach(function (v, i) {
        const result = event.handleOn(v.type, v.handler);
        expect(result).toEqual(expected[i]);
      });
    });

    test('EventEmitter.handleRemove should remove the `dest handler` from events', () => {
      const event = new utilityAlgorithm.EventEmitter({});
      const fun1 = function () {
        console.log('fun1');
      }
      const fun2 = function () {
        console.log('fun2');
      }

      const r1 = event.handleOn('click', fun1);
      const r2 = event.handleOn('click', fun2);

      event.handleRemove(r2);

      let result: boolean = false;
      const events = event.events;
      events['click'].forEach(function (v, i) {
        if (i === r2.index) {
          if (!v) {
            result = true;
          }
        }
      });

      expect(result).toBeTruthy();
    });
  });

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
      const usp = new utilityAlgorithm.URLSearchParams({});

      for (const [i, v] of received.entries()) {
        const __this__ = usp.handleAppend(v.key, v.value);
        const { url, params } = usp.state;

        // ? check this
        expect(__this__ instanceof utilityAlgorithm.URLSearchParams).toBeTruthy();
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
      const usp = new utilityAlgorithm.URLSearchParams({});

      for (const [i, v] of received.entries()) {
        const __this__ = usp.handleDelete(v);
        const { url, params } = usp.state;

        // ? check this
        expect(__this__ instanceof utilityAlgorithm.URLSearchParams).toBeTruthy();
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
      const usp = new utilityAlgorithm.URLSearchParams({});

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
      const usp = new utilityAlgorithm.URLSearchParams({});
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
      const usp = new utilityAlgorithm.URLSearchParams({});

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
      const usp = new utilityAlgorithm.URLSearchParams({});

      for (const [i, v] of received.entries()) {
        const __this__ = usp.handleSet(v.key, v.value);
        const { url, params } = usp.state;

        // ? check this
        expect(__this__ instanceof utilityAlgorithm.URLSearchParams).toBeTruthy();
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
      const usp = new utilityAlgorithm.URLSearchParams({});
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
      const usp = new utilityAlgorithm.URLSearchParams({});
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
      const usp = new utilityAlgorithm.URLSearchParams({});

      let count = 0;
      for (const [key, value] of (usp.state.params as any)) {
        expect(key).toBe(expected[count][0]);
        expect(value).toBe(expected[count][1]);
        count++;
      }
    });
  });

  // ? ES6Achieve
  describe('ES6Achieve tests', () => {
    // ? _reflect
    describe('ES6Achieve._reflect tests', () => {
      const _reflect = utilityAlgorithm.ES6Achieve._reflect;

      test('_reflect.get should return the value of the special key from target object', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          'name',
          0,
          'skill',
        ];
        const expected = [
          'ddzy',
          undefined,
          undefined,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.get(obj, v);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.set should set the new value to the designative key', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          {
            key: 'skill',
            value: 'program',
          },
          {
            key: 'hobby',
            value: ['run', 'play-game'],
          },
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.set(obj, v.key, v.value);
          expect(temp).toBe(expected[i]);
        }

        expect(obj['skill' as keyof typeof obj]).toBe('program');
        expect(Array.isArray(obj['hobby' as keyof typeof obj])).toBeTruthy();
      });

      test('_reflect.has should return `true` when the designative key was in target object, otherwise `false`', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          'name',
          'age',
          'skill',
          'hobby',
        ];
        const expected = [
          true,
          true,
          false,
          false,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.has(obj, v);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.apply should be called same as native API named `apply`', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        function func1() {
          return 'Hello world';
        }
        function func2(...args: any[]) {
          return args[0];
        }
        function func3() {
          return this;
        }
        const received = [
          func1,
          func2,
          func3,
        ];
        const expected = [
          'Hello world',
          'Hello ddzy',
          obj,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.apply(v, obj, ['Hello ddzy']);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.construct should return the `instance` of the designative function', () => {
        function Person1() { }
        const Person2 = () => { };

        const received = [
          Person1,
          Person2,
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.construct(v, []);
          expect(temp instanceof v).toBe(expected[i]);
        }
      });

      test('_reflect.deleteProperty should remove the designative `key` from target object', () => {
        const obj = {
          name: 'ddzy',
          age: 21,
        };
        const received = [
          'name',
          'skill',
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.deleteProperty(obj, v);
          expect(temp).toBe(expected[i]);
          expect(v in obj).toBeFalsy();
        }

        const temp = _reflect.deleteProperty(function () { }, 'name');
        expect(temp).toBeTruthy();
      });

      test('_reflect.getPrototypeOf should return the `__proto__` of the designative instance', () => {
        const obj = {};
        function Person1() { }
        const person = _reflect.construct(Person1, []);
        const str = '';
        const arr: any[] = [];
        const num = 0;
        const received = [
          obj,
          person,
          str,
          arr,
          num,
        ];
        const expected = [
          obj.__proto__,
          person.__proto__,
          str.__proto__,
          arr.__proto__,
          num.__proto__,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.getPrototypeOf(v);
          expect(temp).toBe(expected[i]);
        }
      });

      test('_reflect.setPrototypeOf should set the new prototype to the designative instance', () => {
        function Person1() { }
        Person1.prototype = {
          constructor: Person1,
          say() { },
        };
        const p1 = new Person1();
        const p2 = {
          run() { },
        };

        const received = [
          null,
          p2,
        ];
        const expected = [
          true,
          true,
        ];

        for (const [i, v] of received.entries()) {
          const temp = _reflect.setPrototypeOf(p1, v);
          expect(temp).toBe(expected[i]);
        }
      });
    });

    // ? _map
    describe('ES6Achieve._map tests', () => {
      const _map = utilityAlgorithm.ES6Achieve._map;

      test('_map should handle each of value which were in `source array` with `callback`', () => {
        const received = [
          [1, 2, 3, 4, 5, 6],
          [24, 42, 4, 1, 2, 9, 58],
        ];
        const expected = [
          [2, 4, 6, 8, 10, 12],
          [48, 84, 8, 2, 4, 18, 116],
        ];

        for (const [outerI, outerV] of received.entries()) {
          const result = _map<number, number>(
            outerV,
            (outerVV) => {
              return outerVV * 2;
            },
          );

          for (const [innerI, innerV] of result.entries()) {
            expect(innerV).toBe(expected[outerI][innerI]);
          }
        }
      });

      test('_map should handle `callback` with customized `this` context', () => {
        interface IContext {
          name: string,
          age: number,
        };
        const context: IContext = {
          name: 'ddzy',
          age: 21,
        };

        const received = [
          ['', 'd', 'dd', 'ddz', 'ddzy'],
        ];
        const expected = [
          [' 980808', 'd 980808', 'dd 980808', 'ddz 980808', 'ddzy 980808'],
        ];

        for (const [outerI, outerV] of received.entries()) {
          const result = _map<string, string, IContext>(
            outerV,
            (outerVV, _outerII, __this__) => {
              // ? test `this` context
              expect(__this__).toBe(context);

              return outerVV + ' 980808';
            },
            context,
          );

          for (const [innerI, innerV] of result.entries()) {
            expect(innerV).toBe(expected[outerI][innerI]);
          }
        }
      });

      test('_map should return a `new` array and cannot modify the `origin` array', () => {
        interface IContext {
          uuid: number,
          age: number,
        };

        const received = [
          [
            { uuid: 1, age: 10 },
            { uuid: 2, age: 20 },
            { uuid: 3, age: 30 },
          ],
        ];
        const expected = [
          [
            { uuid: 1, age: 110 },
            { uuid: 2, age: 120 },
            { uuid: 3, age: 130 },
          ],
        ];

        for (const [outerI, outerV] of received.entries()) {
          const result = _map<IContext, IContext>(
            outerV,
            (outerVV) => {
              return {
                uuid: outerVV.uuid,
                age: outerVV.age + 100,
              };
            },
          );

          for (const [innerI, innerV] of result.entries()) {
            expect(innerV.uuid).toBe(expected[outerI][innerI].uuid);
            expect(innerV.age).toBe(expected[outerI][innerI].age);
          }

          // ?
          result.push({
            uuid: 4,
            age: 140,
          });
          expect(outerV.length).toBe(3);
          expect(result.length).toBe(4);
        }
      });
    });

    // ? _reduce
    describe('ES6Achieve._reduce tests', () => {
      const _reduce = utilityAlgorithm.ES6Achieve._reduce;

      test('_reduce should return `undefined` when received an empty array', () => {
        const received: any[] = [];

        const result = _reduce(received, (total, current) => {
          return total + current;
        });

        expect(result).toBeUndefined();
      });

      test('_reduce should return `number` when received an array being composed of `number`', () => {
        const received = [1, 2, 3, 4, 5];
        const expected = 15;

        const result = _reduce<number, number>(received, (total, current) => {
          return total + current;
        });

        expect(result).toBe(expected);
      });

      test('_reduce should return `number` when received an array being composed of `number` and an `initialValue`', () => {
        const received = [1, 2, 3, 4, 5];
        const expected = 25;

        const result = _reduce<number, number>(received, (total, current) => {
          return total + current;
        }, 10);

        expect(result).toBe(expected);
      });

      test('_reduce should return `number` when received an array being composed of `object`', () => {
        const received = [
          { uuid: 1, name: 'duan', age: 10 },
          { uuid: 2, name: 'duan', age: 20 },
          { uuid: 3, name: 'duan', age: 30 },
        ];
        const expected = 60;

        const result = _reduce<typeof received[0], number>(received, (total, current) => {
          return total + current.age;
        }, 0);

        expect(result).toBe(expected);
      });

      test('_reduce should return `string` when received an array being composed of `number`', () => {
        const received = [1, 2, 3, 4, 5];
        const expected = '12345';

        const result = _reduce<number, string>(received, (total, current) => {
          return total + current;
        }, '');

        expect(result).toBe(expected);
      });
    });

    // ? _filter
    describe('ES6Achieve._filter tests', () => {
      const _filter = utilityAlgorithm.ES6Achieve._filter;

      test('_filter should return a new empty array when receive an empty array', () => {
        const received: number[] = [];

        const result = _filter<number>(received, (v) => {
          return !!v;
        });

        expect(result.length).toBe(0);
        received.push(2);
        received.push(3);
        expect(received.length).toBe(2);
        expect(result.length).toBe(0);
      });

      test('_filter should return the eligible array when receive an array composed of number', () => {
        const received: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        const expected: number[] = [2, 4, 6, 8];

        const result = _filter<number>(received, (v) => {
          return v % 2 === 0;
        });

        for (const [i, v] of result.entries()) {
          expect(v).toBe(expected[i]);
        }
      });

      test('_filter should return the eligible array when receive an array composed of plain object', () => {
        interface User {
          name: string,
          age: number,
        };
        const received: User[] = [
          { name: 'duan', age: 20 },
          { name: 'zhao', age: 30 },
          { name: 'yang', age: 40 },
        ];
        const expected: User[] = [
          { name: 'zhao', age: 30 },
          { name: 'yang', age: 40 },
        ];

        const result = _filter<User>(received, (v) => {
          return v.age >= 30;
        });

        for (const [i, v] of result.entries()) {
          expect(v.name).toBe(expected[i].name);
          expect(v.age).toBe(expected[i].age);
        }
      });

      test('_filter should return the aligible array and print the truthy context when receive an array composed of number', () => {
        interface Obj {
          secret: string,
          say: (secret: string) => void,
        };

        const obj: Obj = {
          secret: '980808',
          say() {
            console.log(this.secret);
          },
        };
        const received = [-1, 1, -2, 2, -3, 3];
        const expected = {
          context: obj,
          arr: [1, 2, 3],
        };

        const result = _filter<number, Obj>(received, function (v) {
          expect(this).toBe(expected.context);

          return v > 0;
        }, obj);

        for (const [i, v] of result.entries()) {
          expect(v).toBe(expected.arr[i]);
        }
      });
    });

    // ? _every
    describe('ES6Achieve._every tests', () => {
      const _every = utilityAlgorithm.ES6Achieve._every;

      test('_every should always return `true` when receive an empty array', () => {
        const received: number[] = [];
        const expected = true;

        const result = _every<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should return `true` when receive an array composed of `number` that accord with condition', () => {
        const received: number[] = [1, 2, 3, 4, 5];
        const expected = true;

        const result = _every<number, null>(received, (v) => {
          return v < 10;
        });

        expect(result).toBe(expected);
      });

      test('_every should return `false` when receive an array composed of `object` that not accord with condition', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = false;

        const result = _every<IPair, null>(received, (v) => {
          return v.age < 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should called by custom `this` context', () => {
        const context = {
          name: 'ddzy',
          printName() {
            return this.name;
          },
        };

        const received: number[] = [1, 2, 3, 4, 5];
        const expected = {
          context,
          result: true,
        };

        const result = _every<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v < 6;
        }, context);

        expect(result).toBe(expected.result);
      });
    });

    // ? _find
    describe('ES6Achieve._find tests', () => {
      const _find = utilityAlgorithm.ES6Achieve._find;

      test('_every should always return `undefined` when receive an empty array', () => {
        const received: number[] = [];
        const expected = undefined;

        const result = _find<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should return first value that has been found when receive an array composed of `number`', () => {
        const received: number[] = [-1, -2, 1, 2, 3];
        const expected = 1;

        const result = _find<number, null>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_every should return the first that has been found when receive an array composed of `object`', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = received[1];

        const result = _find<IPair, null>(received, (v) => {
          return v.age >= 31;
        });

        expect(result).toBe(expected);
      });

      test('_every should called by custom `this` context', () => {
        const context = {
          secret: 'duanzhaoyang',
          printSecret() {
            return this.secret;
          },
        };

        const received: number[] = [1, 2, 3, 4, 5];
        const expected = {
          context,
          result: 5,
        };

        const result = _find<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v === 5;
        }, context);

        expect(result).toBe(expected.result);
      });
    });

    // ? _startsWith
    describe('ES6Achieve._startsWith tests', () => {
      const _startsWith = utilityAlgorithm.ES6Achieve._startsWith;

      test('_startsWith should return whether the `origin` string is composed of `target`', () => {
        const origin = 'ddzy';
        const received = ['d', 'yang', 'ddzyy'];
        const expected = [true, false, false];

        for (const [i, v] of received.entries()) {
          const result = _startsWith(origin, v);

          expect(result).toBe(expected[i]);
        }
      });

      test('_startsWith should return whether the `origin` string is composed of `target` at special `index`', () => {
        const origin = 'ddzy';
        const received = ['ddz', 'dzy'];
        const expected = [false, false];

        for (const [i, v] of received.entries()) {
          const result = _startsWith(origin, v, 1);

          expect(result).toBe(expected[i]);
        }
      });
    });

    // ? _some
    describe('ES6Achieve._some tests', () => {
      const _some = utilityAlgorithm.ES6Achieve._some;

      test('_some should always return `false` when receive an empty array', () => {
        const received: number[] = [];
        const expected = false;

        const result = _some<number>(received, (v) => {
          return v > 0;
        });

        expect(result).toBe(expected);
      });

      test('_some should return `true` when receive an array composed of `number` that at least one accord with condition', () => {
        const received: number[] = [1, 2, 3, 4, 5];
        const expected = true;

        const result = _some<number, null>(received, (v) => {
          return v < 10;
        });

        expect(result).toBe(expected);
      });

      test('_some should return `false` when receive an array composed of `object` that nobody accord with condition', () => {
        interface IPair {
          name: string;
          age: number;
        };

        const received: IPair[] = [
          { name: 'duan', age: 21 },
          { name: 'zhao', age: 31 },
          { name: 'yang', age: 41 },
        ];
        const expected = false;

        const result = _some<IPair, null>(received, (v) => {
          return v.age < 0;
        });

        expect(result).toBe(expected);
      });

      test('_some should called by custom `this` context', () => {
        const context = {
          name: 'ddzy',
          printName() {
            return this.name;
          },
        };

        const received: number[] = [1, 2, 3, 4, 5];
        const expected = {
          context,
          result: true,
        };

        const result = _some<number, typeof context>(received, function (v) {
          expect(this).toBe(expected.context);

          return v < 6;
        }, context);

        expect(result).toBe(expected.result);
      });
    });
  });
});