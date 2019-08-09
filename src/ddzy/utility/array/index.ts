/**
 * @description 数组有关的工具函数
 * @author ddzy
 * @since 2019/6/23
 */


import utilityOthers from "../others";

export interface IUtilityArrayProps {
  isStrictArray(origin: any): boolean;
  toFlatArrayOutPlace(origin: any[]): any[];
  toStrictArray<T>(origin: ArrayLike<T>): T[];
  trunk<I>(origin: I[], size?: number): I[][];
};


const utilityArray: IUtilityArrayProps = {
  /**
   * 判断是否严格的数组
   * @param origin 目标值
   */
  isStrictArray(origin) {
    if (Array.isArray(origin)) {
      return Array.isArray(origin);
    } else {
      // basic value
      if (utilityOthers.isBasicValue(origin)) {
        return false;
      } else if(typeof origin === 'object') {
        if (origin.length) {
          // array like
          return Object.toString.call(() => origin) === '[object Array]';
        } else {
          return false;
        }
      }
      return false;
    }
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

  /**
   * 将给定的类数组转化为严格的数组(非原地)
   * @param origin 需要转化的类数组对象
   */
  toStrictArray<T>(origin: ArrayLike<T>): T[] {
    const result: T[] = [];

    if (utilityOthers.isBasicValue(origin)) {
      return result;
    } else {
      for (let i = 0, every; every = origin[i++];) {
        result.push(every);
      }
    }

    return result;
  },

  /**
   * 将源数组根据指定大小分片
   * @param origin 源数组
   * @param size 分片大小
   */
  trunk<I>(origin: I[], size = 1) {
    const result: I[][] = [];
    let count = 0;

    do {
      result.push(origin.slice(count, count + size));
    } while ((count += size) < origin.length - 1);

    return result;
  },
};

export default utilityArray;