import selectSort from "./ddzy/utility/algorithm/sort/select-sort";

const s1 = [29, 51, 72, 68, 45, 97];
const p1 = selectSort(s1);
console.log(p1);

const s2: number[] = [];
const p2 = selectSort(s2);
console.log(p2);

const s3 = [1, 2, 3, 4, 5];
const p3 = selectSort(s3);
console.log(p3);

const s4 = [3, 3, 3, 3, 3];
const p4 = selectSort(s4);
console.log(p4);

const s5 = [5, 4, 3, 2, 1];
const p5 = selectSort(s5);
console.log(p5);

const s6 = [1];
const p6 = selectSort(s6);
console.log(p6);