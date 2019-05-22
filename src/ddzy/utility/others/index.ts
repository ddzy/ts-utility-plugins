import utilityObject from '../object/index';
import utilityArray from '../array/index';

export interface IUtilityOthersProps {
  isBasicValue: (origin: any) => boolean;

  invariant: (condition: boolean, message: string) => void;
  convertHumpToHyphen: (hump: string) => string;

  deepClone: <T extends object>(origin: T) => Partial<T>;
};


const utilityOthers: IUtilityOthersProps = {
  /**
   * 自定义异常处理
   * @param condition 判断条件
   * @param message 错误信息
   */
  invariant(condition, message) {
    if (condition) {
      throw new TypeError(
        `Ddzy's plugin error: ${message}`
      );
    }
  },

  /**
   * 驼峰字符串转连字符
   * @param hump 驼峰形式字符串
   */
  convertHumpToHyphen(hump) {
    const reg: RegExp = /[A-Z]+/;

    return hump.replace(reg, (matched) => {
      return `-${matched.toLowerCase()}`;
    });
  },

  /**
   * 判断是否基础类型的值(null、undefined、number...)
   * @param origin 任意值
   */
  isBasicValue(origin) {
    return typeof origin === 'string'
      || typeof origin === 'number'
      || typeof origin === 'undefined'
      || typeof origin === 'symbol'
      || origin == undefined
  },

  deepClone(origin) {
    const target = {};

    function _aidedDeepClone(origin: any, target: any): object {
      for (const outerKey in origin) {
        const outerValue = origin[outerKey];

        if (utilityObject.isPlainObject(outerValue)) {
          target[outerKey] = {};
          _aidedDeepClone(outerValue, target);
        }

        if (utilityArray.isStrictArray(outerValue)) {
          target[outerKey] = [];

          for (const [arrIndex, arrValue] of outerValue.entries()) {
            if (utilityObject.isPlainObject( arrValue )) {
              _aidedDeepClone(arrValue, target);
            } else {
              target[outerKey][arrIndex] = arrValue;
            }
          }
        }

        if (utilityOthers.isBasicValue(outerValue)) {
          target[outerKey] = outerValue;
        }
      }

      return target;
    }

    return _aidedDeepClone(origin, target);
  },
};

export default utilityOthers;