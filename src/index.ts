import insertSort from "./ddzy/utility/algorithm/sort/insert-sort";

const s1 = [29, 51, 72, 68, 45, 97];
const p1 = insertSort(s1);
console.log(p1);

const s2: number[] = [];
const p2 = insertSort(s2);
console.log(p2);

const s3 = [1, 2, 3, 4, 5];
const p3 = insertSort(s3);
console.log(p3);

const s4 = [3, 3, 3, 3, 3];
const p4 = insertSort(s4);
console.log(p4);

const s5 = [5, 4, 3, 2, 1];
const p5 = insertSort(s5);
console.log(p5);

const s6 = [1];
const p6 = insertSort(s6);
console.log(p6);

const s7 = [1045, 765, 32, 678, 98, 14, 20000];
const p7 = insertSort(s7);
console.log(p7);