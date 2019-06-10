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
// console.log(dlcl.handleGetHead());
// dlcl.handlePrepend(-1).handlePrepend(-2);
// console.log(dlcl.handleGetHead());

// ? handleInsertBefore
// dlcl.handleInsertBefore(8, 100);
// dlcl.handleInsertBefore(2, 100);
// dlcl.handleInsertBefore(41, 100);
// console.log(dlcl.handleGetHead());
// console.log(dlcl.handleGetTail());

// ? handleInsertAfter
// dlcl.handleInsertAfter(41, 200);
// console.log(dlcl.handleGetTail());
// dlcl.handleInsertAfter(8, 200);
// console.log(dlcl.handleGetHead());

// ? handleTraversalWithForward
// dlcl.handleTraversalWithForward((node) => {
//   console.log(node);
// });

// ? handleTraversalWithBackward
// dlcl.handleTraversalWithBackward((node) => {
//   console.log(node);
// });

// ? handleGetLength
// dlcl.handleAppend(100).handleAppend(200);
// dlcl.handlePrepend(100).handlePrepend(200);
// dlcl.handleInsertBefore(2, 100).handleInsertBefore(100, 200);
dlcl.handleInsertAfter(41, 100);
console.log(dlcl.handleGetLength());