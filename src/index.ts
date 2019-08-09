import utilityArray from "./ddzy/utility/array";

const trunk = utilityArray.trunk;


// ? 空数组
const s1: number[] = [];
const p1 = trunk<number>(s1);
console.log(p1);

console.log('------------------------');

// ? 普通数字数组
const s2: number[] = [1, 2, 3, 4, 5, 6, 7];
const p2 = trunk<number>(s2);
console.log(p2);

console.log('-------------------------');

// ? 任意分片长度
const s3: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const p3 = trunk<number>(s3, 2);
const p4 = trunk<number>(s3, 5);
const p5 = trunk<number>(s3, 7);
const p6 = trunk<number>(s3, 10);
console.log(p3);
console.log(p4);
console.log(p5);
console.log(p6);
