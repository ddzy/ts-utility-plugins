import utilityFunction from "./ddzy/utility/function";

const pipe = utilityFunction.pipe;


// ?
function func1() {
  return 2;
}
function func2() {
  return func1() * 3;
}
function func3() {
  return func2() * 4;
}
const p1 = pipe(func1, func2, func3);
console.log(p1); // 24

console.log('--------------------');

// ?
function func4() {
  return 'duan'
}
function func5() {
  return func4() + '*' + 'zhao';
}
function func6() {
  return func5() + '*' + 'yang';
}
const p2 = pipe(func4, func5, func6);
console.log(p2); // yang*zhao*duan