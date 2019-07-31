import utilityAlgorithm from "./ddzy/utility/algorithm";

const _findIndex = utilityAlgorithm.ES6Achieve._findIndex;


// ? 空数组
const s1: number[] = [];
const p1 = _findIndex<number>(s1, (v) => {
  return v > 0;
});
console.log(p1);

console.log('------------------------');

// ? 数字数组, 未找到
const s2: number[] = [23, 4, 2, 545, -2];
const p2 = _findIndex<number>(s2, (v) => {
  return v > 600;
});
console.log(p2);

console.log('--------------------------');

// ? 数字数组, 找到
const s3: number[] = [1, 2, 3, -2, -4, 0];
const p3 = _findIndex<number>(s3, (v) => {
  return v < 0;
});
console.log(p3);

console.log('---------------------------');

// ? 数字数组, this上下文
const context = {
  secret: 'ddzy',
};
const s4: number[] = [1, 2, 3, 4, 5];
const p4 = _findIndex<number, typeof context>(s4, function (v) {
  console.log(this);

  return v > 3;
}, context);
console.log(p4);