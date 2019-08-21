import { Line } from '../line/Line';
import { getAnyRandom } from '../../../utility/number/getAnyRandom';
import { getRadian } from '../../../utility/number/getRadian';


export interface IBallProps {
  cvsWidth: number;
  cvsHeight: number;
  pen: CanvasRenderingContext2D;
  color: string;
  radius: number;
  speed: number;
  ballArr: Ball[];
  safeDistance: number;
  lineColor: string;
  lineWidth: number;
  centerPoint: {
    x: number,
    y: number,
  };
};


export class Ball {

  private readonly cvsWidth: number;
  private readonly cvsHeight: number;
  private readonly pen: CanvasRenderingContext2D;
  private readonly color: string;
  private readonly radius: number;
  // 球移动步数
  private readonly speed: number;
  // 球中心坐标
  private readonly centerPoint: {
    x: number,
    y: number,
  }
  private readonly lineColor: string;
  private readonly lineWidth: number;
  // 球移动速率
  private readonly distance: {
    x: number,
    y: number,
  }
  private readonly ballArr: Ball[];
  private readonly safeDistance: number;

  public constructor(
    config: IBallProps,
  ) {
    const {
      pen,
      color,
      radius,
      speed,
      cvsWidth,
      cvsHeight,
      ballArr,
      safeDistance,
      lineWidth,
      lineColor,
      centerPoint,
    } = config;

    this.pen = pen;
    this.color = color;
    this.radius = radius;
    this.speed = speed;
    this.centerPoint = centerPoint;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.distance = {
      x: getAnyRandom(-this.speed, this.speed),
      y: getAnyRandom(-this.speed, this.speed),
    };
    this.cvsWidth = cvsWidth;
    this.cvsHeight = cvsHeight;
    this.ballArr = ballArr;
    this.safeDistance = safeDistance;
  }

  public draw(): void {
    const {
      pen,
      centerPoint,
      color,
      radius,
    } = this;

    pen.save();
    pen.beginPath();
    pen.fillStyle = color;
    pen.arc(
      centerPoint.x,
      centerPoint.y,
      radius,
      0,
      getRadian(360)
    );
    pen.fill();
    pen.closePath();
    pen.restore();
  }

  public move(): void {
    const {
      distance,
      centerPoint,
      cvsWidth,
      cvsHeight,
    } = this;

    centerPoint.x += distance.x;
    centerPoint.y += distance.y;

    // 碰撞检测
    distance.x = (centerPoint.x > cvsWidth
      || centerPoint.x < 0)
      ? -distance.x
      : distance.x;
    distance.y = (centerPoint.y > cvsHeight
      || centerPoint.y < 0)
      ? -distance.y
      : distance.y;
  }

  public drawLine(
    outerItem: Ball | false,
  ): void {
    const {
      ballArr,
      safeDistance,
      pen,
      lineColor,
      lineWidth,
    } = this;

    if (outerItem) {
      for (const innerItem of ballArr) {
        if (
          outerItem !== innerItem && Math.sqrt(
            Math.pow((
              outerItem.centerPoint.x - innerItem.centerPoint.x),
              2) + Math.pow((
                outerItem.centerPoint.y - innerItem.centerPoint.y),
                2)
          ) < safeDistance
        ) {
          new Line({
            lineColor,
            lineWidth,
            startPoint: {
              x: outerItem.centerPoint.x,
              y: outerItem.centerPoint.y,
            },
            endPoint: {
              x: innerItem.centerPoint.x,
              y: innerItem.centerPoint.y,
            },
            pen,
          });
        }
      }
    }
  }

}