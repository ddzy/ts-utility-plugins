/**
 * create_time: 18-9-30
 * author: yyg
 */

interface ILineProps {
  el?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  lineColor?: string;
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


class Line {

  /**
   * 创建canvas
   */
  public static _createNew(): HTMLCanvasElement {
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
      display: 'block',
    });

    return Utils.getEle('yyg-stars-line') as HTMLCanvasElement;
  }

  private el: any;

  private pen: any;

  private width: number;

  private height: number;

  private bgColor: string;

  private lineColor: string;

  public constructor(
    options: ILineProps,
  ) {
    this.el = Utils.getEle(options.el || '') || Line._createNew();
    this.pen = this.el.getContext('2d');
    this.width = options.width || Utils.getWinRange().winWidth;
    this.height = options.height || Utils.getWinRange().winHeight;
    this.bgColor = options.bgColor || '#000';
    this.lineColor = options.lineColor || '#fff';

    this.initCanvas();
    this.draw();
  }

  public initCanvas(): void {
    Utils.setAttr(this.el, {
      width: this.width,
      height: this.height,
    })
    Utils.setCss(this.el, {
      'background-color': this.bgColor,
      display: 'block',
    })
  }

  public draw(): void {
    const pen: any = this.pen;
    // 随机线起点
    const startPoint: {
      x: number,
      y: number,
    } = {
      x: Utils.getRandom(0, this.width),
      y: Utils.getRandom(0, this.height),
    };

    pen.save();
    pen.beginPath();
    pen.moveTo(
      startPoint.x,
      startPoint.y,
    );
    pen.lineTo(
      startPoint.x + Utils.getRandom(5, 10),
      startPoint.y + Utils.getRandom(5, 10),
    );
    pen.closePath();
    pen.strokeStyle = this.lineColor;
    pen.lineWidth = 2;
    pen.stroke();
    pen.restore();
  }
    
};



const line = new Line({
  el: 'stars-line',
  bgColor: '#000',
});



