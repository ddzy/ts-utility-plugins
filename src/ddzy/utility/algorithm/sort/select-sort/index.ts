/**
 * 选择排序
 * @param arr 源数组
 */
export default function selectSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    // 最小值的索引
    let sign = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[sign]) {
        sign = j;
      }
    }
    [arr[i], arr[sign]] = [arr[sign], arr[i]];
  }

  return arr;
}