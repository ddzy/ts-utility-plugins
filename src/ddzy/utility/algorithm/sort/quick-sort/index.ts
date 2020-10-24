/**
 * 快速排序(递归)
 * @param arr 待排序数组
 */
export default function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  // 保存比基准值小的数
  const left: number[] = [];
  // 保存比基准值大的数
  const right: number[] = [];
  const middleVal = (arr.splice(~~(arr.length / 2), 1))[0];

  for (let i = 0; i < arr.length; i++) {
    arr[i] < middleVal
      ? left.push(arr[i])
      : right.push(arr[i]);
  }

  return quickSort(left).concat([middleVal], quickSort(right));
}