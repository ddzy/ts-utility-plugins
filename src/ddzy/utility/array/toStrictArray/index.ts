/**
 * 将给定的类数组转化为严格的数组(非原地)
 * @param origin 需要转化的类数组对象
 */
export function toStrictArray<T>(origin: ArrayLike<T>): T[] {
  const result: T[] = [];

  if (utilityOthers.isBasicValue(origin)) {
    return result;
  } else {
    for (let i = 0, every; every = origin[i++];) {
      result.push(every);
    }
  }

  return result;
}