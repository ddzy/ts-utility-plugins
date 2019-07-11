import utilityAlgorithm from "./ddzy/utility/algorithm";

const _filter = utilityAlgorithm.ES6Achieve._filter;


// received(空数组) => expected(新的空数组)
const s1: any[] = [];
const p1 = _filter<any>(s1, (v) => {
  return v && v;
});
console.log(p1);
s1.push('s1', 'ss1');
console.log(p1);


console.log('-----------------------------');


// received(数字数组) => expected(新的数组)
const s2: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const p2 = _filter<number>(s2, (v) => {
  return v % 2 === 0;
});
console.log(p2);


console.log('-----------------------------');


// received(对象数组) => expected(新的数组)
interface User {
  name: string,
  age: number,
};
const s3: User[] = [
  { name: 'duan', age: 20 },
  { name: 'zhao', age: 30 },
  { name: 'yang', age: 40 },
];
const p3 = _filter<User>(s3, (v) => {
  return v.age >= 30;
});
console.log(p3);


console.log('----------------------------');


// received(数字数组, this = obj) => expected(新的数组, obj)
interface Obj {
  secret: string,
  say: (secret: string) => void,
};
const obj: Obj = {
  secret: '980808',
  say(secret) {
    console.log(secret);
  },
};
const s4: number[] = [-1, 1, -2, 2, -3, 3];
const p4 = _filter<number, Obj>(s4, function (v) {
  this.say(this.secret);
  return v > 0;
}, obj);