import { Dictionary } from "./ddzy/utility/algorithm/es6-achieve/dictionary";


const map = new Dictionary();

const arr1 = [1, 2, 3];
const obj1 = {};
const func1 = function () { };

// ! 添加
map.set(arr1, 123);
map.set(obj1, '123323');
map.set(arr1, 456);
map.set(obj1, '23235235235');
map.set({ name: 'duan', age: 21 }, []);
map.set(func1, func1);
map.set(func1, 'it is function');
map.set(1, 2);
map.set({ name: 'duan', age: 21 }, []);

// ! 获取
// console.log(map.get(arr1));
// console.log(map.get(obj1));
// console.log(map.get({ name: 'duan', age: 21 }));
// console.log(map.get(func1));
// console.log(map.get(1));

// ! 移除
// console.log(map.delete(arr1));
// console.log(map.delete(obj1));
// console.log(map.delete({ name: 'duan', age: 21 }));
// console.log(map.delete(1));
// console.log(map);

// ! 元素个数
// console.log(map.size());

// ! 遍历
// map.traversal(function(value, key) {
//   console.log({ key, value });
// });