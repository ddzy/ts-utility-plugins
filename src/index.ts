import { forIn } from "./ddzy/utility/object/forIn";

// ? 空对象
interface IS1Props {
};
const s1 = {
};
forIn<IS1Props>(s1, (v, i, self) => {
  console.log(v, i, self);
});

console.log('------------------------');

// ? 不应该提前退出
interface IS2Props {
  name: string,
  age: number,
  skill: string,
};
const s2: IS2Props = {
  name: 'duanzhaoyang',
  age: 21,
  skill: 'program',
};
forIn(s2, (v) => {
  console.log(v);
});

console.log('------------------------------');

// ? 提前退出
interface IS3Props {
  city: string[];
  position: {
    x: number,
    y: number,
  };
  continue: boolean;
  nextOne: number;
  nextTwo: number;
};
const s3: IS3Props = {
  city: ['Dongguan', 'Foshan', 'Guangzhou'],
  position: {
    x: 100,
    y: 200,
  },
  continue: false,
  nextOne: 1,
  nextTwo: 2,
};
forIn<IS3Props>(s3, function (v, i, origin) {
  console.log({
    this: this,
    thisIsEqual: this === origin,
    v,
    i,
  });

  if (i === 'continue') {
    return false;
  }
});