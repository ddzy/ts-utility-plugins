import utilityArray from "./ddzy/utility/array";

const compact = utilityArray.compact;


// ? 空数组
const s1: any[] = [];
const p1 = compact<any>(s1);
console.log(p1);

console.log('---------------------');

// ? 正常过滤假值
const s2: any[] = [true, false, 0, '', undefined, NaN, null, 22];
const p2 = compact<any>(s2);
console.log(p2);

console.log('--------------------');

// ? 不修改源数组
const s3: number[] = [0, 1, 2, 3, 4];
const p3 = compact<number>(s3);
console.log(p3);
s3.push(5);
console.log(p3);
console.log(s3);