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
