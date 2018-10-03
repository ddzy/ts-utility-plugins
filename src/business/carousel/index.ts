/**
 * @name: business-carousel 业务轮播
 * @author: yyg
 * @version 1.0.0
 */


/**
 * width: 宽
 * height: 高
 * dataSource: 数据
 * afterChange: 切换后的回调
 * beforeChange: 切换前的回调
 * autoPlay: 是否自动切换
 * showDots: 是否显示导航点
 * showArrows: 是否显示箭头
 * easing: 动画效果
 * effect: 切换效果 fade | scroll
 * vertical: 垂直显示
 * duringTime: 间隔时间
 */

namespace Carousel {


  export let yyg_el: HTMLElement | null = null;


  const yyg_settings = {
    width: 0,
    height: 0,
    dataSource: [],
    autoPlay: false,
    showDots: false,
    showArrows: false,
    easing: 'linear',
    effect: 'scroll',
    vertical: false,
    duringTime: 3,
  } as object


  export namespace IProps {

    export interface IConfigProps {
      dataSource: [{ text: string, url: string }];
      width?: number;
      height?: number;
      autoPlay?: boolean;
      showDots?: boolean;
      showArrows?: boolean;
      easing?: string;
      effect?: string;
      vertical?: boolean;
      duringTime?: number;
      beforeChange?: () => void;
      afterChange?: () => void;
    }

    export interface IMainFadeProps {}
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
      if(Utils.getEle(el)) {
        yyg_el = Utils.getEle(el);
      }else {
        throw new Error('el不存在, 请输入其他的!');
      }
    }

    // 调用轮播图
    export function initWhichEffect(): void {
      new Main.Fade({});
    }
  }


  namespace Utils {
  
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
  
  };
  

  namespace Main {

    export class Fade {

      public constructor(
        _props: IProps.IMainFadeProps,
      ) {
        this.initDOM();
      }
      
      public initDOM(): void {
        this.createDOMTree();
      }

      public createDOMTree(): string {
        console.log(yyg_el);
        return '';
      }

    }

  }

}


Carousel.config({
  dataSource: [{
    text: 'Slide One',
    url: '',
  }],
  width: 600,
  height: 200,
}).render('#app');

  