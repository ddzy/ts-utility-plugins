import utilityAlgorithm from "./ddzy/utility/algorithm";

const _every = utilityAlgorithm.ES6Achieve._every;


// ? 空数组 -> true
const s1: number[] = [];
const p1 = _every<number>(s1, (v) => {
  return v > 0;
});
console.log(p1);

console.log('------------------------');

// ? 数字数组 -> true
const s2: number[] = [1, 2, 3, 4, 5];
const p2 = _every<number, null>(s2, (v) => {
  return v > 0;
})
console.log(p2);

console.log('------------------------');

// ? 对象数组 -> false

interface IPair {
  name: string;
  age: number;
};
const s3: IPair[] = [
  { name: 'duan', age: 21 },
  { name: 'zhao', age: 31 },
  { name: 'yang', age: 41 },
];
const p3 = _every<IPair, null>(s3, (v) => {
  return v.age < 0;
});
console.log(p3);

console.log('-------------------------');

// ? context

const context = {
  name: 'ddzy',
  printName() {
    return this.name;
  },
};
const s4: number[] = [1, 2, 3, 4, 5];
const p4 = _every<number, typeof context>(s4, function (v) {
  console.log('context: ', this === context);
  return v < 6;
}, context);
console.log(p4);