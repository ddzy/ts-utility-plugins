/**
 * @description 排序拖拽
 */

/**
 * source:
 *    dragstart
 *    drag
 *    dragend
 * target:
 *    dragenter
 *    dragover
 *    dragleave
 *    drop
 */

export interface ISortDraggableProps { };


export class SortDraggable {

  public static readonly defaultProps = {

  };

  public constructor(
    props: ISortDraggableProps,
  ) {
    this.__init__(props);
  }

  public __init__(
    props: ISortDraggableProps,
  ): void {
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const value = Reflect.get(props, key);
        Reflect.set(SortDraggable.defaultProps, key, value);
      }
    }
  }

};