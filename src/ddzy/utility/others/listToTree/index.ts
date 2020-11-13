export interface IList {
  id: number,
  value: any,
  parent: number,
  children?: IList[],
};

/**
 * 将列表数据转化为树结构
 * @param list 需要转换的列表数据
 */
export default function listToTree(list: IList[]): IList[] {
  list = list.slice();

  list.forEach((outerV) => {
    if (outerV.parent !== 0) {
      list.forEach((innerV) => {
        if (innerV.id === outerV.parent) {
          if (!innerV.children) {
            innerV.children = [];
          }
          innerV.children.push(outerV);
        }
      });
    }
  });

  return list.filter((v) => v.parent === 0);
}