/**
 * @description 气泡
 * @author ddzy
 * @since 最近修改于19/4/29
 */

import utilityDOM from '../../../utility/dom/index';


export interface IBubbleProps {
  el: HTMLCanvasElement,
  pen: CanvasRenderingContext2D,
  cvsWidth: number;
  cvsHeight: number;
  bubbleSpeed: number;
  bubbleColorArr: string[];
  bubbleScaleRange: {
    min: number,
    max: number,
  };
  bubbleOpacity: number;
};

export class Bubble {
  // 气泡初始半径
  private static BUBBLE_INITIAL_RADIUS: number;

  private el: HTMLCanvasElement;
  private pen: CanvasRenderingContext2D;

  private cvsWidth: number;
  private cvsHeight: number;

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


  public constructor(
    config: IBubbleProps,
  ) {
    const {
      el,
      pen,
      cvsWidth,
      cvsHeight,
      bubbleSpeed,
      bubbleColorArr,
      bubbleScaleRange,
      bubbleOpacity,
    } = config;

    this.el = el;
    this.pen = pen;
    this.cvsWidth = cvsWidth;
    this.cvsHeight = cvsHeight;

    this.centerPoint = {
      x: utilityDOM.get
    };
  }

  public __init__(
    config: IBubbleProps,
  ): void {
    const {
      el,
      pen,
      cvsWidth,
      cvsHeight,
      bubbleSpeed,
      bubbleColorArr,
      bubbleScaleRange,
      bubbleOpacity,
    } = config;

    this.el = el;
  }

  public draw(): void {
    const {
      pen,
      centerPoint,
      color,
      radius,
      opacity,
    } = this;

    pen.save();
    pen.beginPath();
    pen.globalAlpha = opacity;
    pen.fillStyle = color;
    pen.arc(
      centerPoint.x,
      centerPoint.y,
      radius,
      0,
      utilityDOM.getRadian(360),
    );
    pen.fill();
    pen.closePath();
    pen.restore();
  }

  public move(): void {
    const {
      cvsWidth,
      cvsHeight,
      bubbleExpandRange,
    } = this;
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
