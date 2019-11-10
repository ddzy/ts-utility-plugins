import { curry } from "./ddzy/utility/function/curry";


//
const s1 = function (a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}
const p1 = curry(s1);
console.log(p1(1)(2, 3)(4));
console.log(p1(1, 2, 3, 4));
console.log(p1(1)(2, 3, 4));