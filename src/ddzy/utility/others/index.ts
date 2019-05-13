export interface IUtilityOthersProps {
  invariant: (condition: boolean, message: string) => void;
  convertHumpToHyphen: (hump: string) => string;
};


const utilityOthers: IUtilityOthersProps = {
  /**
   * 自定义异常处理
   * @param condition 判断条件
   * @param message 错误信息
   */
  invariant(condition, message): void {
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
};

export default utilityOthers;