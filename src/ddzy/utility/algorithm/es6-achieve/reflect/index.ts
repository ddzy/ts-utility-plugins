/**
 * @name _reflect
 * @description 模拟实现`Reflect`API
 * @author ddzy
 * @since 2019/6/20
 */

/**
 * @todo _reflect.get(target, key)
 * @todo _reflect.set(target, key, value)
 * @todo _reflect.has(target, key)
 * @todo _reflect.apply(targetFunc, targetObj, args)
 * @todo _reflect.construct(targetFunc, args)
 * @todo _reflect.deleteProperty(target, key)
 * @todo _reflect.setPrototypeOf(target, newProto)
 * @todo _reflect.getPrototypeOf(target)
 */

/**
 * @see `Reflect`本质为一个单例对象
 * @see 其内部API并无实际关联
 * @see 不具有构造器,不能进行实例化操作
 * @see 更方便的使用函数式,增强可读性
 */


export interface IReflectProps {
  get: (target: TReflectStaticObject, key: TReflectStaticKey) => TReflectStaticValue;
  set: (target: TReflectStaticObject, key: TReflectStaticKey, value: TReflectStaticValue) => boolean;
  has: (target: TReflectStaticObject, key: TReflectStaticKey) => boolean;
  apply: (
    targetFunc: Function,
    targetObj: any,
    args: ArrayLike<any>,
  ) => void;
  construct: (targetFunc: Function, args: ArrayLike<any>) => any;
  deleteProperty: (target: TReflectStaticObject, key: TReflectStaticKey) => boolean;
  getPrototypeOf: (target: any) => any;
  setPrototypeOf: (target: any, newProto: any) => void;
};
export type TReflectStaticKey = string | number;
export type TReflectStaticValue = any;
export type TReflectStaticObject = Record<TReflectStaticKey, TReflectStaticValue>;

export const _reflect: IReflectProps = {
  get(target, key) {
    return target[key];
  },
};