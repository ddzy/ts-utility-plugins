import { size } from "./ddzy/utility/others/sizse";

// ? 特殊值
const s0 = [0, 100, undefined, null, Symbol('ddzy'), function () { }];
const p0 = s0.map((v) => {
  return size(v);
});
console.log(p0);  // [0, 0, 0, 0, 0, 0]

console.log('------------------------');

// ? 字符串
const s1 = ['', 'ddzy'];
const p1 = s1.map((v) => {
  return size(v);
});
console.log(p1);  // [0, 4]

console.log('-----------------------');

// ? 数组
const s2 = [[], [0, 1, 2, 3, 4, 5]];
const p2 = s2.map((v) => {
  return size(v);
});
console.log(p2);  // [0, 6]

console.log('------------------------');

// ? 普通对象
const s3 = [{}, { name: 'duanzhaoyang', age: 21 }];
const p3 = s3.map((v) => {
  return size(v);
});
console.log(p3);  // [0, 2]