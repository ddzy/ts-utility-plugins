import utilityObject from '../object/index';
import utilityArray from '../array/index';

export interface IUtilityOthersProps {
  isBasicValue: (origin: any) => boolean;
  isNull: (origin: any) => boolean;
  isUndefined: (origin: any) => boolean;

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
      || typeof origin === 'boolean'
      || origin == undefined
  },

  /**
   * 判断是否undefined
   * @param origin 任意值
   */
  isUndefined(origin) {
    return typeof origin === 'undefined';
  },

  /**
   * 判断是否为null
   * @param origin 任意值
   */
  isNull(origin) {
    return !(utilityOthers.isUndefined(origin))
      && origin == undefined;
  },

  /**
   * 深拷贝
   * @param origin 源对象
   */
  deepClone(origin) {
    const target = {};

    function _aidedDeepClone(origin: any, target: any): object {
      for (const key in origin) {
        const value = origin[key];

        // ? plain object
        if (utilityObject.isPlainObject(value)) {
          target[key] = {};
          _aidedDeepClone(value, target[key]);
        }
        // ? array
        else if (utilityArray.isStrictArray(value)) {
          target[key] = [];
          for (let i = 0; i < value.length; i++) {
            // ? array that contains a plain object
            if (utilityObject.isPlainObject(value[i])) {
              target[key][i] = {};
              _aidedDeepClone(value[i], target[key][i]);
            }
            // TODO: ignore the array that contains more that one nest
            // ? array that contains the basic value;
            else {
              target[key][i] = value[i];
            }
          }
        }
        // ? basic value
        else if (utilityOthers.isBasicValue(value)) {
          target[key] = value;
        }

        // TODO: function...
      }

      return target;
    }

    return _aidedDeepClone(origin, target);
  },
};

export default utilityOthers;