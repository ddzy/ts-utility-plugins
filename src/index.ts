import { zip } from "./ddzy/utility/array/zip";

// ? 数字数组
const s1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10, 11]];
const p1 = zip<number>(...s1);
console.log(p1);

// ? 混合数组
const s2 = [
  [100, 200, 300],
  [false, true],
  [[], { name: 'duanzhaoyang', age: 21 }],
];
const p2 = zip<any>(...s2);
console.log(p2);