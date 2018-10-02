/**
 * create_time: 18-9-30
 * author: yyg
 */

 /**
  * config {
  *   cvsWidth: 画布宽
  *   cvsHeight: 画布高
  *   cvsBgColor: 画布背景颜色
  *   ballNum: 星空点数量
  *   allowMouse: 是否允许鼠标交互
  *   lineColor: 连线颜色
  *   lineWidth: 连线宽度
  *   ballSpeed: 星空点移动速度 default: 1
  *   ballColor: 星空点颜色
  * }
  */


namespace YYG {

  export let yyg_el: any = null;

  let yyg_cvsWidth: number = 500;
  let yyg_cvsHeight: number = 500;
  let yyg_cvsBgColor: string = '#000';
  let yyg_ballNum: number = 100;
  let yyg_allowMouse: boolean = true;
  let yyg_lineColor: string = '#d50';
  let yyg_lineWidth: number = 1;
  let yyg_ballSpeed: number = 1;
  let yyg_ballColor: string = '#fff';

  let yyg_pen: any = null;
  let yyg_ballArr: any[] = [];
  let yyg_flag: boolean = false;
  const yyg_MOUSE_POINT: {
    centerPoint: { x: number, y: number }
  } = {
    centerPoint: { x: 0, y: 0 },
  };




  
  export namespace IProps {
    export interface ILineProps {
      startPoint: { x: number, y: number };
      endPoint: { x: number, y: number };
      lineColor?: string;
      lineWidth?: number;
    }
    export interface IBallProps {
      centerPoint?: { x: number, y: number };
      radius: number;
      color: string;
      speed?: number;
    }
    export interface IConfigProps {
      cvsWidth?: number;
      cvsHeight?: number;
      cvsBgColor?: string;
      ballNum?: number;
      allowMouse?: boolean;
      lineColor?: string;
      lineWidth?: number;
      ballSpeed?: number;
      ballColor?: string;
    }
  }





  /**
   * 自定义配置
   * @param options 配置项
   */
  export function config(
    options: IProps.IConfigProps,
  ) {
    yyg_cvsWidth = options
      .cvsWidth || Utils.getWinRange().winWidth;
    yyg_cvsHeight = options
      .cvsHeight || Utils.getWinRange().winHeight;
    yyg_cvsBgColor = options.cvsBgColor || '#000';
    yyg_ballNum = options.ballNum || 50;
    yyg_allowMouse = options.allowMouse || true;
    yyg_lineColor = options.lineColor || '#d50';
    yyg_lineWidth = options.lineWidth || 1;
    yyg_ballSpeed = options.ballSpeed || 1;
    yyg_ballColor = options.ballColor || '#fff';

    return YYG;
  }





  /**
   * 主渲染函数
   * @param el canvas元素
   */
  export function render(
    el: string,
  ) {
    Init.initCanvas(el);
    Init.reseizeCanvas();

    Render.create(yyg_ballNum);
    Render.move();

    return YYG;
  }




  /**
   * 初始化函数
   */
  namespace Init {
    
    export function initCanvas(
      el: string,
    ): void {
      yyg_el = Utils.getEle(el);
      yyg_pen = yyg_el.getContext('2d');
      
      
      const oBody = Utils.getEle('body') as HTMLBodyElement;
      const { winHeight, winWidth, } = Utils.getWinRange();
  
      Utils.setAttr(yyg_el, {
        width: winWidth,
        height: winHeight,
      })
      Utils.setCss(yyg_el, {
        display: 'block',
        // 'background-color': '#000',
        'background-color': yyg_cvsBgColor,
      });
      Utils.setCss(oBody, {
        margin: 0,
        overflow: 'hidden',
      });
    }

    export function reseizeCanvas() {
      window.addEventListener('resize', () => {
        const { winWidth, winHeight, } = Utils.getWinRange();
        
        yyg_cvsWidth = winWidth;
        yyg_cvsHeight = winHeight;

        Utils.setAttr(yyg_el, {
          width: winWidth,
          height: winHeight,
        });
      }, false);
    }

  }
  



  /**
   * 工具函数
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
      private readonly lineColor: string;
      private readonly lineWidth: number ;
  
      public constructor(
        props: IProps.ILineProps,
      ) {
        this.startPoint = props.startPoint;
        this.endPoint = props.endPoint;
        this.lineColor = props.lineColor || '#d50';
        this.lineWidth = props.lineWidth || 1;
        this.draw();
      }
  
      public draw(): void {
        yyg_pen.save();
        yyg_pen.beginPath();
        yyg_pen.moveTo(
          this.startPoint.x,
          this.startPoint.y,
        );
        yyg_pen.lineTo(
          this.endPoint.x,
          this.endPoint.y,
        );
        yyg_pen.lineCup = 'round';
        yyg_pen.lineWidth = this.lineWidth;
        yyg_pen.strokeStyle = this.lineColor;
        yyg_pen.stroke();
        yyg_pen.closePath();
        yyg_pen.restore();
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
          x: Utils.getRandom(0, yyg_cvsWidth),
          y: Utils.getRandom(0, yyg_cvsHeight),
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
        yyg_pen.save();
        yyg_pen.beginPath();
        yyg_pen.fillStyle = this.color;
        yyg_pen.arc(
          this.centerPoint.x,
          this.centerPoint.y,
          this.radius,
          0,
          Utils.getRadian(360)
        );
        yyg_pen.fill();
        yyg_pen.closePath();
        yyg_pen.restore();
      }
  
  
      public move(): void {
        this.centerPoint.x += this.distance.x;
        this.centerPoint.y += this.distance.y;
  
        // 碰撞检测
        this.distance.x = (this.centerPoint.x > yyg_cvsWidth
          || this.centerPoint.x < 0)
          ? -this.distance.x
          : this.distance.x;
        this.distance.y = (this.centerPoint.y > yyg_cvsHeight
          || this.centerPoint.y < 0)
          ? -this.distance.y
          : this.distance.y;
      }
  
  
      // 连线
      public drawLine(
        outerItem: Ball,
      ): void {
        for (const innerItem of yyg_ballArr) {
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
              lineColor: yyg_lineColor,
              lineWidth: yyg_lineWidth,
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
  
    }
  }
  
  


  /**
   * 内容渲染
   */
  namespace Render {
  
    /**
     * 创建点工厂
     */
    function createBallFactory(): void {
      const ball = new StarsLine.Ball({
        color: yyg_ballColor,
        radius: Utils.getRandom(1, 3),
      });
      yyg_ballArr.push(ball);
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
      yyg_pen.clearRect(0, 0, yyg_cvsWidth, yyg_cvsHeight);
  
      yyg_el
        .addEventListener('mousemove', (
          e: MouseEvent,
        ) => {
          
          yyg_flag = true;
          yyg_MOUSE_POINT.centerPoint.x = e.clientX;
          yyg_MOUSE_POINT.centerPoint.y = e.clientY;
        }, false);
      
      for (const item of yyg_ballArr) {
        item.move();
        item.draw();
        item.drawLine(
          !yyg_flag ? item : yyg_MOUSE_POINT
        );
      }
  
      yyg_flag = false;
  
      window.requestAnimationFrame(move);
    }
  
  }
  
}



/**
 * 测试
 */
YYG.config({
  cvsBgColor: '#000',
}).render('#stars-line')


