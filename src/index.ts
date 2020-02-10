import { _join } from "./ddzy/utility/array/_join";


// ? 空数组
const s1: number[] = [];
const p1 = _join(s1, '')
console.log(p1);

// ? 数字数组
const s2: number[] = [1, 2, 3, 4, 5];
const p2 = _join<number>(s2, '');
console.log(p2);

// ? 自定义分隔符
const s3: string[] = ['a', 'b', 'c', 'd', 'e'];
const p3 = _join<string>(s3, '-');
console.log(p3);