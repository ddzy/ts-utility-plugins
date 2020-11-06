/**
 * 二分查找
 * @param arr 源列表
 * @param value 查找的值
 * @returns 找到则返回索引, 否则返回 -1
 */
export default function binarySearch(arr: number[], value: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = ~~((left + right) / 2);

    if (arr[middle] === value) {
      return middle;
    } else if (arr[middle] < value) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}