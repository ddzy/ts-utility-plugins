import utilityAlgorithm from "./ddzy/utility/algorithm";

const usp = new utilityAlgorithm.URLSearchParams({});

// ? handleAppend
// usp.handleAppend('skill', 'programmer');
// usp.handleAppend('name', 'duan');

// ? handleDelete
// usp.handleDelete('age');
// usp.handleDelete('name');
// usp.handleDelete('isSelf');

// ? handleGet
// const u1 = usp.handleGet('');
// const u2 = usp.handleGet('name');
// const u3 = usp.handleGet('skill');
// const u4 = usp.handleGet('age');
// console.log({
//   u1,
//   u2,
//   u3,
//   u4,
// });

// ? handleGetAll
// const u1 = usp.handleGetAll();
// console.log(u1);

// ? handleHas
const u1 = usp.handleHas('name');
const u2 = usp.handleHas('skill');
const u3 = usp.handleHas('');
console.log({
  u1,
  u2,
  u3,
});

// console.log(usp.state);