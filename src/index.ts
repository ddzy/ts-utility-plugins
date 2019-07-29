import utilityAlgorithm from "./ddzy/utility/algorithm";

const _includes = utilityAlgorithm.ES6Achieve._includes;


// ? 空数组
const s1: number[] = [];
const p1 = _includes<number>(s1, 2);
console.log(p1);

console.log('------------------------');

// ? 数字数组, 不存在
const s2: number[] = [1, 2, 3, 4, 5];
const p2 = _includes<number>(s2, 6);
console.log(p2);

console.log('--------------------------');

// ? 数字数组, 存在
const s3: number[] = [1, 2, 3, 4, 5];
const p3 = _includes<number>(s3, 3);
console.log(p3);

console.log('------------------');

// ? 对象数组, 不存在
interface IPair {
  id: number;
  name: string;
};
const s4: IPair[] = [
  { id: 0, name: 'ddzy' },
  { id: 1, name: 'duan' },
  { id: 2, name: 'zhao' },
];
const p4 = _includes<IPair>(s4, {
  id: 0,
  name: 'ddzy',
});
console.log(p4);

console.log('------------------------');

// ? NaN
const s5: number[] = [1, 2, NaN, 3, 4];
const p5 = _includes(s5, NaN, 0);
console.log(p5);
