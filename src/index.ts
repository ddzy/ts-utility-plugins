import utilityAlgorithm from "./ddzy/utility/algorithm";

const usp = new utilityAlgorithm.URLSearchParams({});

// ? handleAppend
// usp.handleAppend('skill', 'programmer');
// usp.handleAppend('name', 'duan');

// ? handleDelete
// usp.handleDelete('age');
usp.handleDelete('name');
// usp.handleDelete('isSelf');

console.log(usp);