import { EventEmitter } from "../../utility/algorithm/event-emitter";

// ? EventEmitter
describe('EventEmitter tests', () => {
  test("EventEmitter.handleOn should put handlers into events and return the handler's own index", () => {
    const event = new EventEmitter({});
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
    const event = new EventEmitter({});
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