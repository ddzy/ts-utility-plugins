/**
 * @name: business-carousel
 * @description 业务轮播插件
 * @author: yyg
 * @version 1.0.4
 * @constant 最近修改于 18/10/13
 */


/**
 * dataSource: 数据
 * afterChange: 切换后的回调
 * beforeChange: 切换前的回调
 * autoPlay: 是否自动切换
 * showDots: 是否显示导航点
 * showArrows: 是否显示箭头
 * easing: 动画效果
 * effect: 切换效果 Scroll | scroll
 * vertical: 垂直显示
 * delayTime: 自动滚动延迟时间
 * duringTime: 过渡时间
 * isHoverPause: 鼠标放置是否停止轮播
 */

namespace Carousel {


  export let yyg_el: HTMLElement | null = null;


  const yyg_settings = {
    dataSource: [],
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
  }


  export namespace IProps {

    export interface IConfigProps {
      dataSource: {
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

    export interface IMainScrollProps { }

    export interface IMainFadeProps { }
  }


  export function config(
    options: IProps.IConfigProps,
  ): any {
    Init.initSettings(options);

    return Carousel;
  }


  export function render(el: string): void {
    Init.initEl(el);
    Init.initWhichEffect();
  }


  namespace Init {
    export function initSettings(
      options: any
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];

          Reflect.set(yyg_settings, key, element);
        }
      }
    }

    export function initEl(el: string) {
      if (Utils.getEle(el)) {
        yyg_el = Utils.getEle(el);
      } else {
        throw new Error('el不存在, 请输入其他的!');
      }
    }

    // 调用轮播图
    export function initWhichEffect(): void {
      switch (yyg_settings.effect) {
        case 'scroll':
          new Main.Scroll({});
          break;
        case 'fade':
          new Main.Fade({});
          break;
        default:
          break;
      }
    }
  }


  namespace Utils {

    let lastClickTime: number = 0;

    /**
     * 获取元素
     * @param id 元素id
     */
    export function getEle(
      sign: string,
    ): HTMLElement | null {
      return document.querySelector(sign) || null;
    }


    /**
     * 获取元素集合
     * @param sign 索引
     */
    export function getAllEle(
      sign: string,
    ): ArrayLike<HTMLElement> | null {
      return document.querySelectorAll(sign);
    }


    /**
     * 设置元素属性
     * @param ele 元素
     * @param options 属性配置
     */
    export function setAttr(
      ele: HTMLElement,
      options: any,
    ): any {

      for (const key in options) {
        ele.setAttribute(key, options[key]);
      }

      return Utils;
    }


    /**
     * 设置元素样式
     * @param el 元素
     * @param options 属性配置
     */
    export function setCss(
      ele: HTMLElement,
      options: any,
    ): any {
      for (const item in options) {
        if (options.hasOwnProperty(item)) {
          ele.style.cssText += `${item}: ${options[item]};`;
        }
      }

      return Utils;
    }


    /**
     * 取随机值
     * @param min 最小值
     * @param max 最大值
     */
    export function getRandom(
      min: number,
      max: number,
    ): number {
      return (Math.random() * (max - min) + min);
    }


    /**
     * 转化弧度
     * @param angle 角度
     */
    export function getRadian(
      angle: number
    ): number {
      return (Math.PI / 180) * angle;
    }


    /**
     * 获取元素属性值
     * @param ele 元素
     * @param key 属性名
     */
    export function getAttr(
      ele: HTMLElement,
      key: string,
    ): string | null {
      return ele.getAttribute(key);
    }


    /**
     * 添加类名
     * @param el 元素
     * @param className 类名
     */
    export function addClass(
      el: HTMLElement | null,
      className: string,
    ): any {
      el && el.classList.add(className);

      return Utils;
    }


    /**
     * 移除类名
     * @param el 元素
     * @param className 类名
     */
    export function removeClass(
      el: HTMLElement | null,
      className: string,
    ): any {
      el && el.classList.remove(className);

      return Utils;
    }


    /**
     * 节流
     * @param time 过渡时间
     * @param callback 回调函数
     */
    export function throttle(
      time: number,
      callback: () => void,
    ) {
      const currentClickTime: number = new Date().getTime();

      if (
        currentClickTime - lastClickTime >= time
      ) {
        callback();

        lastClickTime = currentClickTime;
      }
    }

  };


  namespace Main {

    export class Scroll {

      private static MIN_CLICK_DELAY_TIME: number = yyg_settings.duringTime * 1000 || 1500;

      /**
       * 自动轮播辅助函数
       */
      private static _aidedAutoScroll(
        count: number,
        oList: any,
        oListWidth: number,
        oItemLength: number,
      ): void {
        Utils.setCss(oList, {
          transition: `all ${yyg_settings.duringTime}s ${yyg_settings.easing}; `,
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
          Utils.removeClass(outer, 'yyg-dot-item-active');
        }

        if (count === oItemLength - 1) {
          Utils.addClass(oDotsItem[0], 'yyg-dot-item-active');
        } else if (++count === 1) {
          Utils.addClass(
            oDotsItem[oItemLength - 3],
            'yyg-dot-item-active',
          );
        } else {
          Utils.addClass(
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
        _props: IProps.IMainScrollProps,
      ) {
        this.initDOM();
      }


      public initDOM(): void {
        if (yyg_el) {
          // 初始化DOM结构
          yyg_el.innerHTML = this.createDOMTree();
          this.createStyle();

          // 初始化公共对象(优化)
          this.initCommonEle();

          yyg_settings.autoPlay
            && this.handleAutoScroll();
          yyg_settings.isHoverPause
            && this.handleImgHover();
          yyg_settings.showDots
            && this.handleDotsHover();
          yyg_settings.showArrows
            && this.handleArrowClick();
          yyg_settings.showArrows
            && this.handleArrowHover();
        }
      }


      /**
       * 初始化通用对象
       */
      public initCommonEle(): void {
        this.oList = Utils
          .getEle('.yyg-content-list') as HTMLUListElement;
        this.oListWidth = this.oList.offsetWidth;
        this.oDotsItem = Utils.getAllEle('.yyg-dot-item');
        this.oListItem = Utils.getAllEle('.yyg-content-item');
        this.oPrevArrow = Utils.getEle('.yyg-arrow-prev-wrapper');
        this.oNextArrow = Utils.getEle('.yyg-arrow-next-wrapper');
        this.oItemLength = this.oListItem.length;
        this.oItemWidth = this.oListWidth / this.oItemLength;
      }


      public createDOMTree(): string {
        const dataSource: any[] = yyg_settings.dataSource;
        const { showArrows, showDots } = yyg_settings;
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
        let oStyle: HTMLElement | null = Utils
          .getEle('style');
        const { dataSource } = yyg_settings;

        // style标签不存在
        if (!oStyle) {
          oStyle = document.createElement('style');
          const oHead = Utils
            .getEle('head') as HTMLHeadElement;

          oHead.appendChild(oStyle);
        }

        oStyle.innerText += `
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
            // transition: all ${yyg_settings.duringTime}s ${yyg_settings.easing};
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
          yyg_settings.beforeChange
            && yyg_settings.beforeChange();

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

        }, yyg_settings.delayTime);

        // 无缝检测
        oList.addEventListener('transitionend', () => {
          // 执行钩子函数
          yyg_settings.afterChange
            && yyg_settings.afterChange();

          if (this.count > oItemLength) {
            this.count = 2;

            Utils.setCss(oList, {
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

              this.aidedHandleArrowVisible(yyg_settings.showArrows);
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
        const oDotsWrapper = Utils
          .getEle('.yyg-dots-wrapper') as HTMLDivElement;

        Utils.setCss(oDotsWrapper, {
          display: 'block',
        });

        for (let i = 0, outer: any; outer = oDotsItem[i++];) {

          outer.addEventListener('mouseenter', () => {

            const signId = Utils
              .getAttr(outer, 'data-id') as string;

            // 清除定时器
            clearInterval(this.timer);

            // 同步count
            this.count = Number(signId);

            // dot栏样式改变
            for (let j = 0, inner; inner = oDotsItem[j++];) {
              Utils.removeClass(inner, 'yyg-dot-item-active');
            }
            Utils.addClass(outer, 'yyg-dot-item-active');

            // 同步轮播
            Utils.setCss(oList, {
              transition: `all ${yyg_settings.duringTime}s ${yyg_settings.easing}; `,
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

          Utils.setCss(oList, {
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
        Utils.throttle(Scroll.MIN_CLICK_DELAY_TIME, () => {

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

          Utils.setCss(oList, {
            transition: `all ${
              yyg_settings.duringTime
              }s ${yyg_settings.easing}`,
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
          Utils.addClass(
            oPrevArrow,
            'yyg-prev-wrapper-active'
          );
          Utils.addClass(
            oNextArrow,
            'yyg-next-wrapper-active'
          );
        } else {
          Utils.removeClass(
            oPrevArrow,
            'yyg-prev-wrapper-active'
          );
          Utils.removeClass(
            oNextArrow,
            'yyg-next-wrapper-active',
          );
        }
      }
    }


    export class Fade {

      private oContentItem: any = null;
      private oArrowWrapper: any = null;
      private oPrevWrapper: any = null;
      private oNextWrapper: any = null;
      private oDotsItem: any = null;
      private oContentItemLength: number = 0;

      private timer: any = 0;
      private count: number = 0;

      public constructor(
        _props: IProps.IMainFadeProps
      ) {
        this.init();
      }

      public init(): void {
        if (yyg_el) {
          const {
            showArrows,
            showDots,
            autoPlay,
          } = yyg_settings;

          yyg_el.innerHTML = this.createDOM();
          this.createStyle();

          this.initCommonEle();

          autoPlay && this.handleAutoPlay();
          showArrows && this.handleArrowClick();
          showArrows && this.handleImgHover();
          showDots && this.handleDotsHover();
        }
      }

      public createDOM(): string {
        const dataSource: any[] = yyg_settings.dataSource;
        const { showArrows, showDots } = yyg_settings;
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
        let oStyle: HTMLElement | null = Utils
          .getEle('style');
        const { dataSource } = yyg_settings;

        // style标签不存在
        if (!oStyle) {
          oStyle = document.createElement('style');
          const oHead = Utils
            .getEle('head') as HTMLHeadElement;

          oHead.appendChild(oStyle);
        }

        oStyle.innerText += `
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
        this.oContentItem = Utils.getAllEle('.yyg-content-item');
        this.oDotsItem = Utils.getAllEle('.yyg-dot-item');
        this.oArrowWrapper = Utils.getAllEle('.yyg-arrow-wrapper');
        this.oPrevWrapper = Utils.getEle('.yyg-arrow-prev-wrapper');
        this.oNextWrapper = Utils.getEle('.yyg-arrow-next-wrapper');
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
        } = yyg_settings;
        const oContentItem = this.oContentItem;
        const oDotsItem = this.oDotsItem;
        const oContentItemLength = this.oContentItemLength;

        this.timer = setInterval(() => {

          oContentItem.forEach((item: any, index: number) => {
            if (index === this.count) {
              Utils.setCss(item, {
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
                  ? Utils.addClass(item, 'yyg-dot-item-active')
                  : Utils.removeClass(item, 'yyg-dot-item-active');
              });
            } else {
              Utils.setCss(item, {
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
        } = yyg_settings;
        const oDotsItem = this.oDotsItem;

        showDots && oDotsItem.forEach((item: any) => {
          const oSignId: number = Number(Utils.getAttr(
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
          Utils.setCss(item, {
            display: 'block',
          });

          item.addEventListener('mouseenter', () => {
            Utils
              .addClass(oPrevArrow, 'yyg-prev-wrapper-active')
              .addClass(oNextArrow, 'yyg-next-wrapper-active');
          }, false);
        });

        oContentItem.forEach((item: any) => {
          item.addEventListener('mouseenter', () => {
            clearInterval(this.timer);

            Utils
              .addClass(oPrevArrow, 'yyg-prev-wrapper-active')
              .addClass(oNextArrow, 'yyg-next-wrapper-active');
          }, false);

          item.addEventListener('mouseleave', () => {
            Utils
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
        } = yyg_settings;
        const oContentItem = this.oContentItem;
        const oDotsItem = this.oDotsItem;

        oContentItem.forEach((item: any, index: number) => {
          sign === index
            ? Utils
              .setCss(item, {
                transition: `all ${duringTime}s ${easing}`,
                opacity: 1,
                'z-index': index,
              })
              .addClass(oDotsItem[index], 'yyg-dot-item-active')
            : Utils
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

  }

}


Carousel.config({
  dataSource: [{
    text: 'Slide One',
    img: {
      url: 'https://img.alicdn.com/tps/i4/TB11ULPd3HqK1RjSZFPSuwwapXa.jpg_q90_.webp',
      target: '#',
    },
  }, {
    text: 'Slide Two',
    img: {
      url: 'https://img.alicdn.com/tfs/TB1Kc14ekvoK1RjSZFwXXciCFXa-520-280.png_q90_.webp',
      target: '',
    },
  }, {
    text: 'Slide Three',
    img: {
      url: 'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
      target: '',
    },
  }, {
    text: 'Slide Four',
    img: {
      url: 'https://img.alicdn.com/tfs/TB1twNrdgDqK1RjSZSyXXaxEVXa-520-280.jpg_q90_.webp',
      target: '',
    },
  }],
  showArrows: true,
  showDots: true,
  autoPlay: true,
  easing: 'ease-in-out',
  delayTime: 2000,
  isHoverPause: true,
  duringTime: 1,
  effect: 'fade',
}).render('#app');

