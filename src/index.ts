import { difference } from "./ddzy/utility/array/difference";

// ? 纯数字数组
const s1 = [1, 2, 3, 4, 5];
const p1 = difference(s1, 1, 4);
console.log(p1);

console.log('--------------');

// ? 不应该改变源数组
const s2 = [100, 200, 300, 300, 500];
const p2 = difference<number>(s2, 300);
console.log(p2);
s2.push(800);
console.log(p2);

console.log('-----------------');

// ? 任意值数组
const s3: any[] = [null, undefined, NaN, '', 0, false, function () { }, {}, []];
const p3 = difference(s3, function () { }, [], null);
console.log(p3);

console.log('----------');