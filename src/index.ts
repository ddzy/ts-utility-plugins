import utilityAlgorithm from "./ddzy/utility/algorithm";

const dlcl = new utilityAlgorithm.DLCL<number>({
  nodes: [2, 5, 8, 3, 7, 19, 23, 14, 41],
});

// ? handleGetHead
// console.log(dlcl.handleGetHead());

// ? handleGetTail
// console.log(dlcl.handleGetTail());

// ? handleAppend
// console.log(dlcl.handleGetTail());
// dlcl.handleAppend(-1).handleAppend(-2);
// console.log(dlcl.handleGetTail());

// ? handlePrepend
console.log(dlcl.handleGetHead());
dlcl.handlePrepend(-1).handlePrepend(-2);
console.log(dlcl.handleGetHead());