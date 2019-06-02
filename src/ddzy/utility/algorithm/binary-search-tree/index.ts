import {
  TreeNode,
} from './tree-node/index';


export interface IBinarySearchTreeProps {
  nodes: number[];
};
export interface IBinarySearchTreeState {
  root: TreeNode | null;
  parent: TreeNode | null;
};


export class BinarySearchTree {
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
    parent: null,
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

    this.print();
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
          node.parent = this.state.parent;
          this.state.parent = node;
        }
        else {
          this.state.parent = node;
          this._aidedHandleInsert(node.left, newNode);
        }
      }
      else if (node.value < newNode.value) {
        if (!node.right) {
          node.right = newNode;
          node.parent = this.state.parent;
          this.state.parent = node;
        }
        else {
          this.state.parent = node;
          this._aidedHandleInsert(node.right, newNode);
        }
      }
    }
  }

  /**
   * 添加新节点, 入口
   * @param value 节点值
   */
  public handleInsert(
    value: number,
  ): void {
    const { state } = this;
    const newNode = new TreeNode({
      value,
    });

    this._aidedHandleInsert(state.root, newNode);
  }


  public print(): void {
    console.log(this.state.root);
  }
};