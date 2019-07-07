import utilityAlgorithm from "./ddzy/utility/algorithm";
import './qiqf/utility/test/test-array'

const _map = utilityAlgorithm.ES6Achieve._map;

const s1 = [1, 2, 3];
const p1 = _map<number, number>(s1, (v) => {
  return v ** v;
});
console.log(p1);


console.log('--------------------')


interface Io2 {
  name: string,
  age: number,
};
const o2: Io2 = {
  name: 'ddzy',
  age: 21,
}
const s2 = ['', 'd', 'dd', 'ddz', 'ddzy'];
const p2 = _map<string, string, Io2>(s2, (v, _i, _this) => {
  console.log(_this);
  return v + ' 980808';
}, o2);
console.log(p2);


console.log('--------------------')


interface IP3Pair {
  uuid: number,
  age: number,
};
const s3 = [
  { uuid: 1, age: 10 },
  { uuid: 2, age: 20 },
  { uuid: 3, age: 30 },
]
const p3 = _map<IP3Pair, IP3Pair>(s3, (v) => {
  return {
    uuid: v.uuid,
    age: v.age + 100,
  };
});
p3.push({ uuid: 4, age: 140 });
console.log(p3);
console.log(s3);
