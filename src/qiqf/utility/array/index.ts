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

/**
 * 返回第一个符合条件元素的后面所有元素组成的集合
 * @param args
 * @param callback
 */
export function dropElements(args: InterfaceUtil.IArrayAny, callback: (arg: any) => boolean): InterfaceUtil.IArrayAny[] {
    while (args.length && !callback(args[0])) args.shift()

    return args
}

/**
 * 返回数组中每个第n个元素
 * @param args
 * @param nth
 */
export const everyNth: InterfaceUtil.IEveryNth = (args: number[], nth: number): number[] => {
    return args.filter((_arg, i) => i % nth === 0)
};

/**
 * 筛选出数组中非唯一值
 * @param args
 */
export function filterNonUnique(args: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny[] {
    return args.filter(arg => args.indexOf(arg) === args.lastIndexOf(arg))
}

/**
 * 拼合数组
 * @param args
 */
export function flatten(args: InterfaceUtil.IArrayAny): InterfaceUtil.IArrayAny {
    return args.reduce((a, v) => a.concat(v) ,[])
}

/**
 * 将数组向上拼合到指定深度。
 * @param args
 * @param depth
 */
export function flattenDepth(args: InterfaceUtil.IArrayAny, depth: number = 1): InterfaceUtil.IArrayAny[] {
    if (depth < 1) throw new Error(`The second parameter minimum value cannot be less than 1`);
    return depth != 1 ?
        args.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v) ,[])
        : flatten(args)
}




