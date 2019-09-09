/**
 * 比较两个值是否全等, 包括NaN
 * @description 与`Object.is()`具有相同的作用
 * @param x 第一个数值
 * @param y 第二个数值
 * @see http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero
 * @example
 * // true
 * eq(100, 100);
 * // false
 * eq({}, {});
 */
export function eq(
  x: any,
  y: any,
): boolean {
  const typeX = typeof x;
  const typeY = typeof y;

  return (x === y) || (
    typeX === 'number'
    && x !== x
    && typeY === 'number'
    && y !== y
  );
}