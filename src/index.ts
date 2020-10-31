import { ES6Achieve } from "./ddzy/utility/algorithm/es6-achieve/index";

const _Promise = ES6Achieve._Promise;


const p1 = new _Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
});
p1.then((value) => {
  console.log(value);

  return value + 1;
}).then((value) => {
  console.log(value);
});

const p2 = new _Promise((resolve) => {
  resolve(100);
});
p2.then((value) => {
  return value / 5;
}).then((value) => {
  console.log(value);
});