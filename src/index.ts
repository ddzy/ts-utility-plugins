import take from "./ddzy/utility/array/take";

const s1 = [1, 2, 3, 4, 5, 6, 7, 8];
const p1 = take(s1, 5);
console.log(p1);

const s2: any = [];
const p2 = take<any>(s2, 3);
console.log(p2);

const s3 = ['a', 'b', 'c', 'd', 'e'];
const p3 = take(s3, 8);
console.log(p3);

const s4 = [[], [], [], [1, 2, 3]];
const p4 = take(s4, 0);
console.log(p4);