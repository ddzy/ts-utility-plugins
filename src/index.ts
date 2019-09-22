import { lowerCase } from "./ddzy/utility/string/lowerCase";

// ? 空字符串
const s1 = '';
const p1 = lowerCase(s1);
console.log(p1);

console.log('----------------------');

// ?
const s2 = '--Duan-Zhao--';
const p2 = lowerCase(s2);
console.log(p2);

console.log('-----------------------');

// ?
const s3 = 'alioeDuan';
const p3 = lowerCase(s3);
console.log(p3);

console.log('-------------------------');

// ?
const s4 = '__DUAN_ZHAO_YANG__';
const p4 = lowerCase(s4);
console.log(p4);