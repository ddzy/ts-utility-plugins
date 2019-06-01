import utilityNumber from "../number";

export interface IUtilityStringProps {
  getRandomStr(origin?: string[], length?: number, enableSpecialCharacter?: boolean): string,
};

const utilityString: IUtilityStringProps = {
  /**
   * 获取随机的乱序字符串
   * @param origin 需要乱序的源字符串数组
   * @param length 乱序后的字符串长度
   * @param enableSpecialCharacter 是否允许出现特殊字符
   * @returns {string} 乱序字符串
   */
  getRandomStr(origin, length = 16, enableSpecialCharacter = true): string {
    if ( !origin || origin.length === 0 ) {
      origin = [];
      for (let i = 97; i <= 122; i++) {
        origin.push(String.fromCharCode(i));
      }
      for (let i = 65; i <= 90; i++) {
        origin.push(String.fromCharCode(i));
      }
      for (let i = 48; i <= 57; i++) {
        origin.push(String.fromCharCode(i));
      }
      enableSpecialCharacter && (origin.push('_', '-', '&', '$', '@', '^'));
    }

    const OPTIONS = {
      origin,
      length,
    };
    let result = '';

    let i = 0;
    do {
      result += OPTIONS.origin[utilityNumber.getFullRandom(0, OPTIONS.origin.length)];
    } while ((i ++) < OPTIONS.length - 1);

    return result;
  },
};


export default utilityString;