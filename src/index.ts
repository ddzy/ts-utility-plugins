import { castArray } from "./ddzy/utility/array/castArray";

const p1 = castArray<number>(1);
console.log(p1);

console.log('-------------');

interface IP2Params {
  a: number,
};
const p2 = castArray<IP2Params>({
  a: 1,
});
console.log(p2);

console.log('-------------');

const p3 = castArray<null>(null);
console.log(p3);

console.log('------------------');

const p4 = castArray<undefined>(undefined);
console.log(p4);

console.log('-----------------');

const origin: number[] = [];
const p5 = castArray<typeof origin>(origin);
console.log(p5);
console.log(p5 === origin);