/**
 * 滑动轮播
 */

import utilityDOM from '../../../utility/dom/index';

import { ICarouselConfigProps } from '..';


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
    config: ICarouselConfigProps,
  ) {
    this.initSettings(config);
    this.initDOM();
  }

  public initSettings(
    config: ICarouselConfigProps,
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
    const {
      dataSource,
      container,
    } = Scroll.defaultConfig;

    // style标签不存在
    if (!oStyle) {
      oStyle = document.createElement('style');
      const oHead = utilityDOM
        .getEle('head') as HTMLHeadElement;

      oHead.appendChild(oStyle);
    }

    oStyle.innerText += `
      ${container} p, ${container} ul {
        margin: 0;
        padding: 0;
      }
      ${container} ul {
        list-style-type: none;
      }
      ${container} .yyg-carousel-container {
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        border: 5px solid #1890ff;
        border-radius: 20px;
      }
      ${container} .yyg-carousel-main {
        position: relative;
        height: 100%;
      }
      ${container} .yyg-arrow-wrapper {
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
      ${container} .yyg-arrow-prev-wrapper {
        left: -10px;
      }
      ${container} .yyg-arrow-next-wrapper {
        right: -10px;
      }
      ${container} .yyg-content-wrapper {
        overflow: hidden;
        height: 100%;
      }
      ${container} .yyg-content-list {
        width: ${(dataSource.length + 2) * 100}%;
        height: 100%;
        // transition: all ${Scroll.defaultConfig.duringTime}s ${Scroll.defaultConfig.easing};
        transform: translateX(-${
      100 / (dataSource.length + 2)
        }%);
      }
      ${container} .yyg-content-item {
        float: left;
        width: ${100 / (dataSource.length + 2)}%;
        height: 100%;
        text-align: center;
      }
      ${container} .yyg-content-item a img {
        display: block;
        max-width: 100%;
        // width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      ${container} .yyg-dots-wrapper {
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
      ${container} .yyg-dot-item {
        display: inline-block;
        margin-left: 5px;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-radius: 50%;
        transition: all .5s ease-in-out;
      }
      ${container} .yyg-dot-item:last-child {
        margin-right: 5px;
      }
      ${container} .yyg-dot-item-active {
        background-color: #d50;
      }
      ${container} .yyg-prev-wrapper-active {
        left: 15px;
        opacity: 1;
      }
      ${container} .yyg-next-wrapper-active {
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