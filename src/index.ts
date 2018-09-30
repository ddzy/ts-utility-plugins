/**
 * create_time: 18-9-30
 * author: yyg
 */

interface ILineProps {

}
interface IBallProps {
  centerPoint: { x: number, y: number };
  radius: number;
  color: string;
}



const oCanvas: any = Utils.getEle('stars-line');
const pen: any = oCanvas && oCanvas.getContext('2d'); 


namespace Utils {

  /**
   * 获取元素
   * @param id 元素id
   */
  export function getEle(
    id: string,
  ): HTMLElement | null {
    return document.getElementById(id) || null;
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
    private radius: number;
    private color: string;

    public constructor(
      props: IBallProps
    ) {
      this.centerPoint = props.centerPoint;
      this.radius = props.radius;
      this.color = props.color;
    }
  }
}


