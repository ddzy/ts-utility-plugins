import { gt } from "./ddzy/utility/others/gt";

// ? true
const s1 = [10, 5];
const p1 = gt(s1[0], s1[1]);
console.log(p1);

console.log('-----------------');

// ? false
const s2 = [10, 10];
const p2 = gt(s2[0], s2[1]);
console.log(p2);

console.log('----------------------');

// ? false
const s3 = [10, 20];
const p3 = gt(s3[0], s3[1]);
console.log(p3);

console.log('-----------------------');