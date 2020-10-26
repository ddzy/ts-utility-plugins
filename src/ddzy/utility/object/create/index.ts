export interface IStaticObject {
  [key: string]: any;
};

/**
 * 模拟实现 `Object.create()`
 * @param prototype 需要继承的原型
 * @param props 可枚举的属性
 */
export default function create(prototype: any, props: IStaticObject) {
  const result: IStaticObject = {};

  Object.setPrototypeOf(result, prototype);
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];
      result[key] = value;
    }
  }

  return result;
}