import create from "./ddzy/utility/object/create";


const s1 = {
  name: 'duanzhaoyang',
  age: 22,
};
const p1 = create(s1, {});
console.log(p1);

const s2 = {};
const p2 = create(s2, {
  skill: 'running',
});
console.log(p2);

const s3 = null;
const p3 = create(s3, {});
console.log(p3);

const s4 = null;
const p4 = create(s4, {
  a: 1,
  b: 2,
})
console.log(p4);