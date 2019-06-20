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
import {
  ES6Achieve,
} from './es6-achieve/index';


export interface IUtilityAlgorithmProps {
  BST: typeof BST;
  DLCL: typeof DLCL;
  EventEmitter: typeof EventEmitter;
  URLSearchParams: typeof URLSearchParams;
  ES6Achieve: typeof ES6Achieve;
};

const utilityAlgorithm: IUtilityAlgorithmProps = {
  // ? 二叉搜索树
  BST,
  // ? 双向循环链表
  DLCL,
  // ? EventEmitter
  EventEmitter,
  // ? URLSearchParams
  URLSearchParams,
  // ? 模拟实现es6的API
  ES6Achieve,
};


export default utilityAlgorithm;