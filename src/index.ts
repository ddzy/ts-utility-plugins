import { divideByThousand } from "./ddzy/utility/number/divideByThousand";


// ? 小于千位的数字
const s1 = 11;
const p1 = divideByThousand(s1);
console.log(p1);

console.log('--------------------------');

// ? 刚好等于千位的数字
const s2 = 110;
const p2 = divideByThousand(s2);
console.log(p2);

console.log('-------------------------');

// ? 大于千位的数字
const s3 = 1100;
const s4 = 3456687;
const p3 = divideByThousand(s3);
const p4 = divideByThousand(s4);
console.log(p3);
console.log(p4);

console.log('-------------------------');

// ? 负数
const s5 = -11;
const s6 = -110;
const s7 = -1100;
const s8 = -3456687;
const p5 = divideByThousand(s5);
const p6 = divideByThousand(s6);
const p7 = divideByThousand(s7);
const p8 = divideByThousand(s8);
console.log(p5);
console.log(p6);
console.log(p7);
console.log(p8);

console.log('--------------------------');

// ? 自定义分隔符
const s9 = 1325234523642364;
const p9 = divideByThousand(s9, '_');
console.log(p9);