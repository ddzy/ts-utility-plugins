/**
 * create_time: 18-9-30
 * author: yyg
 */

namespace IProps {
  export interface ILineProps {
    startPoint: { x: number, y: number };
    endPoint: { x: number, y: number };
    color: string;
  }
  export interface IBallProps {
    centerPoint?: { x: number, y: number };
    radius: number;
    color: string;
    speed?: number;
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
    return (Math.random()*(max-min)+min);
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


namespace InitCanvas {
  export function initCanvas(): {
    pen: any,
    cvsWidth: any,
    cvsHeight: any,
  } {
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

    return {
      pen,
      cvsWidth: Number(Utils.getAttr(oCanvas, 'width')),
      cvsHeight: Number(Utils.getAttr(oCanvas, 'height')),
    };
  }
}


const {
  pen,
  cvsWidth,
  cvsHeight,
} = InitCanvas.initCanvas();


namespace StarsLine {
  
  /**
   * 星空线
   */
  export class Line {
    
    private readonly startPoint: {
      x: number,
      y: number,
    }
    private readonly endPoint: {
      x: number,
      y: number,
    }
    private readonly color: string;

    public constructor(
      props: IProps.ILineProps,
    ) {
      this.startPoint = props.startPoint;
      this.endPoint = props.endPoint;
      this.color = props.color;
    }
 
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
    private readonly speed: number;
    private readonly distance: {
      x: number,
      y: number,
    }

    public constructor(
      props: IProps.IBallProps
    ) {
      this.centerPoint = props.centerPoint || {
        x: Utils.getRandom(0, cvsWidth),
        y: Utils.getRandom(0, cvsHeight),
      };
      this.radius = props.radius;
      this.color = props.color;
      this.speed = props.speed || 10;
      this.distance = {
        x: Utils.getRandom(-.5, .5),
        y: Utils.getRandom(-.5, .5),
      };
    }

    public draw(): void {
      pen.save();
      pen.beginPath();
      pen.fillStyle = this.color;
      pen.arc(
        this.centerPoint.x,
        this.centerPoint.y,
        this.radius,
        0,
        Utils.getRadian(360)
      );
      pen.fill();
      pen.closePath();
      pen.restore();
    }

    public move(): void {
      this.centerPoint.x += this.distance.x;
      this.centerPoint.y += this.distance.y;

      // 碰撞检测
      this.distance.x = (this.centerPoint.x > cvsWidth 
        || this.centerPoint.x < 0)
        ? -this.distance.x
        : this.distance.x;
      this.distance.y = (this.centerPoint.y > cvsHeight
        || this.centerPoint.y < 0)
        ? -this.distance.y
        : this.distance.y;

      // 连线
      this.drawLine();
    }

    public drawLine(): void {
      const centerPoint = this.centerPoint;


    }
  }
}





/**
 * 测试
 */
// const ballCollection: StarsLine.Ball[] = [];

// function create(): void {
//   const ball = new StarsLine.Ball({
//     color: '#fff',
//     radius: Utils.getRandom(2, 5),
//   });
//   ballCollection.push(ball);
//   ball.draw();
// }

// for(let i = 0; i < 200; i++) {
//   create();
// }

// function move() {
//   pen.clearRect(0, 0, cvsWidth, cvsHeight);
//   for (const item of ballCollection) {
//     item.move();
//     item.draw();
//   }

//   window.requestAnimationFrame(move);
// }

// window.requestAnimationFrame(move);

