import utilityAlgorithm from "./ddzy/utility/algorithm";

const bst = new utilityAlgorithm.BST({
  nodes: [2, 5, 3, 8, 7, 4, 9, 12, 23, 1, 6, 10],
});

// bst.handleInsert(1).handleInsert(-5).handleInsert(-2);
// bst.handleRemove(8);
// bst.print();
// bst.handleRemove(23).handleInsert(23);
// bst.print();
// console.log(bst.handleGetDepth());
// console.log(bst.handleGetDepth(4));

// console.log(bst.handleGetDepth(23));
// console.log(bst.handleGetDepth(9));
// console.log(bst.handleGetDepth(7));
// console.log(bst.handleGetDepth(2));
// console.log(bst.handleGetDepth(-1));

// console.log(bst.handleHasValue(23));
// console.log(bst.handleHasValue(6));
// console.log(bst.handleHasValue(7));
// console.log(bst.handleHasValue(2));


bst.handleFrontOrderTraversal((node) => {
  console.log(node);
});
console.log('-----------------');
bst.handleMiddleOrderTraversal((node) => {
  console.log(node);
});
console.log('-----------------');
bst.handlBackOrderTraversal((node) => {
  console.log(node);
});