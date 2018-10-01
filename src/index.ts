/**
 * create_time: 18-9-30
 * author: yyg
 * complete: 699e921 => 完成自动连线功能
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


/**
 * 工具
 */
namespace Utils {

  /**
   * 连线安全距离
   */
  export const LINE_MIN_DISTANCE: number = 90;

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
    for (const item in options) {
      if (options.hasOwnProperty(item)) {
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


/**
 * 画布管理
 */
namespace InitCanvas {

  export const oCanvas = Utils
    .getEle('#stars-line') as HTMLCanvasElement
  
  export function initCanvas(): {
    pen: any,
    cvsWidth: any,
    cvsHeight: any,
  } {
    const oBody = Utils.getEle('body') as HTMLBodyElement;
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

  export function resizeCanvas(): void {
    window.addEventListener('resize', () => {
      const { winWidth, winHeight, } = Utils.getWinRange();
      
      Utils.setAttr(oCanvas, {
        width: winWidth,
        height: winHeight,
      });
    }, false);
  }
}


const {
  pen,
  cvsWidth,
  cvsHeight,
} = InitCanvas.initCanvas();
InitCanvas.resizeCanvas();
const ballArr: any[] = [];
let flag: boolean = false;
const mouse = {centerPoint: { x: 0, y: 0 }}


/**
 * 实体类
 */
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
      this.draw();
    }

    public draw(): void {
      pen.save();
      pen.beginPath();
      pen.moveTo(
        this.startPoint.x,
        this.startPoint.y,
      );
      pen.lineTo(
        this.endPoint.x,
        this.endPoint.y,
      );
      pen.lineCup = 'round';
      pen.strokeStyle = this.color;
      pen.stroke();
      pen.closePath();
      pen.restore();
    }

  }


  /**
   * 星空点
   */
  export class Ball {

    public readonly centerPoint: {
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
    }

    // 自动连线
    public drawLine(
      outerItem: Ball,
    ): void {
      for (const innerItem of ballArr) {
        if(
          outerItem !== innerItem && Math.sqrt(
            Math.pow((
              outerItem.centerPoint.x - innerItem.centerPoint.x),
              2) + Math.pow((
                outerItem.centerPoint.y - innerItem.centerPoint.y), 
              2)
          ) < Utils.LINE_MIN_DISTANCE
        ) {
          new Line({
            color: '#d50',
            startPoint: {
              x: outerItem.centerPoint.x,
              y: outerItem.centerPoint.y,
            },
            endPoint: {
              x: innerItem.centerPoint.x,
              y: innerItem.centerPoint.y,
            },
          });
        }
      }
    }

    // 鼠标移动
    // public drawLineByMouse(
    //   centerPoint: { x: number, y: number },
    //   mousePoint: { x: number, y: number },
    // ): void {
    //   if(
    //     Math.sqrt(
    //       Math.pow((
    //         centerPoint.x - mousePoint.x),
    //         2) + Math.pow((
    //           centerPoint.y - mousePoint.y), 
    //         2)
    //     ) < 100
    //   ) {
    //     new Line({
    //       color: '#d50',
    //       startPoint: {
    //         x: centerPoint.x,
    //         y: centerPoint.y,
    //       },
    //       endPoint: {
    //         x: mousePoint.x,
    //         y: mousePoint.y,
    //       },
    //     });
    //   }
    // }
  }
}


/**
 * 渲染
 */
namespace Render {

  /**
   * 创建点工厂
   */
  function createBallFactory(): void {
    const ball = new StarsLine.Ball({
      color: '#fff',
      radius: Utils.getRandom(1, 3),
    });
    ballArr.push(ball);
    ball.draw();
  }

  /**
   * 星空点
   * @param num 点数量
   */
  export function create(
    num: number,
  ) {
    for(let i = 0; i < num; i++) {
      createBallFactory();
    }
  }

  /**
   * 星空点移动
   */
  export function move(): void {
    // pen.clearRect(0, 0, cvsWidth, cvsHeight);
    // for (const item of ballArr) {
    //   item.move();
    //   item.draw();
    //   item.drawLine(item);
    // }

    pen.clearRect(0, 0, cvsWidth, cvsHeight);

    InitCanvas.oCanvas.addEventListener('mousemove', (
      e: MouseEvent,
    ) => {
      flag = true;
      mouse.centerPoint.x = e.clientX;
      mouse.centerPoint.y = e.clientY;
    }, false);

    if(!flag) {
      for (const item of ballArr) {
        item.move();
        item.draw();
        item.drawLine(item);
      }
    }else {
      for (const item of ballArr) {
        item.move();
        item.draw();
        item.drawLine(mouse);
      }
    }

    window.requestAnimationFrame(move);
  }


  export function moveWithMouse(): void {
    InitCanvas.oCanvas.addEventListener('mousemove', (
      e: MouseEvent
    ) => {
      flag = true;      
      for (const item of ballArr) {
        item.drawLineByMouse(item.centerPoint, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    }, false);
  }
}


Render.create(50);
Render.move();

