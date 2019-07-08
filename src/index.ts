import utilityAlgorithm from "./ddzy/utility/algorithm";


const _reduce = utilityAlgorithm.ES6Achieve._reduce;

const s1 = [1, 2, 3, 4, 5];
const p1 = _reduce<number, number>(s1, (total, current) => {
  return total + current;
});
console.log(p1);

console.log('--------------------------');

const s2 = [1, 2, 3, 4, 5];
const p2 = _reduce<number, number>(s2, (total, current) => {
  return total + current;
}, 10);
console.log(p2);

console.log('--------------------------');

const s3 = [
  { uuid: 1, name: 'duan', age: 10 },
  { uuid: 2, name: 'duan', age: 20 },
  { uuid: 3, name: 'duan', age: 30 },
];
const p3 = _reduce<typeof s3[0], number>(s3, (total, current) => {
  return total + current.age;
}, 0);
console.log(p3);

console.log('--------------------------');

const s4 = [1, 2, 3, 4, 5];
const p4 = _reduce<number, string>(s4, (total, current) => {
  return total + current;
}, '');
console.log(p4);

console.log('--------------------------');

const s5: any[] = [];
const p5 = _reduce(s5, (total, current) => {
  return total + current;
})
console.log(p5);