import {
  BinarySearchTree as BST,
} from './binary-search-tree/index';
import {
  DoubleLinkedCircularList as DLCL
} from './double-linked-circular-list/index';


export interface IUtilityAlgorithmProps {
  BST: typeof BST;
  DLCL: typeof DLCL;
};

const utilityAlgorithm: IUtilityAlgorithmProps = {
  // ? 二叉搜索树
  BST,
  // ? 双向循环链表
  DLCL,
};


export default utilityAlgorithm;