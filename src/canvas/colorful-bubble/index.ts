/**
 * @name canvas-colorful-bubble
 * @description 五彩气泡背景插件
 * @author yyg
 * @version 1.0.1
 */

/**
 * @param cvsWidth number 画布宽
 * @param cvsHeight number 画布高
 * @param cvsBgColor string 画布背景
 * @param bubbleNum number 气泡数量
 * @param bubbleOpacity number 气泡透明度
 * @param bubbleSpeed number 气泡移动速度
 * @param allowMouse boolean 是否允许鼠标交互
 * @param bubbleColorArr string[] 气泡颜色数组
 */

namespace ColorfulBubble {
  
  export const yyg_settings: IProps.IConfigProps = {
    cvsWidth: 500,
    cvsHeight: 500,
    cvsBgColor: '#000',
    bubbleNum: 20,
    bubbleOpacity: 1,
    bubbleSpeed: 1,
    bubbleColorArr: [
      '#1890ff', '#f5222d', '#fa8c16', '#faad14',
      '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
      '#2f5418', '#722ed1', '#eb2f96', '#fa541c',
    ],
    allowMouse: true,
  }
  export let yyg_el: any = null;
  export let yyg_pen: any = null;


  export function config(
    _props: IProps.IConfigProps,
  ) {
    Init.initSettings(_props);

    return ColorfulBubble;
  }


  export function render(
    el: string,
  ) {
    Init.initCvsEl(el);
    Init.initBubble();

    return ColorfulBubble;
  }


  export namespace IProps {
    export interface IConfigProps {
      cvsWidth?: number,
      cvsHeight?: number,
      cvsBgColor?: string,
      bubbleNum?: number,
      bubbleOpacity?: number,
      bubbleSpeed?: number,
      bubbleColorArr?: string[],
      allowMouse?: boolean,
    }
  }


  namespace Init {
    export function initSettings(
      _props: any
    ) {
      for (const key in _props) {
        if (_props.hasOwnProperty(key)) {
          const element = _props[key];
          Reflect.set(yyg_settings, key, element);
        }
      }
    }

    export function initCvsEl(
      el: string
    ) {
      if (
        Utils.getEle(el)
      ) {
        const e = Utils.getEle(el) as any;
        
        if (e.localName === 'canvas') {
          yyg_el = e;
          yyg_pen = e.getContext('2d');
        } else {
          throw new Error('请传入canvas元素!');
        }
      } else {
        throw new Error('元素不存在!');
      }
    }

    export function initBubble() {
      new Bubble();
    }
  }


  namespace Utils {
    export function getEle(
      el: string,
    ): HTMLElement | null {
      return document
        .querySelector(el);
    }
  }


  class Bubble {
    public constructor() {}

    public draw(): void {
      yyg_pen.save();
      yyg_pen.beginPath();
      
      yyg_pen.closePath();
      yyg_pen.restore();
    }
  }
}


const cb = ColorfulBubble
  .config({
    cvsWidth: 500,
    cvsHeight: 600,
  })
  .render('#colorful-bubble');
