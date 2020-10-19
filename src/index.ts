import bubbleSort from "./ddzy/utility/algorithm/sort/bubble-sort";

const s1 = [29, 51, 72, 68, 45, 97];
const p1 = bubbleSort(s1);
console.log(p1);

const s2: number[] = [];
const p2 = bubbleSort(s2);
console.log(p2);

const s3 = [1, 2, 3, 4, 5];
const p3 = bubbleSort(s3);
console.log(p3);

const s4 = [3, 3, 3, 3, 3];
const p4 = bubbleSort(s4);
console.log(p4);

const s5 = [5, 4, 3, 2, 1];
const p5 = bubbleSort(s5);
console.log(p5);

const s6 = [1];
const p6 = bubbleSort(s6);
console.log(p6);