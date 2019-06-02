import {
  BinarySearchTree as BST,
} from './binary-search-tree/index';


export interface IUtilityAlgorithmProps {
  BST: typeof BST;
};

const utilityAlgorithm: IUtilityAlgorithmProps = {
  // ? 二叉搜索树
  BST,
};


export default utilityAlgorithm;