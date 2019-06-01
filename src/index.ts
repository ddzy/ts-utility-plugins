import utilityString from "./ddzy/utility/string";

const result1 = utilityString.getRandomStr();
const result2 = utilityString.getRandomStr([]);
const result3 = utilityString.getRandomStr(
  ['a', 'b', 'c', '1', '2', '3', '_', '-'],
  8,
);
const result4 = utilityString.getRandomStr(
  undefined,
  undefined,
  false,
);
const result5 = utilityString.getRandomStr(
  undefined,
  undefined,
  true,
);


console.log(result1)
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);