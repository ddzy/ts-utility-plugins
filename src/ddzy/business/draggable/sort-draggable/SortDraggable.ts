import { getEle } from "../../../utility/dom/getEle";
import { convertPairToCSSText } from "../../../utility/dom/convertPairToCSSText";
import { getAllEle } from "../../../utility/dom/getAllEle";
import { setCss } from "../../../utility/dom/setCss";
import { addClass } from "../../../utility/dom/addClass";
import { removeClass } from "../../../utility/dom/removeClass";
import { setAttr } from "../../../utility/dom/setAttr";

export interface ISortDraggableProps {
  container: string;
  dataSource?: IStaticDataSourceParams[];
  animate?: boolean;
  dragWrapperStyle?: Partial<CSSStyleDeclaration>;
  dragOriginStyle?: Partial<CSSStyleDeclaration>;
  dragOriginActiveStyle?: Partial<CSSStyleDeclaration>;
  dragTargetActiveStyle?: Partial<CSSStyleDeclaration>;
  onDragStartHook?: (origin: HTMLElement) => void;
  onDragEnterHook?: (origin: HTMLElement, target: HTMLElement) => void;
  onDragLeaveHook?: (origin: HTMLElement, target: HTMLElement) => void;
  onDragOverHook?: (origin: HTMLElement, target: HTMLElement) => void;
  onDropHook?: (origin: HTMLElement) => void;
};
export interface IStaticDataSourceParams {
  titleText?: string;
  contentText?: string;
};


export class SortDraggable {

  public static _aidedFindIndex(
    node: Element | null,
    count: number,
  ): any {
    if (!node) {
      return count;
    }
    return this._aidedFindIndex(
      node.previousElementSibling,
      ++count
    );
  }

  public static readonly defaultProps = {
    container: 'body',
    dataSource: [
      {
        titleText: '1',
        contentText: '第一项的内容',
      },
      {
        titleText: '2',
        contentText: '第二项的内容',
      },
      {
        titleText: '3',
        contentText: '第三项的内容',
      },
      {
        titleText: '4',
        contentText: '第四项的内容',
      },
      {
        titleText: '5',
        contentText: '第五项的内容',
      },
    ],
    dragWrapperStyle: {
      backgroundColor: '#fff',
    },
    dragOriginStyle: {
      margin: '8px 0',
      border: '1px solid #ebeef5',
      borderRadius: '4px',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, .1)',
    },
    dragOriginActiveStyle: {
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, .4)',
    },
    dragTargetActiveStyle: {
      opacity: '.5',
    },
    animate: true,
    onDragStartHook(_origin: HTMLElement) { },
    onDragEnterHook(_origin: HTMLElement, _target: HTMLElement) { },
    onDragLeaveHook(_origin: HTMLElement, _target: HTMLElement) { },
    onDragOverHook(_origin: HTMLElement, _target: HTMLElement) { },
    onDropHook(_origin: HTMLElement) { },
  };

  public constructor(
    props: ISortDraggableProps,
  ) {
    this.__init__(props);
  }


  // 拖拽容器, origin任意父级
  private dragContainer: HTMLElement = (
    document.createElement('ul')
  );
  // 拖拽列表
  private dragItems: HTMLElement[] = [
    document.createElement('li'),
  ];
  // 保存被拖拽元素
  private origin: HTMLElement = (
    document.createElement('div')
  );
  // 储存拖拽前后, origin & target位置信息
  private position = {
    originBeforeRect: {
      top: 0,
    },
    originAfterRect: {
      top: 0,
    },
    targetBeforeRect: {
      top: 0,
    },
    targetAfterRect: {
      top: 0,
    },
  };


  private __init__(
    props: ISortDraggableProps,
  ): void {
    this._initProps(props);
    this.render();
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
    dataSource.forEach((v, i) => {
      tempStr += `
        <li class="ddzy-drag-list-item ddzy-drag-item-${i}">
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

    const mountWrapper = getEle(container);

    if (mountWrapper) {
      mountWrapper.innerHTML += dom;
    } else {
      throw new TypeError('Please enter an existing selector.');
    }
  }

  private aidedCreateStyle(): string {
    const {
      dragWrapperStyle,
      dragOriginStyle,
      dragOriginActiveStyle,
      dragTargetActiveStyle,
    } = SortDraggable.defaultProps;

    const tempWrapperStyle =  convertPairToCSSText(dragWrapperStyle);
    const tempOriginStyle =  convertPairToCSSText(dragOriginStyle);
    const tempOriginActiveStyle =  convertPairToCSSText(dragOriginActiveStyle);
    const tempTargetActiveStyle =  convertPairToCSSText(dragTargetActiveStyle);

    const style: string = `
      body, ul, li {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style-type: none;
      }
      #ddzy-drag-wrapper div {
        box-sizing: border-box;
        overflow: hidden;
      }
      #ddzy-drag-wrapper {
        height: 100%;
        ${tempWrapperStyle}
      }
      .ddzy-drag-main {
        heigth: 100%;
        padding: 0.625rem;
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
        min-height: 2.5rem;
        margin: 0.5rem 0;
        background-color: #fff;
        color: #303133;
        ${tempOriginStyle}
        transition: .3s all ease;
      }
      .ddzy-drag-item-title-box {
        flex: 1;
        background-color: #d50;
        pointer-events: none;
      }
      .ddzy-drag-item-title {
        height: 100%;
        line-height: 2.5;
        color: #fff;
        text-align: center;
      }
      .ddzy-drag-item-title img {
        display: block;
        max-width: 100%;
        height: 100%;
      }
      .ddzy-drag-item-content-box {
        flex: 5;
        pointer-events: none;
      }
      .ddzy-drag-item-content {
        padding-left: 0.5rem;
        line-height: 2.5;
        color: #666;
      }

      /* Active Classes(Configurations) */
      .ddzy-drag-origin-active {
        ${tempOriginActiveStyle}
      }
      .ddzy-drag-target-active {
        ${tempTargetActiveStyle}
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
   * drag相关的变量提取, 考虑到后续可能会用到
   */
  private handleInitDragVarible(): void {
    this.dragContainer = getEle(
      '.ddzy-drag-main-list'
    ) as HTMLUListElement;
    this.dragItems = Array.from(
      getAllEle(
        '.ddzy-drag-list-item'
      ) as ArrayLike<HTMLLIElement>
    );
  }

  private handleDragAnimation(
    target: HTMLElement,
  ): void {
    const originDiffDistance = this.position.originAfterRect.top - this.position.originBeforeRect.top;
    const targetDiffDistance = this.position.targetAfterRect.top - this.position.targetBeforeRect.top;

    // ?: [animate] - 先置origin & target于原位(animate配置项必须)
    setCss(this.origin, {
      transition: 'none',
      transform: `translateY(${-originDiffDistance}px)`,
    });
    setCss(target, {
      transition: 'none',
      transform: `translateY(${-targetDiffDistance}px)`,
    });

    addClass(target, 'ddzy-drag-target-active');

    // ?: 由于origin移动到了新位置, 所以此处需更新其beforeRect
    this.position.originBeforeRect = this.position.originAfterRect;

    setTimeout(() => {
      setCss(this.origin, {
        transition: `all .3s ease`,
        transform: `translateY(${0}px)`,
      });
      setCss(target, {
        transition: `all .3s ease`,
        transform: `translateY(${0}px)`,
      });
    }, 0);
  }

  private handleDragStart(
    target: HTMLElement,
  ): void {
    // 存储被拖拽元素
    this.origin = target;
    this.position.originBeforeRect = this.origin.getBoundingClientRect();

    addClass(this.origin, 'ddzy-drag-origin-active');
  }

  private handleDragEnter(
    target: HTMLElement,
  ): void {
    const {
      dragContainer,
    } = this;

    this.position.targetBeforeRect = target.getBoundingClientRect();

    // 排序依据(移动方向)有两种方式
    //    1. 递归(迭代)DOM树, 找origin & target的位置(√)
    //    2. 维护一个DOM排序数组
    const originIndex = SortDraggable._aidedFindIndex(this.origin, 0);
    const targetIndex = SortDraggable._aidedFindIndex(target, 0);
    const diff = targetIndex - originIndex;
    diff > 0
      ? (
        dragContainer.insertBefore(this.origin, (
          target.nextElementSibling as HTMLLIElement
        ))
      )
      : (
        dragContainer.insertBefore(this.origin, target)
      );

    // ?: insert后的新位置, `animate`时只需交换两者位置信息即可
    this.position.originAfterRect = this.origin.getBoundingClientRect();
    this.position.targetAfterRect = target.getBoundingClientRect();
  }

  private handleDragLeave(
    target: HTMLElement,
  ): void {
    removeClass(target, 'ddzy-drag-target-active');
  }

  private handleDragOver(
    e: DragEvent,
  ): void {
    e.preventDefault();
  }

  private handleDrop(): void {
    removeClass(this.origin, 'ddzy-drag-origin-active');
    removeClass(this.origin, 'ddzy-drag-target-active');
  }

  /**
   * 处理拖拽相关
   */
  private handleDrag(): void {
    this.handleInitDragVarible();

    const { dragItems } = this;
    const {
      animate,
      onDragStartHook,
      onDragEnterHook,
      onDragOverHook,
      onDragLeaveHook,
      onDropHook,
    } = SortDraggable.defaultProps;

    dragItems.forEach((target) => {
      setAttr(target, {
        draggable: 'true',
      });

      target.addEventListener('dragstart', () => {
        this.handleDragStart(target);
        onDragStartHook(this.origin);
      });

      target.addEventListener('dragenter', () => {
        this.handleDragEnter(target);
        // ?: 是否启用过渡
        animate && this.handleDragAnimation(target);
        onDragEnterHook(this.origin, target);
      });

      target.addEventListener('dragleave', () => {
        this.handleDragLeave(target);
        onDragLeaveHook(this.origin, target);
      });

      target.addEventListener('dragover', (e) => {
        this.handleDragOver(e);
        onDragOverHook(this.origin, target);
      });

      target.addEventListener('drop', () => {
        this.handleDrop();
        onDropHook(this.origin);
      });
    });
  }

  private render(): void {
    this.handleRenderDOM();
    this.handleRenderStyle();
    this.handleDrag();
  }

};