import { isUndefined } from "../../others/isUndefined";

/**
 * @name zip
 * @author ddzy<alioeduan@foxmail.com>
 * @since 2019/12/20
 * @description 创建一个分组元素的数组, 数组的第一个元素包含所有给定数组的第一个元素, 数组的第二个元素包含所有给定数组的第二个元素, 以此类推. 打包后的数组的长度等于源二维数组的最大长度的项
 * @param args 任意数量的数组
 */
export function zip<I>(...args: I[][]): I[][] {
  const result: typeof args = [];

  // 寻找最大的元素长度
  let maxLength = 0;
  args.forEach((v) => {
    maxLength = Math.max(v.length, maxLength);
  });

  let count = 0;
  let temp: I[] = [];
  while (count < maxLength) {
    args.forEach((v) => {
      !isUndefined(v[count]) && (temp.push(v[count]));
    });

    count++;
    result.push(temp);
    temp = [];
  }

  return result;
}