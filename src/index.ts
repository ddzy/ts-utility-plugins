import { get } from "./ddzy/utility/object/get";

// ? 空对象
const s1 = {
  origin: {},
  path: 'a.b.c',
};
const p1 = get(s1.origin, s1.path);
console.log(p1);

console.log('-----------------------');

// ? 空对象 + 默认值
const s2 = {
  origin: {},
  path: 'a[0].b[1].c',
};
const p2 = get(s2.origin, s2.path, 'default');
console.log(p2);

console.log('------------------------------');

// ? path为字符串
const s3 = {
  origin: {
    a: [
      {
        b: {
          c: 3
        }
      }
    ]
  },
  path: 'a[0].b.c',
};
const p3 = get(s3.origin, s3.path);
console.log(p3);

console.log('------------------------------');

// ? path为数组
const s4 = {
  origin: [
    {
      a: [
        {
          b: 1998,
        },
      ],
    },
  ],
  path: ['0', 'a', '0', 'b'],
};
const p4 = get(s4.origin, s4.path);
console.log(p4);