import { fill } from "./ddzy/utility/array/fill";


// ? 空数组
const s1: number[] = [];
const p1 = fill<number>(s1, 100);
console.log(p1);

console.log('---------------------');

// ? 非空数组
const s2: number[] = [1, 2, 3, 4, 5];
const p2 = fill<number>(s2, 200, 2, 8);
console.log(p2);

console.log('-----------------------');

// ? 原地操作
const s3: any[] = [false, 0, '', NaN, true, function () { }];
const p3 = fill<any>(s3, 'duanzhaoyang', 0);
console.log(p3);
console.log(p3 === s3);