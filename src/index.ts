import utilityAlgorithm from "./ddzy/utility/algorithm";

const _some = utilityAlgorithm.ES6Achieve._some;


// ? 空数组
const s1: number[] = [];
const p1 = _some(s1, (v) => {
  return v > 0;
});
console.log(p1);

console.log('------------------------');

// ? 没有符合条件的数组
const s2: number[] = [2, 8, 5, 6];
const p2 = _some(s2, (v) => {
  return v > 10;
});
console.log(p2);

console.log('------------------------');

// ? 有至少一个符合条件的数组
const s3: number[] = [2, 8, -2, -88, 56];
const p3 = _some(s3, (v) => {
  return v < 0;
});
console.log(p3);

console.log('------------------------');

// ? 自定义context
const context = {
  secret: 'ddzy',
};
const s4: number[] = [1, 2, 3, 4, 5];
const p4 = _some<number, typeof context>(s4, function (v) {
  console.log('context', this);
  return v > 3;
}, context);
console.log(p4);