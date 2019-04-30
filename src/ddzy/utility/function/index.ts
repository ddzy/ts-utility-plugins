export interface IUtilityFunctionProps {
  isFunction(el: any): boolean;
}

const utilityFunction: IUtilityFunctionProps = {

  /**
   * 检查是否函数
   * @param ele 任意值
   */
  isFunction(ele) {
    return typeof ele === 'function';
  },

};


export default utilityFunction;