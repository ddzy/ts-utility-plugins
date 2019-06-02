import utilityAlgorithm from "./ddzy/utility/algorithm";

const bst = new utilityAlgorithm.BST({
  nodes: [2, 5, 3, 8, 7, 4, 9, 12, 23],
});

bst.handleInsert(1).handleInsert(-5).handleInsert(-2);