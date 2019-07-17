import utilityAlgorithm from "./ddzy/utility/algorithm";

const _find = utilityAlgorithm.ES6Achieve._find;


// ? 空数组
const s1: number[] = [];
const p1 = _find<number>(s1, (v) => {
  return v > 0;
});
console.log(p1);

console.log('-------------------');

// ? 数字数组
const s2: number[] = [-1, -2, 1, 2, 3];
const p2 = _find(s2, (v) => {
  return v > 0;
})
console.log(p2);

console.log('--------------------');

// ? 对象数组
interface IPair {
  name: string;
  age: number;
};
const s3: IPair[] = [
  { name: 'duan', age: 20 },
  { name: 'zhao', age: 30 },
  { name: 'yang', age: 40 },
];
const p3 = _find<IPair>(s3, (v) => {
  return v.age >= 30;
});
console.log(p3);

console.log('----------------------');

// ? this上下文
const context = {
  secret: 'duanzhaoyang',
  printSecret() {
    return this.secret;
  },
};
const s4: number[] = [];
const p4 = _find<number, typeof context>(s4, function (v) {
  console.log('context: ', this);

  return v > 0;
}, context);
console.log(p4);
