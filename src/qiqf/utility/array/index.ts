import * as InterfaceUtil from './IArrayInterface'

export function arrayMax(args: InterfaceUtil.IArraySize<number>):number {
    return Math.max.apply(null, args)
}

export function arrayMin(args: InterfaceUtil.IArraySize<number>): number {
    return Math.min.apply(null, args);
}

/**
 * 将数组划分为指定大小的数组
 * @param args
 * @param size
 */
export function arrayChunk(args: InterfaceUtil.IArrayAny, size: number): InterfaceUtil.IArrayAny {
    return Array.from({length: Math.ceil(args.length / size)}, (_v: any, index: number) => {
        return args.slice(index * size, index * size + size);
    })
}

/**
 * 从数组中移除 [false, null, '', 0, undefined] 值
 * @param args
 */
export function compact(args: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny {
    return args.filter(Boolean)
}

/**
 * 计算数组中值出现的次数
 */
const INITIAL_NUMBER = 0
export function countOccurrences(args: InterfaceUtil.IArrayAny, value: number) {
    return args.reduce((count, arg) => {
        return arg === value ? count + 1 : count
    }, INITIAL_NUMBER)
}

/**
 * 扁平化数组
 * @param args
 */
export function deepFlatten(args: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny[] {
    return [].concat(...args.map(arg => Array.isArray(arg) ? deepFlatten(arg) : arg))
}

/**
 * 返回两个数组之间的差异部分组成的数组
 * @param arg1
 * @param arg2
 */
export function difference(arg1: InterfaceUtil.IArrayAny, arg2: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny[] {
    return arg2.filter(v2 => !arg1.includes(v2))
}

/**
 * 返回两个数组中相同的部分组成的数组
 * @param arg1
 * @param arg2
 */
export function sameArray(arg1: InterfaceUtil.IArrayAny, arg2: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny[] {
    return arg2.filter(v2 => arg1.includes(v2))
}

/**
 * 数组去重
 * @param args
 */
export function distinctValuesOfArray(args: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny[] {
    return [...new Set(args)];
}




