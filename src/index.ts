/**
 * create_time: 18-9-30
 * author: yyg
 */

interface ILineProps {
  el?: string;
};


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
      if (options.hasOwnProperty(key)) {
        ele.setAttribute(key, options.key);
      }
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

};


class Line {

  /**
   * 创建canvas
   */
  public static createNew(): HTMLCanvasElement {
    const oCanvas: HTMLCanvasElement = document.createElement('canvas');
    const oBody: HTMLElement = document.body;
    const { winWidth, winHeight } = Utils.getWinRange();

    oBody.appendChild(oCanvas);

    Utils.setAttr(oCanvas, {
      id: 'yyg-stars-line',
      width: winWidth,
      height: winHeight,
    });
    Utils.setCss(oCanvas, {
      'background-color': '#000',
    });

    return Utils.getEle('yyg-stars-line') as HTMLCanvasElement;
  }

  private el: HTMLCanvasElement | null = null;

  private pen: any = null;

  public constructor(
    options: ILineProps = {},
  ) {
    this._init(options);
  }

  /**
   * 初始化星空线
   * @param options 配置项
   */
  public _init(
    options: ILineProps,
  ): void {
    
  }
  

};



