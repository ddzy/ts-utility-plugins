import utilityArray from "./ddzy/utility/array";

const p1 = utilityArray.isStrictArray(0);
const p2 = utilityArray.isStrictArray('');
const p3 = utilityArray.isStrictArray('ddzy');
const p4 = utilityArray.isStrictArray(null);
const p5 = utilityArray.isStrictArray(undefined);
const p6 = utilityArray.isStrictArray(Symbol);
const p7 = utilityArray.isStrictArray({});
const p8 = utilityArray.isStrictArray({ length: 0 });
const p9 = utilityArray.isStrictArray(document.querySelectorAll('div'));
const p10 = utilityArray.isStrictArray([]);
const p11 = utilityArray.isStrictArray([1, 2, 3]);

console.log(p1);
console.log(p2);
console.log(p3);
console.log(p4);
console.log(p5);
console.log(p6);
console.log(p7);
console.log(p8);
console.log(p9);
console.log(p10);
console.log(p11);