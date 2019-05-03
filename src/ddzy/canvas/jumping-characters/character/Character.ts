/**
 * @name Character
 * @description 单个字符
 */

export interface ICharacterProps {
  pen: CanvasRenderingContext2D;

  text: string;
  textSize: number;
  textColor: string;
  initialOpacity: number;
  safeDistance: number;
  speed: number;

  mousePoint: {
    x: number;
    y: number;
  };

  handleCancelTimer: () => void;
};


export class Character {

  public constructor(
    config: ICharacterProps,
  ) {
    const {
      initialOpacity,
      textSize,
      textColor,
      text,
      speed,
      safeDistance,
      pen,
      mousePoint,
      handleCancelTimer,
    } = config;

    this.pen = pen;
    this.text = text;
    this.textColor = textColor;
    this.safeDistance = safeDistance;
    this.mousePoint = mousePoint;
    this.opacity = initialOpacity;
    this.textSize = textSize;
    this.speed = speed;
    this.handleCancelTimer = handleCancelTimer;

    this.__init__();
  }

  private readonly handleCancelTimer: () => void;
  private readonly pen: CanvasRenderingContext2D;
  private readonly text: string;
  private readonly textColor: string;
  private readonly safeDistance: number;
  private readonly speed: number;
  private readonly mousePoint: {
    x: number;
    y: number;
  };
  private opacity: number;
  private textSize: number;


  private __init__(): void {
    this.handleDraw();
  }

  public handleDraw(): void {
    const {
      pen,
      text,
      textColor,
      textSize,
      mousePoint,
    } = this;

    // this.opacity = this.opacity <= 0
    //   ? 0
    //   : this.opacity;
    if (this.opacity <= 0) {
      this.opacity = 0;
      // clearInterval(timer);
      this.handleCancelTimer();
    }

    pen.save();
    pen.beginPath();
    pen.fillStyle = textColor;
    pen.font = `${textSize}px 'Fira Code Regular'`;
    pen.textAlign = 'center';
    pen.textBaseline = 'middle';
    pen.globalAlpha = this.opacity;
    pen.fillText(
      text,
      mousePoint.x,
      mousePoint.y,
    );

    pen.closePath();
    pen.restore();
  }

  public handleMove(): void {
    const {
      mousePoint,
    } = this;

    mousePoint.y -= this.speed;
    this.opacity -= .01;
  }

}