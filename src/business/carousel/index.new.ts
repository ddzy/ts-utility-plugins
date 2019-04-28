/**
 * @name: business-carousel
 * @description 业务轮播插件
 * @author: yyg
 * @constant 最近修改于 2019/4/27
 */

import utilityDOM from '../../utility/dom/index';


export interface IConfigProps {
  container?: string,
  dataSource?: {
    text: string,
    img: {
      url: string,
      target: string,
    },
  }[];
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  easing?: string;
  effect?: string;
  vertical?: boolean;
  duringTime?: number;
  delayTime?: number;
  isHoverPause?: boolean;
  beforeChange?: () => void;
  afterChange?: () => void;
}


export default class Carousel {
  public constructor(
    config: IConfigProps,
  ) {
    this.__init(config);
  }

  private __init(
    config: IConfigProps,
  ): void {
    this.__initWhichEffect(config);
  }

  private __initWhichEffect(
    config: IConfigProps,
  ): void {
    switch (config.effect) {
      case 'scroll': {
        new Scroll(config);
        return;
      }
      case 'fade': {
        new Fade(config);
        return;
      }
      default: {
        new Scroll(config);
        return;
      }
    }
  }
}


export class Scroll {

  private static defaultConfig = {
    container: 'body',
    dataSource: [
      {
        text: '面板一',
        img: {
          url: '',
          target: '',
        },
      },
      {
        text: '面板二',
        img: {
          url: '',
          target: '',
        },
      },
      {
        text: '面板三',
        img: {
          url: '',
          target: '',
        },
      },
      {
        text: '面板四',
        img: {
          url: '',
          target: '',
        },
      },
    ],
    autoPlay: false,
    showDots: false,
    showArrows: false,
    easing: 'ease-in-out',
    effect: 'scroll',
    vertical: false,
    duringTime: 1.5,
    delayTime: 3000,
    isHoverPause: true,
    beforeChange: () => null,
    afterChange: () => null,
  };

  private static MIN_CLICK_DELAY_TIME: number = Scroll.defaultConfig.duringTime * 1000 || 1500;

  /**
   * 自动轮播辅助函数
   */
  private static _aidedAutoScroll(
    count: number,
    oList: any,
    oListWidth: number,
    oItemLength: number,
  ): void {
    utilityDOM.setCss(oList, {
      transition: `all ${Scroll.defaultConfig.duringTime}s ${Scroll.defaultConfig.easing}; `,
      transform: `translateX(-${oListWidth / (oItemLength) * (count + 1)}px)`,
    });
  }

  /**
   * 辅助函数: dot栏改变
   * @param oDotsItem 圆点数组
   */
  private static _aidedChangeDotsStyle(
    count: number,
    oItemLength: number,
    oDotsItem: ArrayLike<HTMLSpanElement>,
  ): void {

    for (let i = 0, outer; outer = oDotsItem[i++];) {
      utilityDOM.removeClass(outer, 'yyg-dot-item-active');
    }

    if (count === oItemLength - 1) {
      utilityDOM.addClass(oDotsItem[0], 'yyg-dot-item-active');
    } else if (++count === 1) {
      utilityDOM.addClass(
        oDotsItem[oItemLength - 3],
        'yyg-dot-item-active',
      );
    } else {
      utilityDOM.addClass(
        oDotsItem[count - 2],
        'yyg-dot-item-active',
      );
    }
  }

  private timer: any = 0;
  private count: number = 1;

  private oList: any = null;
  private oDotsItem: any = null;
  private oListItem: any = null;
  private oPrevArrow: any = null;
  private oNextArrow: any = null;
  private oListWidth: number = 0;
  private oItemLength: number = 0;
  private oItemWidth: number = 0;

  public constructor(
    config: IConfigProps,
  ) {
    this.initSettings(config);
    this.initDOM();
  }

  public initSettings(
    config: IConfigProps,
  ): void {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const value = Reflect.get(config, key);
        Reflect.set(Scroll.defaultConfig, key, value);
      }
    }
  }

  public initDOM(): void {
    const container = utilityDOM.getEle(Scroll.defaultConfig.container);

    if (container) {
      // 初始化DOM结构
      // TODO: 使用appendChild代替innerHTML, 避免替换原有内容.
      const temp = document.createElement('div');
      temp.innerHTML = this.createDOMTree();
      container.appendChild(temp);

      // 初始化样式
      this.createStyle();

      // 初始化公共对象(优化)
      this.initCommonEle();

      Scroll.defaultConfig.autoPlay
        && this.handleAutoScroll();
      Scroll.defaultConfig.isHoverPause
        && this.handleImgHover();
      Scroll.defaultConfig.showDots
        && this.handleDotsHover();
      Scroll.defaultConfig.showArrows
        && this.handleArrowClick();
      Scroll.defaultConfig.showArrows
        && this.handleArrowHover();
    }
  }

  /**
   * 初始化通用对象
   */
  public initCommonEle(): void {
    this.oList = utilityDOM
      .getEle('.yyg-content-list') as HTMLUListElement;
    this.oListWidth = this.oList.offsetWidth;
    this.oDotsItem = utilityDOM.getAllEle('.yyg-dot-item');
    this.oListItem = utilityDOM.getAllEle('.yyg-content-item');
    this.oPrevArrow = utilityDOM.getEle('.yyg-arrow-prev-wrapper');
    this.oNextArrow = utilityDOM.getEle('.yyg-arrow-next-wrapper');
    this.oItemLength = this.oListItem.length;
    this.oItemWidth = this.oListWidth / this.oItemLength;
  }

  public createDOMTree(): string {
    const dataSource: any[] = Scroll.defaultConfig.dataSource;
    const { showArrows, showDots } = Scroll.defaultConfig;
    let dotsSpan: string = '';
    let contentLi: string = '';

    contentLi += `
      <li class="yyg-content-item" data-id=${dataSource.length}>
        ${
      dataSource[dataSource.length - 1].img.url
        ? `<a
                href=${dataSource[dataSource.length - 1].img.target}
                ><img src=${dataSource[dataSource.length - 1].img.url} alt="图片提示" /></a>`
        : dataSource[dataSource.length - 1].text
      }
      </li>
    `;

    dataSource.forEach((item: any, index: number) => {
      dotsSpan += `
        <span
          class="yyg-dot-item${
        index === 0
          ? ' yyg-dot-item-active'
          : ''
        }"
          data-id=${index + 1}
        ></span>
      `;
      contentLi += `
        <li class="yyg-content-item" data-id=${index + 1}>
          ${
        item.img.url
          ? `<a
                  href=${item.img.target}
                 ><img src=${item.img.url} alt="图片提示" /></a>`
          : item.text
        }
        </li>
      `;
    });

    // 无缝
    contentLi += `
      <li class="yyg-content-item" data-id=${1}>
        ${
      dataSource[0].img.url
        ? `<a
                href=${dataSource[0].img.target}
                ><img src=${dataSource[0].img.url} alt="图片提示" /></a>`
        : dataSource[0].text
      }
      </li>
    `;

    const final: string = `
      <div class="yyg-carousel-container">
        <div class="yyg-carousel-main">
          <div class="yyg-content-wrapper">
            <ul class="yyg-content-list">${contentLi}</ul>
          </div>
          ${
      showArrows
        ? `
                <div class="yyg-arrow-wrapper yyg-arrow-prev-wrapper">
                  <i class="yyg-arrow yyg-arrow-prev">&lt;</i>
                </div>
                <div class="yyg-arrow-wrapper yyg-arrow-next-wrapper">
                  <i class="yyg-arrow yyg-arrow-next">&gt;</i>
                </div>
              `
        : ''
      }
          ${
      showDots
        ? `<div class="yyg-dots-wrapper">${dotsSpan}</div>`
        : ''
      }
        </div>
      </div>
    `;

    return final;
  }

  public createStyle(): void {
    let oStyle: HTMLElement | null = utilityDOM
      .getEle('style');
    const { dataSource } = Scroll.defaultConfig;

    // style标签不存在
    if (!oStyle) {
      oStyle = document.createElement('style');
      const oHead = utilityDOM
        .getEle('head') as HTMLHeadElement;

      oHead.appendChild(oStyle);
    }

    oStyle.innerText += `
      body, p, ul {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style-type: none;
      }
      .yyg-carousel-container {
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        border: 5px solid #1890ff;
        border-radius: 20px;
      }
      .yyg-carousel-main {
        position: relative;
        height: 100%;
      }
      .yyg-arrow-wrapper {
        position: absolute;
        z-index: 999;
        top: 50%;
        width: 30px;
        heigth: 45px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background-clip: padding-box;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        opacity: 0;
        line-height: 45px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        transform: translateY(-50%);
        transition: all .5s ease-in-out;
      }
      .yyg-arrow-prev-wrapper {
        left: -10px;
      }
      .yyg-arrow-next-wrapper {
        right: -10px;
      }
      .yyg-content-wrapper {
        overflow: hidden;
        height: 100%;
      }
      .yyg-content-list {
        width: ${(dataSource.length + 2) * 100}%;
        height: 100%;
        // transition: all ${Scroll.defaultConfig.duringTime}s ${Scroll.defaultConfig.easing};
        transform: translateX(-${
      100 / (dataSource.length + 2)
      }%);
      }
      .yyg-content-item {
        float: left;
        width: ${100 / (dataSource.length + 2)}%;
        height: 100%;
        text-align: center;
      }
      .yyg-content-item a img {
        display: block;
        max-width: 100%;
        // width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      .yyg-dots-wrapper {
        display: none;
        position: absolute;
        left: 50%;
        bottom: 10px;
        padding: 2px 0;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: rgba(0,0,0,.5);
        font-size: 0;
        transform: translateX(-50%);
      }
      .yyg-dot-item {
        display: inline-block;
        margin-left: 5px;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-radius: 50%;
        transition: all .5s ease-in-out;
      }
      .yyg-dot-item:last-child {
        margin-right: 5px;
      }
      .yyg-dot-item-active {
        background-color: #d50;
      }
      .yyg-prev-wrapper-active {
        left: 15px;
        opacity: 1;
      }
      .yyg-next-wrapper-active {
        right: 15px;
        opacity: 1;
      }
    `;
  }

  /**
   * 处理 自动轮播
   */
  public handleAutoScroll(): void {

    const oList = this.oList;
    const oItemLength = this.oItemLength;
    const oDotsItem = this.oDotsItem;
    const oItemWidth = this.oItemWidth;
    const oListWidth = this.oListWidth;

    this.timer = setInterval(() => {

      // 执行钩子函数
      Scroll.defaultConfig.beforeChange
        && Scroll.defaultConfig.beforeChange();

      // 自动滚动
      Scroll._aidedAutoScroll(
        this.count++,
        oList,
        oListWidth,
        oItemLength,
      );

      // dot栏改变
      Scroll._aidedChangeDotsStyle(
        this.count,
        oItemLength,
        oDotsItem,
      );

    }, Scroll.defaultConfig.delayTime);

    // 无缝检测
    oList.addEventListener('transitionend', () => {
      // 执行钩子函数
      Scroll.defaultConfig.afterChange
        && Scroll.defaultConfig.afterChange();

      if (this.count > oItemLength) {
        this.count = 2;

        utilityDOM.setCss(oList, {
          transition: null,
          transform: `translateX(${
            -(this.count) * oItemWidth
            }px)`,
        });
      }
    }, false);
  }

  /**
   * 处理 图片 hover
   */
  public handleImgHover(): void {
    const oListItem = this.oListItem;

    for (const key in oListItem) {
      if (oListItem.hasOwnProperty(key)) {

        const element = oListItem[key];

        element.addEventListener('mouseenter', () => {
          clearInterval(this.timer);

          this.aidedHandleArrowVisible(Scroll.defaultConfig.showArrows);
        }, false);

        element.addEventListener('mouseleave', () => {
          this.handleAutoScroll();

          this.aidedHandleArrowVisible(false);
        }, false);
      }
    }
  }

  /**
   * 处理 圆点 hover
   */
  public handleDotsHover(): void {

    const oList = this.oList;
    const oItemWidth = this.oItemWidth;
    const oDotsItem = this.oDotsItem;
    const oDotsWrapper = utilityDOM
      .getEle('.yyg-dots-wrapper') as HTMLDivElement;

    utilityDOM.setCss(oDotsWrapper, {
      display: 'block',
    });

    for (let i = 0, outer: any; outer = oDotsItem[i++];) {

      outer.addEventListener('mouseenter', () => {

        const signId = utilityDOM
          .getAttr(outer, 'data-id') as string;

        // 清除定时器
        clearInterval(this.timer);

        // 同步count
        this.count = Number(signId);

        // dot栏样式改变
        for (let j = 0, inner; inner = oDotsItem[j++];) {
          utilityDOM.removeClass(inner, 'yyg-dot-item-active');
        }
        utilityDOM.addClass(outer, 'yyg-dot-item-active');

        // 同步轮播
        utilityDOM.setCss(oList, {
          transition: `all ${Scroll.defaultConfig.duringTime}s ${Scroll.defaultConfig.easing}; `,
          transform: `translateX(${-(this.count) * oItemWidth}px)`,
        });

      });

      // 移除dot栏重新滚动
      outer.addEventListener('mouseleave', () => {
        this.handleAutoScroll();
      });

    }
  }

  /**
   * 处理 箭头 点击
   */
  public handleArrowClick(): void {

    const oList = this.oList;
    const oItemWidth = this.oItemWidth;
    const oItemLength = this.oItemLength;
    const prevArrow = this.oPrevArrow;
    const nextArrow = this.oNextArrow;

    // 左箭头
    prevArrow && prevArrow.addEventListener('click', (): void => {
      this.aidedHandleArrowClick('left');
    }, false);

    // 右箭头
    nextArrow && nextArrow.addEventListener('click', () => {
      this.aidedHandleArrowClick('right');
    }, false);

    oList.addEventListener('transitionend', () => {
      if (this.count === 0) {
        this.count = oItemLength - 2;
      } else if (this.count === oItemLength - 1) {
        this.count = 1;
      }

      utilityDOM.setCss(oList, {
        transition: `null`,
        transform: `translateX(${
          -(this.count) * oItemWidth
          }px)`,
      });
    }, false);

  }

  /**
   * 悬浮箭头, 箭头显隐(解决bug)
   */
  public handleArrowHover(): void {
    const oPrevArrow = this.oPrevArrow;
    const oNextArrow = this.oNextArrow;

    oPrevArrow && oPrevArrow.addEventListener('mouseenter', () => {
      this.aidedHandleArrowVisible(true);
    }, false);
    oNextArrow && oNextArrow.addEventListener('mouseenter', () => {
      this.aidedHandleArrowVisible(true);
    }, false)

  }

  /**
   * 箭头点击切换辅助函数
   * @param whichArrow 哪边箭头
   */
  public aidedHandleArrowClick(
    whichArrow: string,
  ): void {
    const oList = this.oList;
    const oDotsItem = this.oDotsItem;
    const oItemWidth = this.oItemWidth;
    const oItemLength = this.oItemLength;

    clearInterval(this.timer);

    // 节流处理
    utilityDOM.throttle(Scroll.MIN_CLICK_DELAY_TIME, () => {

      switch (whichArrow) {
        case 'left':
          this.count--;
          break;
        case 'right':
          this.count++;
          break;
        default:
          break;
      }

      utilityDOM.setCss(oList, {
        transition: `all ${
          Scroll.defaultConfig.duringTime
          }s ${Scroll.defaultConfig.easing}`,
        transform: `translateX(${
          -(this.count) * oItemWidth
          }px)`,
      });

      Scroll._aidedChangeDotsStyle(
        this.count,
        oItemLength,
        oDotsItem
      );
    });

    this.handleAutoScroll();
  }

  /**
   * 控制箭头显隐 辅助函数
   * @param show 箭头显隐
   */
  public aidedHandleArrowVisible(
    show: boolean,
  ): void {
    const oPrevArrow = this.oPrevArrow;
    const oNextArrow = this.oNextArrow;

    if (show) {
      utilityDOM.addClass(
        oPrevArrow,
        'yyg-prev-wrapper-active'
      );
      utilityDOM.addClass(
        oNextArrow,
        'yyg-next-wrapper-active'
      );
    } else {
      utilityDOM.removeClass(
        oPrevArrow,
        'yyg-prev-wrapper-active'
      );
      utilityDOM.removeClass(
        oNextArrow,
        'yyg-next-wrapper-active',
      );
    }
  }
}


export class Fade {
  private static defaultConfig = {
    container: 'body',
    dataSource: [
      {
        text: '面板一',
        img: {
          url: '',
          target: '',
        },
      },
      {
        text: '面板二',
        img: {
          url: '',
          target: '',
        },
      },
      {
        text: '面板三',
        img: {
          url: '',
          target: '',
        },
      },
      {
        text: '面板四',
        img: {
          url: '',
          target: '',
        },
      },
    ],
    autoPlay: false,
    showDots: false,
    showArrows: false,
    easing: 'ease-in-out',
    effect: 'scroll',
    vertical: false,
    duringTime: 1.5,
    delayTime: 3000,
    isHoverPause: true,
    beforeChange: () => null,
    afterChange: () => null,
  };

  private oContentItem: any = null;
  private oArrowWrapper: any = null;
  private oPrevWrapper: any = null;
  private oNextWrapper: any = null;
  private oDotsItem: any = null;
  private oContentItemLength: number = 0;

  private timer: any = 0;
  private count: number = 0;

  public constructor(
    config: IConfigProps,
  ) {
    this.init(config);
  }

  public init(
    config: IConfigProps,
  ): void {
    this.initSettings(config);
    this.initDOM();
  }

  public initSettings(
    config: IConfigProps,
  ): void {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const value = Reflect.get(config, key);
        Reflect.set(Fade.defaultConfig, key, value);
      }
    }
  }

  public initDOM(): void {
    const {
      container,
      showArrows,
      showDots,
      autoPlay
    } = Fade.defaultConfig;
    const oContainer = utilityDOM.getEle(container);

    if (oContainer) {
      const temp = document.createElement('div');
      temp.innerHTML = this.createDOM();
      oContainer.appendChild(temp);

      this.createStyle();

      this.initCommonEle();

      autoPlay && this.handleAutoPlay();
      showArrows && this.handleArrowClick();
      showArrows && this.handleImgHover();
      showDots && this.handleDotsHover();
    }
  }

  public createDOM(): string {
    const dataSource: any[] = Fade.defaultConfig.dataSource;
    const { showArrows, showDots } = Fade.defaultConfig;
    let dotsSpan: string = '';
    let contentLi: string = '';

    dataSource.forEach((item: any, index: number) => {
      dotsSpan += `
        <span
          class="yyg-dot-item${
        index === 0
          ? ' yyg-dot-item-active'
          : ''
        }"
          data-id=${index + 1}
        ></span>
      `;
      contentLi += `
        <li class="yyg-content-item" data-id=${index + 1}>
          ${
        item.img.url
          ? `<a
                  href=${item.img.target}
                 ><img src=${item.img.url} alt="图片提示" /></a>`
          : item.text
        }
        </li>
      `;
    });

    const final: string = `
      <div class="yyg-carousel-container">
        <div class="yyg-carousel-main">
          <div class="yyg-content-wrapper">
            <ul class="yyg-content-list">${contentLi}</ul>
          </div>
          ${
      showArrows
        ? `
                <div class="yyg-arrow-wrapper yyg-arrow-prev-wrapper">
                  <i class="yyg-arrow yyg-arrow-prev">&lt;</i>
                </div>
                <div class="yyg-arrow-wrapper yyg-arrow-next-wrapper">
                  <i class="yyg-arrow yyg-arrow-next">&gt;</i>
                </div>
              `
        : ''
      }
          ${
      showDots
        ? `<div class="yyg-dots-wrapper">${dotsSpan}</div>`
        : ''
      }
        </div>
      </div>
    `;

    return final;
  }

  public createStyle(): void {
    let oStyle: HTMLElement | null = utilityDOM
      .getEle('style');
    const { dataSource } = Fade.defaultConfig;

    // style标签不存在
    if (!oStyle) {
      oStyle = document.createElement('style');
      const oHead = utilityDOM
        .getEle('head') as HTMLHeadElement;

      oHead.appendChild(oStyle);
    }

    oStyle.innerText += `
    html, body, ul, p {
      margin: 0;
      padding: 0;
    }
    ul {
      list-style-type: none;
    }
    .yyg-carousel-container {
      box-sizing: border-box;
      height: 100%;
      padding: 10px;
      border: 5px solid #1890ff;
      border-radius: 20px;
    }
    .yyg-carousel-main {
      position: relative;
      // height: 100%;
      height: 300px;
    }
    .yyg-arrow-wrapper {
      display: none;
      position: absolute;
      z-index: 999;
      top: 50%;
      width: 30px;
      heigth: 45px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-clip: padding-box;
      background-color: rgba(0,0,0,.5);
      color: #fff;
      opacity: 0;
      line-height: 45px;
      font-size: 24px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      transform: translateY(-50%);
      transition: all .5s ease-in-out;
    }
    .yyg-arrow-prev-wrapper {
      left: 0;
    }
    .yyg-arrow-next-wrapper {
      right: 0;
    }
    .yyg-content-wrapper {
      overflow: hidden;
      height: 100%;
    }
    .yyg-content-list {
      position: relative;
      height: 100%;
    }
    .yyg-content-item {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      opacity: 0;
    }
    .yyg-content-item:first-child {
      opacity: 1;
      z-index: 0;
    }
    .yyg-content-item a img {
      display: block;
      max-width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .yyg-dots-wrapper {
      position: absolute;
      left: 50%;
      bottom: 10px;
      z-index: 888;
      padding: 2px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: rgba(0,0,0,.5);
      font-size: 0;
      transform: translateX(-50%);
    }
    .yyg-dot-item {
      display: inline-block;
      margin-left: 5px;
      width: 12px;
      height: 12px;
      background-color: #fff;
      border-radius: 50%;
      transition: all .5s ease-in-out;
    }
    .yyg-dot-item:last-child {
      margin-right: 5px;
    }
    .yyg-dot-item-active {
      background-color: #d50;
    }
    .yyg-prev-wrapper-active {
      left: 15px;
      opacity: 1;
    }
    .yyg-next-wrapper-active {
      right: 15px;
      opacity: 1;
    }
  `;
  }

  public initCommonEle(): void {
    this.oContentItem = utilityDOM.getAllEle('.yyg-content-item');
    this.oDotsItem = utilityDOM.getAllEle('.yyg-dot-item');
    this.oArrowWrapper = utilityDOM.getAllEle('.yyg-arrow-wrapper');
    this.oPrevWrapper = utilityDOM.getEle('.yyg-arrow-prev-wrapper');
    this.oNextWrapper = utilityDOM.getEle('.yyg-arrow-next-wrapper');
    this.oContentItemLength = this.oContentItem.length;
  }

  /**
   * 处理 自动轮播
   */
  public handleAutoPlay(): void {
    const {
      delayTime,
      easing,
      duringTime,
    } = Fade.defaultConfig;
    const oContentItem = this.oContentItem;
    const oDotsItem = this.oDotsItem;
    const oContentItemLength = this.oContentItemLength;

    this.timer = setInterval(() => {

      oContentItem.forEach((item: any, index: number) => {
        if (index === this.count) {
          utilityDOM.setCss(item, {
            transition: `all ${
              duringTime
              }s ${
              easing
              }`,
            'z-index': this.count + 1,
            opacity: 1,
          });

          // dot栏样式改变
          oDotsItem.forEach((item: any, inx: number) => {
            inx === this.count
              ? utilityDOM.addClass(item, 'yyg-dot-item-active')
              : utilityDOM.removeClass(item, 'yyg-dot-item-active');
          });
        } else {
          utilityDOM.setCss(item, {
            transition: `all ${
              duringTime
              }s ${
              easing
              }`,
            'z-index': 0,
            opacity: 0,
          });
        }
      });

      this.count++;

    }, delayTime);

    oContentItem.forEach((item: any) => {
      item.addEventListener('transitionend', () => {
        if (this.count > oContentItemLength - 1) {
          this.count = 0;
        }
      }, false);
    });

  }

  /**
   * 处理 鼠标 点击切换
   */
  public handleArrowClick(): void {
    const oNextArrow = this.oNextWrapper;
    const oPrevArrow = this.oPrevWrapper;

    oNextArrow.addEventListener('click', () => {
      this.aidedArrowClick('next');
    }, false);

    oPrevArrow.addEventListener('click', () => {
      this.aidedArrowClick('prev');
    }, false);
  }

  /**
   * 处理 dot栏hover
   */
  public handleDotsHover(): void {
    const {
      showDots,
    } = Fade.defaultConfig;
    const oDotsItem = this.oDotsItem;

    showDots && oDotsItem.forEach((item: any) => {
      const oSignId: number = Number(utilityDOM.getAttr(
        item,
        'data-id',
      ));

      item.addEventListener('mouseenter', () => {
        clearInterval(this.timer);

        this.aidedSetDotAndImg(oSignId - 1);
      }, false);

      item.addEventListener('mouseleave', () => {
        // 更新索引
        this.count = oSignId - 1;
        this.handleAutoPlay();
      }, false);
    });
  }

  /**
   * 处理 图片hover
   */
  public handleImgHover(): void {
    const oArrowWrapper = this.oArrowWrapper;
    const oContentItem = this.oContentItem;
    const oPrevArrow = this.oPrevWrapper;
    const oNextArrow = this.oNextWrapper;

    // 箭头hover(处理bug)
    oArrowWrapper.forEach((item: any) => {
      utilityDOM.setCss(item, {
        display: 'block',
      });

      item.addEventListener('mouseenter', () => {
        utilityDOM
          .addClass(oPrevArrow, 'yyg-prev-wrapper-active')
          .addClass(oNextArrow, 'yyg-next-wrapper-active');
      }, false);
    });

    oContentItem.forEach((item: any) => {
      item.addEventListener('mouseenter', () => {
        clearInterval(this.timer);

        utilityDOM
          .addClass(oPrevArrow, 'yyg-prev-wrapper-active')
          .addClass(oNextArrow, 'yyg-next-wrapper-active');
      }, false);

      item.addEventListener('mouseleave', () => {
        utilityDOM
          .removeClass(oPrevArrow, 'yyg-prev-wrapper-active')
          .removeClass(oNextArrow, 'yyg-next-wrapper-active');

        this.handleAutoPlay();
      }, false);
    });
  }

  /**
   * 箭头点击辅助函数
   * @param direction 哪个箭头
   */
  public aidedArrowClick(
    direction: 'prev' | 'next',
  ): void {
    const oContentItemLength = this.oContentItemLength;

    clearInterval(this.timer);

    switch (direction) {
      case 'prev':
        this.count--;
        this.count = this.count < 0
          ? oContentItemLength - 1
          : this.count;
        break;
      case 'next':
        this.count++;
        this.count = this.count > oContentItemLength - 1
          ? 0
          : this.count;
        break;
      default:
        break;
    }

    this.aidedSetDotAndImg(this.count);

    this.handleAutoPlay();
  }

  /**
   * 辅助 设置图片轮播,dot栏对应样式
   * @param sign
   */
  public aidedSetDotAndImg(
    sign: number,
  ): void {
    const {
      duringTime,
      easing,
    } = Fade.defaultConfig;
    const oContentItem = this.oContentItem;
    const oDotsItem = this.oDotsItem;

    oContentItem.forEach((item: any, index: number) => {
      sign === index
        ? utilityDOM
          .setCss(item, {
            transition: `all ${duringTime}s ${easing}`,
            opacity: 1,
            'z-index': index,
          })
          .addClass(oDotsItem[index], 'yyg-dot-item-active')
        : utilityDOM
          .setCss(item, {
            transition: `all ${duringTime}s ${easing}`,
            opacity: 0,
            'z-index': 0,
          })
          .removeClass(
            oDotsItem[index],
            'yyg-dot-item-active'
          )
    })
  }
}