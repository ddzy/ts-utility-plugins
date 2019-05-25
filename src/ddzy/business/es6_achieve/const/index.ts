import utilityOthers from "../../../utility/others";

/**
 * @description const
 * @author ddzy
 * @since 2019/5/25
 */

export function _const(
  variable: string,
  value: any,
) {

  /**
   * 1. 不可变
   * 2. 不会挂载到window | global
   * 3. 不可重新赋值
   * 4. 块级作用域(`无法实现`)
   */

  const origin = {
    [variable]: value,
  };

  return Object.defineProperty(origin, variable, {
    set(newValue) {
      utilityOthers.invariant(
        newValue !== value,
        `Assignment to constant variable.`
      );
    },
    get() {
      return value;
    },
    enumerable: true,
  });
}