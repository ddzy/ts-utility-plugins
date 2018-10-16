/**
 * @name canvas-colorful-bubble
 * @description 五彩气泡背景插件
 * @author yyg
 * @version 1.0.2
 */

/**
 * @param cvsWidth number 画布宽
 * @param cvsHeight number 画布高
 * @param cvsBgColor string 画布背景
 * @param bubbleNum number 气泡数量
 * @param bubbleScaleRange object 气泡大小范围
 * @param bubbleExpandRange number 气泡扩大距离
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
    bubbleScaleRange: {
      min: 3,
      max: 5,
    },
    bubbleExpandRange: 50,
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

  const bubbleArr: Bubble[] = [];
  const mousePoint: {
    x: number,
    y: number,
  } = {
      x: yyg_settings.cvsWidth && yyg_settings.cvsWidth * 2,
      y: yyg_settings.cvsHeight && yyg_settings.cvsHeight * 2,
  } as any;

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
      bubbleScaleRange?: {
        min: number,
        max: number,
      },
      bubbleExpandRange?: number,
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
      if (Utils.getEle(el)) {
        const e = Utils.getEle(el) as any;
        
        if (e.localName === 'canvas') {
          yyg_el = e;
          yyg_pen = e.getContext('2d');
          
          Utils.setCss(yyg_el, {
            display: 'block',
            'background-color': yyg_settings.cvsBgColor,
          });
          Utils.setAttr(yyg_el, {
            width: yyg_settings.cvsWidth,
            height: yyg_settings.cvsHeight,
          });
        } else {
          throw new Error('请传入canvas元素!');
        }
      } else {
        throw new Error('元素不存在!');
      }
    }

    export function initBubble() {
      const {
        bubbleNum,
        allowMouse,
      } = yyg_settings as any;

      for (let i = 0; i < bubbleNum; i++) {
        _createBubbleFactory();
      }

      _moveBubble();

      // 鼠标交互
      allowMouse && _moveByMouse();
    }

    /**
     * 气泡工厂
     */
    function _createBubbleFactory() {
      const bubble = new Bubble();
      bubbleArr.push(bubble);
      bubble.draw();
    }

    /**
     * 气泡移动
     */
    function _moveBubble() {
      const {
        cvsWidth,
        cvsHeight,
      } = yyg_settings as any;

      yyg_pen.clearRect(0, 0, cvsWidth, cvsHeight);
      bubbleArr.forEach((item: Bubble) => {
        item.move();
        item.draw();
      });

      window.requestAnimationFrame(_moveBubble);
    }

    /**
     * 鼠标控制
     */
    function _moveByMouse() {
      const {
        cvsWidth,
        cvsHeight,
      } = yyg_settings as any;

      yyg_el.addEventListener('mousemove', tick);

      yyg_el.addEventListener('mouseleave', () => {
        mousePoint.x = cvsWidth * 2;
        mousePoint.y = cvsHeight * 2;
      });
    }

    function tick(e: MouseEvent): void {
      mousePoint.x = e.clientX;
      mousePoint.y = e.clientY;
    }
  }


  namespace Utils {
    /**
     * 获取单个dom元素
     * @param el dom元素
     */
    export function getEle(
      el: string,
    ): HTMLElement | null {
      return document
        .querySelector(el);
    }

    /**
     * 取随机整数
     * @param min 最小值
     * @param max 最大值
     */
    export function getFullRandom(
      min: number,
      max: number,
    ): number {
      return ~~(Math.random() * (max - min) + min);
    }

    /**
     * 取随机任意数
     * @param min 最小值
     * @param max 最大值
     */
    export function getAnyRandom(
      min: number,
      max: number,
    ): number {
      return Math.random() * (max - min) + min;
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
     * 设置元素样式
     * @param el dom元素
     * @param options 样式表
     * @returns Utils
     */
    export function setCss(
      el: HTMLElement,
      options: any,
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];
          el.style.cssText += `${key}: ${options[key]};`;
        }
      }

      return Utils;
    }

    /**
     * 设置元素属性 
     * @param el dom元素
     * @param options 属性配置项
     */
    export function setAttr(
      el: HTMLElement,
      options: any,
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];
          el.setAttribute(key, element);
        }
      }

      return Utils;
    }
  }


  class Bubble {
    // 保存气泡初始半径
    private static BUBBLE_INITIAL_RADIUS: number;

    // 中心点坐标
    private readonly centerPoint: {
      x: number,
      y: number,
    }
    // 移动距离
    private readonly distance: {
      x: number,
      y: number,
    }
    // 气泡颜色
    private readonly color: string
    // 气泡半径
    private radius: number
    // 气泡透明度
    private readonly opacity: number


    public constructor() {
      const cvsWidth = yyg_settings.cvsWidth as number;
      const cvsHeight = yyg_settings.cvsHeight as number;
      const {
        bubbleSpeed,
        bubbleColorArr,
        bubbleScaleRange,
        bubbleOpacity,
      } = yyg_settings as any;

      this.centerPoint = {
        x: Utils.getAnyRandom(
          0,
          cvsWidth
        ),
        y: Utils.getAnyRandom(
          0,
          cvsHeight,
        ),
      };
      this.distance = {
        x: Utils.getAnyRandom(-bubbleSpeed, bubbleSpeed),
        y: Utils.getAnyRandom(-bubbleSpeed, bubbleSpeed),
      };
      this.color = bubbleColorArr[
        Utils.getFullRandom(0, bubbleColorArr.length)
      ];
      this.radius = Utils.getAnyRandom(
        bubbleScaleRange && bubbleScaleRange.min,
        bubbleScaleRange && bubbleScaleRange.max,
      );
      this.opacity = bubbleOpacity;
      Bubble.BUBBLE_INITIAL_RADIUS = this.radius;
    }


    public draw(): void {
      const centerPoint = this.centerPoint;
      const color = this.color;
      const radius = this.radius;
      const opacity = this.opacity;

      yyg_pen.save();
      yyg_pen.beginPath();
      yyg_pen.globalAlpha = opacity;
      yyg_pen.fillStyle = color;
      yyg_pen.arc(
        centerPoint.x,
        centerPoint.y,
        radius,
        0,
        Utils.getRadian(360),
      );
      yyg_pen.fill();
      yyg_pen.closePath();
      yyg_pen.restore();
    }


    public move(): void {
      const {
        cvsWidth,
        cvsHeight,
        bubbleExpandRange,
      } = yyg_settings as any;
      const centerPoint = this.centerPoint;
      const distance = this.distance;
      const radius = this.radius;

      // 鼠标 - 球中心 距离
      const mouseToBubbleDistanceX: number = Math
        .pow(centerPoint.x - mousePoint.x, 2);
      const mouseToBubbleDistanceY: number = Math
        .pow(centerPoint.y - mousePoint.y, 2);
      const mouseToBubbleDistance: number = Math
        .pow(mouseToBubbleDistanceX + mouseToBubbleDistanceY, .5)

      centerPoint.x += distance.x;
      centerPoint.y += distance.y;

      // 碰撞检测
      this.distance.x = centerPoint.x < radius
        || centerPoint.x > cvsWidth - radius
        ? -this.distance.x
        : this.distance.x;
      this.distance.y = centerPoint.y < radius
        || centerPoint.y > cvsHeight - radius
        ? -this.distance.y
        : this.distance.y;
      
      // 缩放检测
      if (mouseToBubbleDistance <= bubbleExpandRange) {
        this.radius += 1;
      } else if (
        mouseToBubbleDistance > bubbleExpandRange
        && this.radius > Bubble.BUBBLE_INITIAL_RADIUS
      ) {
        this.radius -= 1;
      }
    }
  }
}


const cb = ColorfulBubble
  .config({
    cvsWidth: 800,
    cvsHeight: 700,
    cvsBgColor: '#000',
    allowMouse: true,
    bubbleNum: 500,
    bubbleOpacity: .5,
    bubbleExpandRange: 50,
  })
  .render('#colorful-bubble');
