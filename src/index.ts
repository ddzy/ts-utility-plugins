import utilityOthers from "./ddzy/utility/others";

const result = utilityOthers.convertURLParameterToObject(
  'https://github.com/ddzy?username=duan&age=20&token=kslgjadg',
);

const result2 = utilityOthers.convertURLParameterToObject(
  'https://github.com/ddzy??username=duan&&age=20',
);

const result3 = utilityOthers.convertURLParameterToObject(
  'https://github.com/ddzy/username=duan?age=20&token=askndg',
);

const result4 = utilityOthers.convertURLParameterToObject(
  'https://github.com/ddzy&username=duan?age=20?token=askndg',
);

console.log(result);
console.log(result2);
console.log(result3);
console.log(result4);