import utilityAlgorithm from "./ddzy/utility/algorithm";


const reflect = utilityAlgorithm.ES6Achieve._reflect;
const obj = {
  name: 'ddzy',
  age: 21,
};

// ? reflect
// console.log(reflect);

// ? reflect.get
// const p1 = reflect.get(obj, 'name');
// const p2 = reflect.get(obj, 'skill');
// console.log(p1);
// console.log(p2);

// ? reflect.set
// const p1 = reflect.set(obj, 'skill', 'program');
// const p2 = reflect.set(obj, 'hobby', ['run', 'play-game']);
// console.log(p1);
// console.log(p2);
// console.log(obj);

// ? reflect.has
// obj.__proto__.hobby = ['run', 'watch'];
// const p1 = reflect.has(obj, 'name');
// const p2 = reflect.has(obj, 'skill');
// const p3 = reflect.has(obj, 'hobby');
// console.log(p1);
// console.log(p2);
// console.log(p3);

// ? reflect.apply
// function func1(...args: any[]) {
//   return args;
// }
// function func2() {
//   return this;
// }
// const p1 = reflect.apply(func1, obj, []);
// const p2 = reflect.apply(func2, obj, []);
// const p3 = func2();
// console.log(p1);
// console.log(p2);
// console.log(p3); // undefined
// console.log(func2()); // undefined

// ? reflect.construct
// function Person1() { }
// const Person2 = () => { }
// const Person3 = {};
// const p1 = reflect.construct(Person1, []);
// const p2 = reflect.construct(Person2, []);
// const p3 = reflect.construct(Person3, []);
// console.log(p1);
// console.log(p2);
// console.log(p3);

// ? reflect.deleteProperty
// const p1 = reflect.deleteProperty(obj, 'name');
// const p2 = reflect.deleteProperty(obj, 'skill');
// const p3 = reflect.deleteProperty(function() {}, 'name');
// console.log(p1);
// console.log(p2);
// console.log(p3);
// console.log(obj);

// ? reflect.getPrototypeOf
// function Person1() { }
// const p1 = reflect.construct(Person1, []);
// const p2 = reflect.getPrototypeOf(obj);
// const p3 = reflect.getPrototypeOf(p1);
// const p4 = reflect.getPrototypeOf('');
// const p5 = reflect.getPrototypeOf([]);
// const p6 = reflect.getPrototypeOf(0);
// const p7 = reflect.getPrototypeOf(null);
// const p8 = reflect.getPrototypeOf(undefined);
// console.log(p2);
// console.log(p3);
// console.log(p4);
// console.log(p5);
// console.log(p6);
// console.log(p7);
// console.log(p8);

// ? reflect.setPrototypeOf
// function Person1() { }
// Person1.prototype = {
//   say() {},
// };
// const p = new Person1();
// const p1 = reflect.setPrototypeOf(Person1, null);
// const p2 = reflect.setPrototypeOf(Person1, 0);
// const p3 = reflect.setPrototypeOf(Person1, '');
// const p4 = reflect.setPrototypeOf(Person1, {
//   run() {},
// });
// console.log(p1);
// console.log(p2);
// console.log(p3);
// console.log(p4);



// ! -------------------------------------------

// ? Reflect.construct
// const p1 = Reflect.construct(Person, []);
// const p2 = Reflect.construct(Person2, []);
// console.log(p1);
// console.log(p2.say());

// ? Reflect.get
// const p1 = Reflect.get(obj, 'name');
// const p2 = Reflect.get(obj, 'skill');
// console.log(p1);
// console.log(p2);

// ? Reflect.has
// const p1 = Reflect.has(obj, 'name');
// const p2 = Reflect.has(obj, 'skill');
// console.log(p1);
// console.log(p2);

// ? Reflect.getPrototypeOf, 获取隐式原型, 相当于__proto__
// const p1 = Reflect.getPrototypeOf(obj);
// const p2 = new Person();
// console.log(p2);

// ? Reflect.setPrototypeOf
// function Person1() {}
// const p1 = Reflect.setPrototypeOf(Person1, null);
// console.log(p1);

// ? Reflect.set
// const p1 = Reflect.set(obj, 'skill', 'program');
// const p2 = Reflect.set(obj, [], []);
// console.log(p1);
// console.log(p2);
// console.log(obj);

// ? Reflect.deleteProperty
// const p1 = Reflect.deleteProperty(obj, 'age');
// const p2 = Reflect.deleteProperty(obj, 'skill');
// console.log(p1);
// console.log(p2);
// console.log(obj);

// ? Reflect.apply
// const p1 = Reflect.apply(Person2, obj, ['test']);
// const p2 = Reflect.apply(Person2, null, ['test']);
// const p3 = Reflect.apply(Person2, undefined, document.querySelectorAll('div'));
// const p4 = Reflect.apply(Person2, window, ['test']);