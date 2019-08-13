import utilityFunction from "./ddzy/utility/function";

const compose = utilityFunction.compose;


// ?
function func1() {
  return func2() * 2;
}
function func2() {
  return func3() * 3;
}
function func3() {
  return 4;
}
const p1 = compose(func1, func2, func3);
console.log(p1);

console.log('--------------------');

// ?
function func4() {
  return func5() + '*' + 'yang';
}
function func5() {
  return func6() + '*' + 'zhao';
}
function func6() {
  return 'duan';
}
const p2 = compose(func4, func5, func6);
console.log(p2);