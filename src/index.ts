import { endsWith } from "./ddzy/utility/string/endsWith";

// ?
const s1 = {
  text: 'duanzhaoyang',
  target: 'a',
};
const p1 = endsWith(s1.text, s1.target, 3);
console.log(p1);

console.log('----------------------');

const s2 = {
  text: 'duanzhaoyang',
  target: 'ao',
};
const p2 = endsWith(s2.text, s2.target);
console.log(p2);

console.log('-----------------------');

const s3 = {
  text: 'ddzy',
  target: 'y',
};
const p3 = endsWith(s3.text, s3.target);
console.log(p3);

const s4 = {
  text: 'duan',
  target: 'd',
  position: 4,
};
const p4 = endsWith(s4.text, s4.target, s4.position);
console.log(p4);