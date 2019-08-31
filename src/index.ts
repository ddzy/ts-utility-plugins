import { trim } from "./ddzy/utility/string/trim";

// ? 空字符串
const s1 = '';
const p1 = trim(s1);
console.log(p1);

console.log('---------------');

// ? 字符串 + 首尾空格 + 默认字符
const s2 = '  ddzy   ';
const p2 = trim(s2);
console.log(p2);

console.log('----------------');

// ? 字符串 + 指定字符
const s3 = 'wow, i like program!';
const s4 = 'wow, i love you, wow';
const p3 = trim(s3, 'wow');
const p4 = trim(s4, 'wow');
console.log(p3);
console.log(p4);