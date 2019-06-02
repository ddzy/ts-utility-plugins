export interface ITreeNodeProps {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
  parent?: TreeNode | null;
};


export class TreeNode {
  public constructor(
    props: ITreeNodeProps,
  ) {
    this.value = props.value;
    this.left = props.left ? props.left : null;
    this.right = props.right ? props.right : null;
    this.parent = props.parent ? props.parent : null;
  }

  public readonly value: number;
  public left: TreeNode | null;
  public right: TreeNode | null;
  public parent: TreeNode | null;
}