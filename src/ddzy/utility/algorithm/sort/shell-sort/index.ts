/**
 * 希尔排序(缩小增量)
 * @param arr 源数组
 */
export default function shellSort(arr: number[]): number[] {
  let sign = ~~(arr.length / 2);

  while (sign >= 1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + sign; j >= 0; j -= sign) {
        if (arr[j] < arr[j - 1]) {
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        }
      }
    }

    sign = ~~(sign / 2);
  }

  return arr;
}