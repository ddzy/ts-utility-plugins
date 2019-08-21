/**
 * 数组扁平化(非原地算法)
 * @param origin 源数组
 * @returns {*} 处理后的源数组
 */
export function toFlatArrayOutPlace(origin: any[]) {
  const target: any[] = [];

  function _aidedToFlat(origin: any[], target: any[]) {
    for (const value of origin) {
      utilityArray.isStrictArray(value)
        ? (_aidedToFlat(value, target))
        : (target.push(value));
    }

    return target;
  }

  return _aidedToFlat(origin, target);
}