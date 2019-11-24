import { pullAll } from "./ddzy/utility/array/pullAll";

// ? 普通数字数组
const s1 = [1, 2, 3, 1, 2, 3];
const selector1 = [2, 3];
const result1 = pullAll<number>(s1, selector1);
console.log(result1 === s1);
console.log(result1);

console.log('--------------------------');

// ? 对象数组
const s2 = [
  {
    name: 'duan',
    age: 21,
  },
  {
    name: 'zhao',
    age: 22,
  },
  {
    name: 'duan',
    age: 21,
  },
];
const selector2 = [
  {
    name: 'duan',
    age: 21,
  },
];
const result2 = pullAll(s2, selector2);
console.log(result2 === s2);
console.log(result2);

console.log('--------------------------');

// ? 混合数组
const s3 = [
  0,
  19980808,
  'duanzhaoyang',
  false,
  null,
  undefined,
  Symbol('a'),
  function () { },
  {},
  [],
];
const selector3 = [false, undefined, 19980808, []];
const result3 = pullAll<any>(s3, selector3);
console.log(result3 === s3);
console.log(result3);