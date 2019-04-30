/**
 * @name canvas-colorful-bulle
 * @description 五彩气泡背景插件
 * @author ddzy
 * @version 最近更新于19/4/29
 */

import { utilityDOM } from '../../utility/index';
import { Bubble } from './bubble/bubble';


export interface IColorfulBubbleConfigProps {
  container?: string;
  cvsWidth?: number;
  cvsHeight?: number;
  cvsBgColor?: string;
  bubbleNum?: number;
  bubbleScaleRange?: IStaticColorfulBubbleScaleRangeParams;
  bubbleExpandRange?: number;
  bubbleOpacity?: number;
  bubbleSpeed?: number;
  allowMouse?: boolean;
  bubbleColorArr?: string[];
};
export interface IStaticColorfulBubbleScaleRangeParams {
  min: number,
  max: number,
};


export class ColorfulBubble {

  public static defaultConfig = {
    container: 'body',
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
  };

  private el: HTMLCanvasElement = (
    document.createElement('canvas')
  );
  private pen = (
    this.el.getContext('2d') as CanvasRenderingContext2D
  );

  private bubbleArr: Bubble[] = [];
  private mousePoint: {
    x: number,
    y: number,
  } = {
    x: ColorfulBubble.defaultConfig.cvsWidth && ColorfulBubble.defaultConfig.cvsWidth * 2,
    y: ColorfulBubble.defaultConfig.cvsHeight && ColorfulBubble.defaultConfig.cvsHeight * 2,
  };

  public constructor(
    config: IColorfulBubbleConfigProps,
  ) {
    this.__init__(config);
  }

  private __init__(
    config: IColorfulBubbleConfigProps,
  ): void {
    this._initConfig(config);
    this._initCanvas();
    this.render();
  }

  private _initConfig(
    config: IColorfulBubbleConfigProps,
  ): void {
    for (const key in config) {
      const value = Reflect.get(config, key);
      Reflect.set(ColorfulBubble.defaultConfig, key, value);
    }
  }

  /**
   * 初始化canvas相关
   */
  private _initCanvas(): void {
    this._initCanvasElAndPen();
    this._initCanvasDefaultStyle();
  }

  private _initCanvasElAndPen(): void {
    const {
      container,
    } = ColorfulBubble.defaultConfig;

    if ( container ) {
      let oContainer = utilityDOM.getEle(container);

      if ( oContainer && oContainer.nodeType === 1 && oContainer.localName === 'canvas' ) {
        this.el = (oContainer as HTMLCanvasElement);
        this.pen = (
          this.el.getContext('2d') as CanvasRenderingContext2D
        );
      } else {
        throw new Error('Please enter an valid container 🐷🐷🐷')
      }
    } else {
      throw new TypeError('Please enter an valid container 🐷🐷🐷')
    }
  }

  /**
   * 初始化canvas默认样式
   */
  private _initCanvasDefaultStyle(): void {
    const { el } = this;
    const {
      cvsBgColor,
      cvsWidth,
      cvsHeight,
    } = ColorfulBubble.defaultConfig;

    utilityDOM.setCss(el, {
      display: 'block',
      'background-color': cvsBgColor,
    });
    utilityDOM.setAttr(el, {
      width: cvsWidth,
      height: cvsHeight,
    });
  }

  /**
   * 实例化指定气泡
   */
  private handleCreateBubble(): void {
    const defaultConfig = ColorfulBubble.defaultConfig;

    const bubble: Bubble = new Bubble({
      ...defaultConfig,
      pen: this.pen,
      mousePoint: this.mousePoint,
    });
    this.bubbleArr.push(bubble);
    bubble.draw();
  }

  private handleMoveBubble(): void {
    const {
      cvsWidth,
      cvsHeight,
    } = ColorfulBubble.defaultConfig;

    this.pen.clearRect(0, 0, cvsWidth, cvsHeight);
    this.bubbleArr.forEach((v) => {
      v.move();
      v.draw();
    });

    window.requestAnimationFrame(() => {
      this.handleMoveBubble();
    });
  }

  private handleStretchBubbleByMouse(): void {
    const {
      cvsWidth,
      cvsHeight,
    } = ColorfulBubble.defaultConfig;

    this.el.addEventListener('mousemove', (e) => {
      this.mousePoint.x = e.clientX;
      this.mousePoint.y = e.clientY;
    });

    this.el.addEventListener('mouseleave', () => {
      this.mousePoint.x = cvsWidth * 2;
      this.mousePoint.y = cvsHeight * 2;
    })
  }

  private render(): void {
    const {
      bubbleNum,
      allowMouse,
    } = ColorfulBubble.defaultConfig;

    for (let i = 0; i < bubbleNum; i++) {
      this.handleCreateBubble();
    }

    this.handleMoveBubble();

    allowMouse && this.handleStretchBubbleByMouse();
  }
}