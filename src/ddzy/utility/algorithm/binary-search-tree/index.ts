import {
  TreeNode,
} from './tree-node/index';
import utilityOthers from '../../others';


export interface IBinarySearchTreeProps {
  nodes: number[];
};
export interface IBinarySearchTreeState {
  root: TreeNode | null;
};


export class BinarySearchTree {

  /**
   * 获取指定节点的高度(height), 通用
   * @param node 指定节点
   */
  private static $getNodeHeight(
    node: TreeNode | null,
  ): number {
    if (!node) {
      return 0
    }
    return Math.max(
      BinarySearchTree.$getNodeHeight(node.left) + 1,
      BinarySearchTree.$getNodeHeight(node.right) + 1,
    );
  }

  public static readonly defaultProps: IBinarySearchTreeProps = {
    nodes: [2, 5, 3, 8, 7, 4, 9, 12, 23],
  };

  public constructor(
    props: IBinarySearchTreeProps,
  ) {
    this.__init__(props);
  }

  public readonly state: IBinarySearchTreeState = {
    root: null,
  };

  private __init__(
    props: IBinarySearchTreeProps,
  ): void {
    this._initProps(props);
    this._initTree();
  }

  private _initProps(
    props: IBinarySearchTreeProps,
  ): void {
    for (const key in props) {
      BinarySearchTree.defaultProps[
        key as keyof typeof BinarySearchTree.defaultProps
      ] = props[
        key as keyof typeof BinarySearchTree.defaultProps
        ];
    }
  }

  private _initTree(): void {
    const { nodes } = BinarySearchTree.defaultProps;

    for (const value of nodes) {
      this.handleInsert(value);
    }
  }

  private _aidedHandleInsert(
    node: TreeNode | null,
    newNode: TreeNode,
  ): void {
    if (!node) {
      // ? 更新根节点
      this.state.root = newNode;
    }
    else {
      if (!newNode.left && !newNode.right) {
        // ? 更新叶子节点的parent
        newNode.parent = node;
      }
      if (node.value > newNode.value) {
        if (!node.left) {
          node.left = newNode;
          newNode.parent = node;
        }
        else {
          this._aidedHandleInsert(node.left, newNode);
        }
      }
      else if (node.value < newNode.value) {
        if (!node.right) {
          node.right = newNode;
          newNode.parent = node;
        }
        else {
          this._aidedHandleInsert(node.right, newNode);
        }
      }
    }
  }

  private _aidedHandleRemove(
    node: TreeNode | null,
    value: number,
  ): void {
    if (!node) {
      return;
    }
    else {
      if (node.value === value) {
        if (node.parent) {
          node.parent.left = node.left;
          node.parent.right = node.right;
          if (node.left) {
            node.left.parent = node.parent
          }
          if (node.right) {
            node.right.parent = node.parent;
          }
        }
      }
      if (node.value > value) {
        this._aidedHandleRemove(node.left, value);
      }
      if (node.value < value) {
        this._aidedHandleRemove(node.right, value);
      }
    }
  }

  private _aidedHandleGetDepth(
    node: TreeNode | null,
    value?: number,
  ): number {
    if (utilityOthers.isUndefined(value)) {
      // TODO: 整棵树的深度
      return BinarySearchTree.$getNodeHeight(node);
    }
    else {
      // TODO: 指定节点的深度
      if (this.handleHasValue(value as number)) {
        let initialDepth = 1;

        this.handleFrontOrderTraversal((currentNode) => {
          if (currentNode.value === value) {
            let n: TreeNode | null = currentNode;
            while ((n = n.parent)) {
              initialDepth++;
            }
          }
        });

        return initialDepth;
      }
      else {
        return 0;
      }
    }
  }

  private _aidedHandleHasValue(
    node: TreeNode | null,
    value: number,
  ): boolean {
    let result = false;

    this._aidedHandleFrontOrderTraversal(node, (currentNode) => {
      if (currentNode.value === value) {
        result = true;
      }
    });

    return result;
  }

  private _aidedHandleFrontOrderTraversal(
    node: TreeNode | null,
    callback: (node: TreeNode) => void,
  ): void {
    if (!node) {
      return;
    }
    else {
      callback(node);
      node.left && (this._aidedHandleFrontOrderTraversal(node.left, callback));
      node.right && (this._aidedHandleFrontOrderTraversal(node.right, callback));
    }
  }

  private _aidedHandleMiddleOrderTraversal(
    node: TreeNode | null,
    callback: (node: TreeNode) => void,
  ): void {
    if (!node) {
      return;
    }
    else {
      node.left && (this._aidedHandleFrontOrderTraversal(node.left, callback));
      callback(node);
      node.right && (this._aidedHandleFrontOrderTraversal(node.right, callback));
    }
  }

  private _aidedHandleBackOrderTraversal(
    node: TreeNode | null,
    callback: (node: TreeNode) => void,
  ): void {
    if (!node) {
      return;
    }
    else {
      node.left && (this._aidedHandleFrontOrderTraversal(node.left, callback));
      node.right && (this._aidedHandleFrontOrderTraversal(node.right, callback));
      callback(node);
    }
  }

  private _aidedHandleGetHeight(
    node: TreeNode | null,
    value?: number,
  ): number {
    if (utilityOthers.isUndefined(value)) {
      // TODO: 整棵树的高度(Depth = Height)
      if (!node) {
        return 0;
      }

      return this.handleGetDepth(value);
    }
    else {
      // TODO: 指定节点的高度
      let initialDepth: number = 1;

      this.handleFrontOrderTraversal((currentNode) => {
        if (currentNode.value === value) {
          initialDepth = BinarySearchTree.$getNodeHeight(currentNode);
        }
      });

      return initialDepth;
    }
  }

  /**
   * 添加新节点, 入口
   * @param value 节点值
   */
  public handleInsert(
    value: number,
  ): BinarySearchTree {
    const { state } = this;
    const newNode = new TreeNode({
      value,
    });

    this._aidedHandleInsert(state.root, newNode);

    return this;
  }

  /**
   * 移除指定节点, 入口
   * @param value 节点值
   */
  public handleRemove(
    value: number,
  ): BinarySearchTree {
    const { state } = this;

    this._aidedHandleRemove(state.root, value);

    return this;
  }

  /**
   * 获取指定节点的深度, 入口
   * @param [value] 节点值, 默认不传则获取整棵树的深度
   */
  public handleGetDepth(
    value?: number
  ): number {
    const { root } = this.state;

    return this._aidedHandleGetDepth(root, value);
  }

  /**
   * 查找二叉树中是否有指定的值, 入口
   * @param value 节点值
   */
  public handleHasValue(
    value: number,
  ): boolean {
    const { root } = this.state;

    return this._aidedHandleHasValue(root, value);
  }

  /**
   * 先序遍历, 入口
   * @param callback 回调
   */
  public handleFrontOrderTraversal(
    callback: (node: TreeNode) => void,
  ): BinarySearchTree {
    const { root } = this.state;

    this._aidedHandleFrontOrderTraversal(root, callback);

    return this;
  }

  /**
   * 中序遍历, 入口
   * @param callback 回调
   */
  public handleMiddleOrderTraversal(
    callback: (node: TreeNode) => void,
  ): void {
    const { root } = this.state;

    this._aidedHandleMiddleOrderTraversal(root, callback);
  }

  /**
   * 后序遍历, 入口
   * @param callback 回调
   */
  public handlBackOrderTraversal(
    callback: (node: TreeNode) => void,
  ): void {
    const { root } = this.state;

    this._aidedHandleBackOrderTraversal(root, callback);
  }

  public handleGetHeight(
    value?: number,
  ): number {
    const { root } = this.state;

    return this._aidedHandleGetHeight(root, value);
  }

  public print(): void {
    // TODO: getDepth √
    // TODO: getHeight √
    // TODO: frontOrderTraversal √
    // TODO: middleOrderTraversal √
    // TODO: backOrderTraversal √
    // TODO: hasValue √
    // TODO: getLeaves
    console.log(this.state.root);
  }
};