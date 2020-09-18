/**
 * 创建一个数组切片，从 arr 数组的起始元素开始提取 amount 个元素
 * @param arr 原数组
 * @param amount 切片的元素个数
 * [1, 2, 3, 4, 5, 6, 7]
 */
export default function take<I>(arr: I[], amount: number): I[] {
  const result = [];
  let count = 0;

  do {
    arr[count] && amount > 0 && result.push(arr[count]);
  } while ((count++ < amount - 1));

  return result;
}