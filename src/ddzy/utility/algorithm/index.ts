import {
  BinarySearchTree as BST,
} from './binary-search-tree/index';
import {
  DoubleLinkedCircularList as DLCL
} from './double-linked-circular-list/index';
import {
  EventEmitter,
} from './event-emitter';
import {
  URLSearchParams,
} from './url-search-params';


export interface IUtilityAlgorithmProps {
  BST: typeof BST;
  DLCL: typeof DLCL;
  EventEmitter: typeof EventEmitter;
  URLSearchParams: typeof URLSearchParams;
};

const utilityAlgorithm: IUtilityAlgorithmProps = {
  // ? 二叉搜索树
  BST,
  // ? 双向循环链表
  DLCL,
  // ? EventEmitter
  EventEmitter,
  URLSearchParams,
};


export default utilityAlgorithm;