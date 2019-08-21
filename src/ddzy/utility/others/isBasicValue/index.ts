/**
 * 判断是否基础类型的值(null、undefined、number...)
 * @param origin 任意值
 */
export function isBasicValue(origin: any): boolean {
  return typeof origin === 'string'
    || typeof origin === 'number'
    || typeof origin === 'undefined'
    || typeof origin === 'symbol'
    || typeof origin === 'boolean'
    || origin == undefined
}