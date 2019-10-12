import { inRange } from "./ddzy/utility/number/inRange";


// ?
const s1 = [
  {
    value: 0,
    start: 100,
    end: 200,
  },
  {
    value: 45,
    start: -11,
    end: 98,
  },
  {
    value: 34,
    start: 34,
    end: 34,
  },
  {
    value: 0,
    start: -344,
    end: 0,
  },
];
s1.forEach((v) => {
  const result = inRange(v.value, v.start, v.end);

  console.log(result);
});