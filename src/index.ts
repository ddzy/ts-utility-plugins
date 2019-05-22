import utilityOthers from './ddzy/utility/others/index';


const origin = {
  name: 'duan',
  age: 20,
  skills: ['run', 'programm', 'read'],
  friends: [
    {
      name: 'jack',
      age: 21,
    },
    {
      name: 'lucy',
      age: 22,
    },
  ],
  program: {
    deepth: 40,
    related: {
      website: [
        {
          name: 'juejin',
          address: 'https://juejin.io/timeline',
        },
        {
          name: 'zhihu',
          address: 'https://zhihu.com'
        },
      ],
    },
  },
  focus: true,
};

const result = utilityOthers.deepClone(origin);

console.log(result);

console.log('---');

origin.program.deepth = 10;
origin.program.related.website[0].name = 'frrrr'
origin.skills[0] = 'what?';
origin.program.related.website = [];

console.log(origin);
console.log(result);