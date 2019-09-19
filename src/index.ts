import { dropRight } from "./ddzy/utility/array/dropRight";

// ? 空数组
const s1: number[] = [];
const p1 = dropRight<number>(s1);
console.log(p1);

// ? 数字数组
const s2: number[] = [1, 2, 3, 4, 5];
const p2 = dropRight<number>(s2, 2);
console.log(p2);

// ? 不改变源数组
const s3: number[] = [1, 2, 3, 4, 5, 6];
const p3 = dropRight<number>(s3);
console.log(p3);
p3.push(100);
console.log(s3);