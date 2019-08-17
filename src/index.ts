import utilityFunction from "./ddzy/utility/function";

const delay = utilityFunction.delay


// ? wait毫秒后正常执行callback
function s1() {
  console.log('has been fired');
}
delay(s1, 500);

console.log('--------------------');

// ? 正常接收所传递的参数
function s2(name: string, age: number) {
  console.log(`name: ${name}; age: ${age}`);
}
delay(s2, 1000, 'ddzy', 21);

console.log('--------------------------');

// ? 正常返回延时器的id
function s3() {
  console.log('has been fired');
}
const p3 = delay(s3, 1500);
console.log(p3);