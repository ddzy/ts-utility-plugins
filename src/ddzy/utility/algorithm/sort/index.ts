/**
 * @name sort
 * @description 实现常见的排序算法
 * @author ddzy
 * @since 2020/10/19
 */
import bubbleSort from './bubble-sort/index';
import insertSort from './insert-sort';
import selectSort from './select-sort/index';
import shellSort from './shell-sort';

export const Sort = {
  bubbleSort,
  selectSort,
  insertSort,
  shellSort,
};