import utilityAlgorithm from "./ddzy/utility/algorithm";

const _startsWith = utilityAlgorithm.ES6Achieve._startsWith;


const s1 = 'ddzy'
const p1 = _startsWith(s1, 'd');
console.log(p1);

const p2 = _startsWith(s1, 'yang');
console.log(p2);

const p3 = _startsWith(s1, 'ddz', 1);
console.log(p3);

const p4 = _startsWith(s1, 'ddzyy', 0);
console.log(p4);