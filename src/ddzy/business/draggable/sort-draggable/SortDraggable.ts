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
 * 问题:
 *    1. dragover必须preventDefault, 否则drop无法触发
 *    2. 如何添加过渡效果?
 *      2.1 dragstart, source的opacity -> 0
 *      2.2 dragend, source的opacity -> 1
 *      2.3 碰撞检测
 *      2.4 边界检测
 *        2.4.1 第一个和最后一个
 */

/**
 * @param container 挂载容器
 * @param [dataSource] 元数据
 * @param [animate] 启用过渡
 * @param [dragWrapperStyle] 拖拽容器样式
 * @param [dragOriginStyle] 拖拽对象样式
 * @param [dragTargetStyle] 碰撞目标样式
 * @param [gap] 列表项间距
 */
import utilidyDOM from '../../../utility/dom/index';


// TODO: 添加至utility/others
function invariant(
  condition: boolean,
  message: string,
) {
  if (condition) {
    throw new TypeError(`
      Ddzy's plugin error: ${message}.
    `);
  }
}


export interface ISortDraggableProps {
  container: string;
  dataSource?: IStaticDataSourceParams[];
  animate?: boolean;
  dragWrappgerStyle?: IStaticDragWrapperStyle;
  dragOriginStyle?: IStaticDragOriginStyle;
  dragTargetStyle?: IStaitcDragTargetStyle;
  gap?: number;
};
export interface IStaticDataSourceParams {
  titleText?: string;
  titleStyle?: {};
  contentText?: string;
  contentStyle?: {};
};
export interface IStaticDragWrapperStyle {
  'background-color': string;
};
export interface IStaticDragOriginStyle {
};
export interface IStaitcDragTargetStyle {
  'opacity': number;
};



export class SortDraggable {

  public static readonly defaultProps = {
    container: 'body',
    dataSource: [
      {
        titleText: '1',
        titleStyle: {},
        contentText: '第一项的内容',
        contentStyle: {},
      },
      {
        titleText: '2',
        titleStyle: {},
        contentText: '第二项的内容',
        contentStyle: {},
      },
      {
        titleText: '3',
        titleStyle: {},
        contentText: '第三项的内容',
        contentStyle: {},
      },
      {
        titleText: '4',
        titleStyle: {},
        contentText: '第四项的内容',
        contentStyle: {},
      },
      {
        titleText: '5',
        titleStyle: {},
        contentText: '第五项的内容',
        contentStyle: {},
      },
    ],
    dragWrapperStyle: {
      'background-color': '#ccc',
    },
    dragOriginStyle: {
    },
    dragTargetStyle: {
      opacity: .5,
    },
    animate: true,
    tap: 8,
  };

  public constructor(
    props: ISortDraggableProps,
  ) {
    this.__init__(props);
  }

  private __init__(
    props: ISortDraggableProps,
  ): void {
    this._initProps(props);
    this.render();
    this._initDrag();
  }

  private _initProps(
    props: ISortDraggableProps,
  ): void {
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const value = Reflect.get(props, key);
        Reflect.set(SortDraggable.defaultProps, key, value);
      }
    }
  }

  private aidedCreateDOM(): string {
    const {
      dataSource,
    } = SortDraggable.defaultProps;

    let tempStr: string = '';
    dataSource.forEach((v) => {
      tempStr += `
        <li class="ddzy-drag-list-item">
          <div class="ddzy-drag-item-title-box">
            <div class="ddzy-drag-item-title">
              ${v.titleText}
            </div>
          </div>
          <div class="ddzy-drag-item-content-box">
            <div class="ddzy-drag-item-content">
              ${v.contentText}
            </div>
          </div>
        </li>
      `;
    });

    const dom: string = `
      <div id="ddzy-drag-wrapper">
        <div class="ddzy-drag-main">
          <ul class="ddzy-drag-main-list">
            <!-- TODO: dataSource动态生成 -->
            ${tempStr}
          </ul>
        </div>
      </div>
    `;

    return dom;
  }

  private aidedMountDOM(
    dom: string,
  ): void {
    const {
      container,
    } = SortDraggable.defaultProps;

    const mountWrapper = utilidyDOM.getEle(container);

    if (mountWrapper) {
      mountWrapper.innerHTML += dom;
    } else {
      throw new TypeError('Please enter an existing selector.');
    }
  }

  private aidedCreateStyle(): string {
    const style: string = `
      body, ul, li {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style-type: none;
      }
      #ddzy-drag-wrapper {
        height: 100%;
        // background-color: #ddd;
      }
      .ddzy-drag-main {
        heigth: 100%;
        padding: 10px;
      }
      .ddzy-drag-main-list {
        display: flex;
        flex-direction: column;
      }
      .ddzy-drag-list-item {
        /* TODO: 传入配置 - gap */
        display: flex;
        flex-direction: row;
        overflow: hidden;
        cursor: move;
        min-height: 40px;
        margin-top: 8px;
        background-color: #fff;
        color: #303133;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        transition: .3s all ease;
      }
      .ddzy-drag-item-title-box {
        flex: 1;
        background-color: #d50;
      }
      .ddzy-drag-item-title {
        height: 100%;
        line-height: 2.5;
        color: #fff;
        text-align: center;
      }
      .ddzy-drag-item-content-box {
        flex: 5;
      }
      .ddzy-drag-item-content {
        padding-left: 8px;
        line-height: 2.5;
        color: #666;
      }
    `;

    return style;
  }

  private aidedMountStyle(
    style: string,
  ): void {
    let oStyle = document.querySelector('style');

    if (oStyle) {
      oStyle.innerText += `
        /* Create by SortDraggable */
        ${style}
      `;
    }
    else {
      oStyle = document.createElement('style') as HTMLStyleElement;
      oStyle.innerText += oStyle.innerText += `
        /* Create by SortDraggable */
        ${style}
      `;;
      document.head.appendChild(oStyle);
    }
  }

  private handleRenderDOM(): void {
    const dom = this.aidedCreateDOM();
    this.aidedMountDOM(dom);
  }

  private handleRenderStyle(): void {
    const style = this.aidedCreateStyle();
    this.aidedMountStyle(style);
  }

  /**
   * Create DOM tree and Style
   */
  private render(): void {
    this.handleRenderDOM();
    this.handleRenderStyle();
  }

  /**
   * Drag events
   */
  private _initDrag(): void {
    // TODO: 先完成主要功能, 后续作拆分
  }

};