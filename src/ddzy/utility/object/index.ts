export interface IUtilityObjectProps {
  isPlainObject(origin: any): boolean;
};


const utilityObject: IUtilityObjectProps = {
  /**
   * 判断是否普通的对象
   * @param origin 目标值
   */
  isPlainObject(origin) {
    return origin && (
      ({}).toString.call(origin) === '[object Object]'
    );
  },
};

export default utilityObject;