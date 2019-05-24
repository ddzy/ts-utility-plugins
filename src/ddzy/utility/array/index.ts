export interface IUtilityArrayProps {
  isStrictArray(origin: any): boolean;
  toFlatArrayOutPlace(origin: any[]): any[];
};


const utilityArray: IUtilityArrayProps = {
  /**
   * 判断是否严格的数组
   * @param origin 目标值
   */
  isStrictArray(origin) {
    return Array.isArray(origin);
  },

  /**
   * 数组扁平化(非原地算法)
   * @param origin 源数组
   * @returns {*} 处理后的源数组
   */
  toFlatArrayOutPlace(origin) {
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
  },
};

export default utilityArray;