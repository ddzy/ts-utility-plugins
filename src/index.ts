import { _instanceOf } from "./ddzy/utility/others/_instanceOf";

// ? true
const s1 = [{}, Object];
const p1 = _instanceOf((s1[0]), s1[1]);
console.log(p1);

// ? true
const s2 = [[], Array];
const p2 = _instanceOf(s2[0], s2[1]);
console.log(p2);

// ? true
const s3 = [[], Object];
const p3 = _instanceOf(s3[0], s3[1]);
console.log(p3);

// ? false
const s4 = [2, 8];
const p4 = _instanceOf(s4[0], s4[1]);
console.log(p4);

// ? false
const s5 = ['ddzy', {}];
const p5 = _instanceOf(s5[0], s5[1]);
console.log(p5);

// ? false
const s6 = [{}, null];
const p6 = _instanceOf(s6[0], s6[1]);
console.log(p6);

// ? true
interface PersonConstructor {
  new (): PersonInterface;
};
interface PersonInterface {
};

class Person implements PersonInterface {
  constructor() {
  }
}
const s7 = [new Person(), Person];
const p7 = _instanceOf(s7[0], s7[1]);
console.log(p7);