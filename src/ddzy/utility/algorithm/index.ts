import {
  BinarySearchTree as BST,
} from './binary-search-tree/index';
import {
  DoubleLinkedCircularList as DLCL
} from './double-linked-circular-list/index';
import {
  EventEmitter,
} from './event-emitter';


export interface IUtilityAlgorithmProps {
  BST: typeof BST;
  DLCL: typeof DLCL;
  EventEmitter: typeof EventEmitter;
};

const utilityAlgorithm: IUtilityAlgorithmProps = {
  // ? 二叉搜索树
  BST,
  // ? 双向循环链表
  DLCL,
  // ? EventEmitter
  EventEmitter,
};


export default utilityAlgorithm;