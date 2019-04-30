export interface IUtilityNumberProps {
  getRadian(angle: number): number;
  getFullRandom(min: number, max: number): number,
  getAnyRandom(min: number, max: number): number;
};

const utilityNumber: IUtilityNumberProps = {

  /**
   * 获取指定范围内的随机整数
   * @param min 小边界
   * @param max 大边界
   */
  getFullRandom(min, max) {
    return ~~(Math.random() * (max - min) + min);
  },

  /**
   * 获取指定范围内的随机任意数
   * @param min 小边界
   * @param max 大边界
   */
  getAnyRandom(min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * 角度转弧度
   * @param angle 角度值
   */
  getRadian(angle) {
    return (Math.PI / 180) * angle;
  },

};


export default utilityNumber;