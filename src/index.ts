/**
 * create_time: 18-9-30
 * author: yyg
 */

namespace IProps {
  export interface ILineProps {

  }
  export interface IBallProps {
    centerPoint: { x: number, y: number };
    radius: number;
    color: string;
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
   * 获取窗口宽高
   */
  export function getWinRange(): {
    winWidth: number,
    winHeight: number,
  } {
    return {
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    };
  }


  /**
   * 设置元素属性
   * @param ele 元素
   * @param options 属性配置
   */
  export function setAttr(
    ele: HTMLElement,
    options: any,
  ): HTMLElement {
    for (const key in options) {
      ele.setAttribute(key, options[key]); 
    }

    return ele;
  }

  
  /**
   * 设置元素样式
   * @param el 元素
   * @param options 属性配置
   */
  export function setCss(
    ele: HTMLElement,
    options: any,
  ): HTMLElement {
    for(const item in options) {
      if(options.hasOwnProperty(item)) {
        ele.style.cssText += `${item}: ${options[item]};`;
      }
    }

    return ele;
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
    return ~~(Math.random()*(max-min)+min);
  }

};


namespace InitCanvas {
  export function initCanvas(): any {
    const oBody = Utils.getEle('body') as HTMLBodyElement;
    const oCanvas = Utils.getEle('#stars-line') as HTMLCanvasElement;
    const { winHeight, winWidth, } = Utils.getWinRange();
    const pen: any = oCanvas && oCanvas.getContext('2d');

    Utils.setAttr(oCanvas, {
      width: winWidth,
      height: winHeight,
    })
    Utils.setCss(oCanvas, {
      display: 'block',
      'background-color': '#000',
    });
    Utils.setCss(oBody, {
      margin: 0,
      overflow: 'hidden',
    });

    return pen;
  }
}


const pen: any = InitCanvas.initCanvas();


namespace StarsLine {
  
  /**
   * 星空线
   */
  export class Line {
    private startPoint: {
      x: number,
      y: number,
    } = {
      x: 0,
      y: 0,
    };
 
  }

  /**
   * 星空点
   */
  export class Ball {
    private readonly centerPoint: {
      x: number,
      y: number,
    };
    private readonly radius: number;
    private readonly color: string;

    public constructor(
      props: IProps.IBallProps
    ) {
      this.centerPoint = props.centerPoint;
      this.radius = props.radius;
      this.color = props.color;
    }

    public draw(): void {
      pen.save();
      pen.beginPath();
      pen.arc();
      pen.closePath();
      pen.restore();
    }
  }
}


