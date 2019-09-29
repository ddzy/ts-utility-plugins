import { dropRightWhile } from "./ddzy/utility/array/dropRightWhile";

// ? 空数组
const s1: number[] = [];
const p1 = dropRightWhile<number>(s1, function (v) {
  return !!v;
});
console.log(p1);

// ? 普通数字数组
const s2: number[] = [23, 34, -1, -5, 54, 22, 0];
const p2 = dropRightWhile<number>(s2, function (v) {
  return v < 0;
});
console.log(p2);

// ? 普通键值对对象数组
interface IS3Params {
  name: string;
  age: number;
};
const s3: IS3Params[] = [
  { name: 'duan', age: 20 },
  { name: 'zhao', age: 30 },
  { name: 'yang', age: 40 },
];
const p3 = dropRightWhile<IS3Params>(s3, function (v) {
  return v.age === 30;
});
console.log(p3);