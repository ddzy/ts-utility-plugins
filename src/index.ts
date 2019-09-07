import { head } from "./ddzy/utility/array/head";

// ? 普通数字数组
const s1: number[] = [1, 2, 3, 4, 5];
const p1 = head<number>(s1);
console.log(p1);

console.log('-----------------');

// ? 空数组
const s2: any[] = [];
const p2 = head<any>(s2);
console.log(p2);