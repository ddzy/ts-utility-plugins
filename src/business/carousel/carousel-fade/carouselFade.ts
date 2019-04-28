/**
 * 淡入轮播
 */

import utilityDOM from '../../../utility/dom/index';

import { IConfigProps } from '../index.new';


export default class Fade {
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
    const {
      dataSource,
      container,
    } = Fade.defaultConfig;

    // style标签不存在
    if (!oStyle) {
      oStyle = document.createElement('style');
      const oHead = utilityDOM
        .getEle('head') as HTMLHeadElement;

      oHead.appendChild(oStyle);
    }

    oStyle.innerText += `
      ${container} ul, p {
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
        // height: 100%;
        height: 300px;
      }
      ${container} .yyg-arrow-wrapper {
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
      ${container} .yyg-arrow-prev-wrapper {
        left: 0;
      }
      ${container} .yyg-arrow-next-wrapper {
        right: 0;
      }
      ${container} .yyg-content-wrapper {
        overflow: hidden;
        height: 100%;
      }
      ${container} .yyg-content-list {
        position: relative;
        height: 100%;
      }
      ${container} .yyg-content-item {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        opacity: 0;
      }
      ${container} .yyg-content-item:first-child {
        opacity: 1;
        z-index: 0;
      }
      ${container} .yyg-content-item a img {
        display: block;
        max-width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      ${container} .yyg-dots-wrapper {
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