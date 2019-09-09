import { eq } from "./ddzy/utility/others/eq";

// ? 基本类型值
const s1 = [100, 100];
const p1 = eq(s1[0], s1[1]);
console.log(p1);

console.log('----------------');

// ? 引用类型值, 指向不同的内存地址
const s2 = [{}, {}];
const p2 = eq(s2[0], s2[1]);
console.log(p2);

console.log('------------------');

// ? 引用类型值, 指向相同的内存地址
const o3 = {};
const s3 = [o3, o3];
const p3 = eq(s3[0], s3[1]);
console.log(p3);

console.log('-------------------');

// ? 都为NaN, 也是相等
const s4 = [NaN, NaN];
const p4 = eq(s4[0], s4[1]);
console.log(p4);