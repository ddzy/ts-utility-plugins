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

  }

}

console.log(lodash._Array.chunk([1, 2, 3, 4], 1));