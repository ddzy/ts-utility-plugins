/**
 * @name: business-simple-lodash 类lodash库
 * @author: yyg
 * @version 1.0.0
 */


namespace lodash {

  export namespace _Utils {
    export function _isArray(obj: any): boolean {
      return Array.isArray(obj);
    }
  }

  export namespace _Array {
    /**
     * 创建一个元素数组，将元素分成大小的长度。如果数组无法均匀分割，
     * 则最终的块将是剩余的元素。
     * @param arr 数组
     * @param size 分成的块
     * @returns 新的数组
     */
    export function chunk(arr: any[], size: number = 1): any[] {
      if (!_Utils._isArray(arr) || arr.length === 0) {
        return [];
      }
      const newArr: any[] = [];
      let i: number = -1;

      while (++i < arr.length) {
        i % size === 0
          && newArr.push(arr.slice(i, i + size));
      }

      return newArr;
    }

    /**
     * 创建一个删除了所有'false'值的数组
     * @param arr 数组
     */
    export function compact(arr: any[]) {
      return arr.filter((v: any) => v);
    }

    /**
     * 使用任何其他数组和/或值创建一个新数组连接数组。
     * @param arr 源数组
     * @param args concatenate值
     */
    export function concat(arr: any[], ...args: any[]): any[] {
      return arr.concat(...args);
    }
  }

}

// console.log(lodash._Array.chunk([1, 2, 3, 4], 1));
// console.log(lodash._Array.compact([false, undefined, null, NaN]))
console.log(lodash._Array.concat([2], false, {name: 'duan'}, [2]));
