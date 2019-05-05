import utilityDOM from '../../utility/dom/index';
import { Ball } from './ball/Ball';
import utilityNumber from '../../utility/number';


export interface IStarsLineProps {
  container: string;
  cvsWidth?: number;
  cvsHeight?: number;
  cvsBgColor?: string;
  ballNum?: 50;
  ballRadius?: IStaticStarsLineBallRadiusParams;
  lineColor?: string;
  lineWidth?: number;
  ballSpeed?: number;
  ballColor?: string;
  safeDistance?: number;
};
export interface IStaticStarsLineBallRadiusParams {
  min: number,
  max: number,
};


export class StarsLine {

  public static defaultConfig = {
    container: 'body',
    cvsWidth: 500,
    cvsHeight: 500,
    cvsBgColor: '#000',
    ballNum: 50,
    ballRadius: {
      min: 1,
      max: 3,
    },
    allowMouse: false,
    lineColor: ``,
    lineWidth: 1,
    ballSpeed: 1,
    ballColor: '#1890ff',
    safeDistance: 50,
  };

  public constructor(config: IStarsLineProps) {
    this.__init__(config);
  }


  private el: HTMLCanvasElement = (
    document.createElement('canvas')
  );
  private pen = (
    this.el.getContext('2d') as CanvasRenderingContext2D
  );
  private readonly mousePoint: {
    x: number,
    y: number,
  } = {
      x: 0,
      y: 0,
    };
  private readonly ballArr: Ball[] = [];
  private flag: boolean = true;


  private __init__(
    config: IStarsLineProps,
  ): void {
    this._initConfig(config);
    this._initCanvas();
    this.render();
  }

  private _initConfig(
    config: IStarsLineProps,
  ): void {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const value = Reflect.get(config, key);
        Reflect.set(StarsLine.defaultConfig, key, value);
      }
    }
  }

  private _initCanvas(): void {
    this._initCanvasElAndPen();
    this._initCanvasDefaultStyle();
  }

  private _initCanvasElAndPen(): void {
    const {
      container,
    } = StarsLine.defaultConfig;

    if (container) {
      let oContainer = utilityDOM.getEle(container);

      if (oContainer && oContainer.nodeType === 1 && oContainer.localName === 'canvas') {
        this.el = (oContainer as HTMLCanvasElement);
        this.pen = (
          this.el.getContext('2d') as CanvasRenderingContext2D
        );
      } else {
        throw new Error('Please enter an valid container...')
      }
    } else {
      throw new TypeError('Please enter an valid container...')
    }
  }

  private _initCanvasDefaultStyle(): void {
    const { el } = this;
    const {
      cvsBgColor,
      cvsWidth,
      cvsHeight,
    } = StarsLine.defaultConfig;

    utilityDOM.setCss(el, {
      display: 'block',
      'background-color': cvsBgColor,
    });
    utilityDOM.setAttr(el, {
      width: cvsWidth,
      height: cvsHeight,
    });
  }

  private aidedCreateBall(): void {
    const {
      pen,
      mousePoint,
      ballArr,
    } = this;
    const {
      cvsWidth,
      cvsHeight,
      ballColor,
      ballRadius,
      ballSpeed,
      safeDistance,
      lineColor,
      lineWidth,
    } = StarsLine.defaultConfig;

    const ball = new Ball({
      pen,
      color: ballColor,
      radius: utilityNumber.getAnyRandom(
        ballRadius.min,
        ballRadius.max,
      ),
      speed: ballSpeed,
      mousePoint,
      cvsWidth,
      cvsHeight,
      ballArr,
      safeDistance,
      lineColor: lineColor ? lineColor : `rgba(24,144,255, ${utilityNumber.getAnyRandom(0, 1)})`,
      lineWidth,
    });

    this.ballArr.push(ball);
    ball.draw();
  }

  /**
   * [辅助]: 处理鼠标移动
   */
  private aidedMoveBallByMouse(): void {
    const {
      el,
      mousePoint,
    } = this;
    const {
      allowMouse,
    } = StarsLine.defaultConfig;

    // 鼠标交互
    allowMouse && el.addEventListener('mousemove', (e: MouseEvent) => {
      this.flag = true;
      mousePoint.x = e.clientX;
      mousePoint.y = e.clientY;
    }, false);
  }

  /**
   * [辅助]: 处理球数组移动
   */
  private aidedMoveBallArr(): void {
    const {
      flag,
      ballArr,
      mousePoint,
    } = this;
    const {
      cvsWidth,
      cvsHeight,
    } = StarsLine.defaultConfig;

    this.pen.clearRect(0, 0, cvsWidth, cvsHeight);

    for (const ball of ballArr) {
      ball.move();
      ball.draw();
      ball.drawLine(
        !flag && ball,
      );
    }

    this.flag = false;

    window.requestAnimationFrame(() => {
      this.aidedMoveBallArr();
    });
  }

  private handleCreateBall(): void {
    const {
      ballNum,
    } = StarsLine.defaultConfig;

    for (let i = 0; i < ballNum; i++) {
      this.aidedCreateBall();
    }
  }

  private handleMoveBall(): void {
    this.aidedMoveBallByMouse();
    this.aidedMoveBallArr();
  }

  private render(): void {
    this.handleCreateBall();
    this.handleMoveBall();
  }

}