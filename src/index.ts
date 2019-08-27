import { _concat } from "./ddzy/utility/array/_concat";

// ? 纯数字数组
const s1 = [1, 2, 3, 4, 5];
const p1 = _concat<number>(s1, 6, 7, 8);
console.log(p1);
s1.push(6);
console.log(s1);

console.log('------------------');

// ? 任意值数组
const s2: any[] = [1, 0, '', undefined, null, [[100]], { name: 'ddzy' }];
const p2 = _concat<any>(s2, [[200], [300]], { age: 21 });
console.log(p2);

console.log('-------------------');