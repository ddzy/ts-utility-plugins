import utilityFunction from "./ddzy/utility/function";

const result1 = utilityFunction.getParamNames(
  function (...args: any[]) { },
);
const result2 = utilityFunction.getParamNames(
  function func(name,age) {},
);
const result3 = utilityFunction.getParamNames(
  function func(name, age, address, ...args) {},
);

console.log(result1);
console.log(result2);
console.log(result3);