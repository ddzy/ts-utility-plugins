import utilityNumber from '../../../utility/number/index';


export interface IBubbleProps {
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
  bubbleExpandRange: number;
  mousePoint: {
    x: number;
    y: number;
  };
};

export class Bubble {
  // 气泡初始半径
  private static BUBBLE_INITIAL_RADIUS: number;

  private readonly pen: CanvasRenderingContext2D;

  private readonly cvsWidth: number;
  private readonly cvsHeight: number;

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
  // 气泡伸缩范围
  private readonly bubbleExpandRange: number;
  // 鼠标当前坐标
  // ! TODO 考虑提取至全局变量
  private readonly mousePoint: {
    x: number,
    y: number,
  };

  public constructor(
    config: IBubbleProps,
  ) {
    const {
      pen,
      cvsWidth,
      cvsHeight,
      bubbleSpeed,
      bubbleColorArr,
      bubbleScaleRange,
      bubbleOpacity,
      bubbleExpandRange,
      mousePoint,
    } = config;

    this.pen = pen;
    this.cvsWidth = cvsWidth;
    this.cvsHeight = cvsHeight;

    this.centerPoint = {
      x: utilityNumber.getAnyRandom(
        0,
        cvsWidth,
      ),
      y: utilityNumber.getAnyRandom(
        0,
        cvsHeight,
      ),
    };
    this.distance = {
      x: utilityNumber.getAnyRandom(-bubbleSpeed, bubbleSpeed),
      y: utilityNumber.getAnyRandom(-bubbleSpeed, bubbleSpeed),
    };
    this.color = bubbleColorArr[
      utilityNumber.getFullRandom(0, bubbleColorArr.length)
    ];
    this.radius = utilityNumber.getAnyRandom(
      bubbleScaleRange && bubbleScaleRange.min,
      bubbleScaleRange && bubbleScaleRange.max,
    );
    this.opacity = bubbleOpacity;
    Bubble.BUBBLE_INITIAL_RADIUS = this.radius;
    this.bubbleExpandRange = bubbleExpandRange;
    this.mousePoint = mousePoint;
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
      utilityNumber.getRadian(360),
    );
    pen.fill();
    pen.closePath();
    pen.restore();
  }

  public move(): void {
    const {
      cvsWidth,
      cvsHeight,
      mousePoint,
      bubbleExpandRange,
      centerPoint,
      distance,
      radius,
    } = this;

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
