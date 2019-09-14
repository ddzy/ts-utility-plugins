import { capitalize } from "./ddzy/utility/string/capitalize";

// ?
const s1 = '';
const p1 = capitalize(s1);
console.log(p1);

console.log('-------------------');

// ?
const s2 = 'ZHAO';
const p2 = capitalize(s2);
console.log(p2);

console.log('-------------------');

// ?
const s3 = 'duan';
const p3 = capitalize(s3);
console.log(p3);

console.log('----------------------');

// ?
const s4 = '_DDZY';
const p4 = capitalize(s4);
console.log(p4);

// ?
const s5 = '  ___&*duanzhaoyang';
const p5 = capitalize(s5);
console.log(p5);