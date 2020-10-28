import deepClone from "./ddzy/utility/others/deepClone";

const origin = {
  a: 1,
  b: [1, 2, 3, 4],
  c: {
    d: 1,
    e: 2,
    f: [
      {
        g: 1,
        h: 2,
      },
      {
        i: 1,
        j: 2,
      },
    ],
  },
};

const target = deepClone(origin);

console.log(origin, target);
console.log(origin === target);

target.b.push(5);
target.c.d = 2;

console.log(origin, target);