import * as InterfaceUtil from './IArrayInterface'

export function arrayMax(args: InterfaceUtil.IArraySize<number>):number {
    return Math.max.apply(null, args)
}

export function arrayMin(args: InterfaceUtil.IArraySize<number>): number {
    return Math.min.apply(null, args);
}
