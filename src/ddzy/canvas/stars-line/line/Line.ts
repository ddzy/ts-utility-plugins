export interface ILineProps {
  startPoint: {
    x: number,
    y: number,
  };
  endPoint: {
    x: number,
    y: number,
  };
  lineColor: string;
  lineWidth: number;
  pen: CanvasRenderingContext2D;
};


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
  private readonly pen: CanvasRenderingContext2D;

  public constructor(
    props: ILineProps,
  ) {
    const {
      startPoint,
      endPoint,
      lineColor,
      lineWidth,
      pen,
    } = props;

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.lineColor = lineColor
    this.lineWidth = lineWidth;
    this.pen = pen;

    this.draw();
  }

  public draw(): void {
    const {
      pen,
      startPoint,
      endPoint,
      lineColor,
      lineWidth,
    } = this;

    pen.save();
    pen.beginPath();
    pen.moveTo(
      startPoint.x,
      startPoint.y,
    );
    pen.lineTo(
      endPoint.x,
      endPoint.y,
    );
    pen.lineCap = 'round';
    pen.lineWidth = lineWidth;
    pen.strokeStyle = '#1890ff';
    pen.strokeStyle = lineColor;
    pen.stroke();
    pen.closePath();
    pen.restore();
  }

}