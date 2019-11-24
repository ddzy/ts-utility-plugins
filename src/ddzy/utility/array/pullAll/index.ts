/**
 * 移除数组 arr 中所有和给定值相等的元素, 原地操作
 * @param arr 源数组
 * @param selector 需要剔除的元素数组
 */
export function pullAll<I>(
  arr: I[],
  selector: I[],
): typeof arr {
  selector.forEach((v) => {
    let position = arr.indexOf(v);

    while (position !== -1) {
      arr.splice(position, 1);
      position = arr.indexOf(v);
    }
  });

  return arr;
}