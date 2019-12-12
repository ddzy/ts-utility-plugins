import { forOwn } from "./ddzy/utility/object/forOwn";


// ? 普通键值对对象
const s1 = {
  name: 'duanzhaoyang',
  age: 21,
  address: 'Dongguan',
};
forOwn<typeof s1>(s1, (i, v, o) => {
  console.log({ i, v, o });
});

console.log('----------------------分割线------------------------');

// ? 具有继承属性
class S2 {
  public name: string = '';
  public age: number = 0;
}
S2.prototype.isCorrect = false;

forOwn(new S2(), (i, v, o) => {
  console.log({ i, v, o });
});