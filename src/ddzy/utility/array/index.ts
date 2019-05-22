export interface IUtilityArrayProps {
  isStrictArray(origin: any): boolean;
};


const utilityArray: IUtilityArrayProps = {
  /**
   * 判断是否严格的数组
   * @param origin 目标值
   */
  isStrictArray(origin) {
    return Array.isArray(origin);
  },
};

export default utilityArray;