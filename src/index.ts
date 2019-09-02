import { drop } from "./ddzy/utility/array/drop";

// ? 空数组 + 默认值
const s1: number[] = [];
const p1 = drop(s1);
console.log(p1);

console.log('-----------------');

// ? 纯数字数组 + 自定义数值
const s2: number[] = [1, 2, 3, 4, 5, 6];
const p2 = drop<number>(s2, 3);
console.log(p2);

console.log('--------------------');

// ? 不应该改变源数组
const s3: number[] = [100, 300, 500];
const p3 = drop<number>(s3, 0);
console.log(p3);
p3.push(700);
console.log(s3);
console.log(p3);