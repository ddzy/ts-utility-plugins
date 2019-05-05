import utilityDOM from "../../../utility/dom";
import utilityNumber from "../../../utility/number";

export interface IBallProps {
  cvsWidth: number;
  cvsHeight: number;
  pen: CanvasRenderingContext2D;
  color: string;
  radius: number;
  speed: number;
  mousePoint: {
    x: number,
    y: number,
  };
  ballArr: Ball[];
  safeDistance: number;
};


export class Ball {

  private readonly cvsWidth: number;
  private readonly cvsHeight: number;
  private readonly pen: CanvasRenderingContext2D;
  private readonly color: string;
  private readonly radius: number;
  private readonly speed: number;
  private readonly mousePoint: {
    x: number,
    y: number,
  }
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
      mousePoint,
      cvsWidth,
      cvsHeight,
      ballArr,
      safeDistance,
    } = config;

    this.pen = pen;
    this.color = color;
    this.radius = radius;
    this.speed = speed;
    // this.mousePoint = mousePoint;
    this.mousePoint = {
      x: utilityNumber.getAnyRandom(0, cvsWidth),
      y: utilityNumber.getAnyRandom(0, cvsHeight),
    };
    this.distance = {
      x: utilityDOM.getAnyRandom(-this.speed, this.speed),
      y: utilityDOM.getAnyRandom(-this.speed, this.speed),
    };
    this.cvsWidth = cvsWidth;
    this.cvsHeight = cvsHeight;
    this.ballArr = ballArr;
    this.safeDistance = safeDistance;
  }

  public draw(): void {
    const {
      pen,
      mousePoint,
    } = this;

    pen.save();
    pen.beginPath();
    pen.fillStyle = this.color;
    pen.arc(
      mousePoint.x,
      mousePoint.y,
      this.radius,
      0,
      utilityDOM.getRadian(360)
    );
    pen.fill();
    pen.closePath();
    pen.restore();
  }

  public move(): void {
    const {
      distance,
      mousePoint,
      cvsWidth,
      cvsHeight,
    } = this;

    mousePoint.x += distance.x;
    mousePoint.y += distance.y;

    // 碰撞检测
    distance.x = (mousePoint.x > cvsWidth
      || mousePoint.x < 0)
      ? -distance.x
      : distance.x;
      distance.y = (mousePoint.y > cvsHeight
      || mousePoint.y < 0)
      ? -distance.y
      : distance.y;
  }

  public drawLine(
    outerItem: any,
  ): void {
    const {
      ballArr,
      safeDistance,
    } = this;

    for (const innerItem of ballArr) {
      if(
        outerItem !== innerItem && Math.sqrt(
          Math.pow((
            outerItem.mousePoint.x - innerItem.mousePoint.x),
            2) + Math.pow((
              outerItem.mousePoint.y - innerItem.mousePoint.y),
            2)
        ) < safeDistance
      ) {
        // new Line({
        //   lineColor: yyg_lineColor,
        //   lineWidth: yyg_lineWidth,
        //   startPoint: {
        //     x: outerItem.mousePoint.x,
        //     y: outerItem.mousePoint.y,
        //   },
        //   endPoint: {
        //     x: innerItem.mousePoint.x,
        //     y: innerItem.mousePoint.y,
        //   },
        //   opacity: .5,
        // });
      }
    }
  }

}