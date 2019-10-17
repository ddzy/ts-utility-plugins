/**
 * 将数字按千位分隔
 * @param origin 源数字
 * @param separator 分隔符
 * @example
 * // 110
 * divideByThousand(110);
 * @example
 * // 11,000
 * divideByThousand(11000)
 */
export function divideByThousand(
  origin: number,
  separator?: string,
) {
  const regContinuousInterger = /(\d{3})(?=\d+)/g;
  const sNewSeparator = separator || ',';
  let sNewOrigin = ('' + origin).split('').reverse().join('');

  sNewOrigin = sNewOrigin.replace(regContinuousInterger, (_, $1) => {
    return `${$1}${sNewSeparator}`;
  });

  return sNewOrigin.split('').reverse().join('');
}