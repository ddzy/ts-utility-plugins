import { Character } from './character/Character';
import { getEle } from '../../utility/dom/getEle';
import { setCss } from '../../utility/dom/setCss';
import { setAttr } from '../../utility/dom/setAttr';
import { getFullRandom } from '../../utility/number/getFullRandom';


export interface IJumpingCharactersProps {
  container: string;
  cvsWidth?: number;
  cvsHeight?: number;
  cvsBgColor?: string;
  text?: string[];
  textColor?: string[];
  textSize?: number;
  safeDistance?: number;
  initialOpacity?: 1;
  speed?: number;
};


export class JumpingCharacters {

  public static readonly defaultConfig = {
    container: 'body',
    cvsWidth: 500,
    cvsHeight: 500,
    cvsBgColor: '#000',
    text: [
      '富强', '民主', '文明', '和谐',
      '自由', '平等', '公正', '法治',
      '爱国', '敬业', '诚信', '友善',
    ],
    textColor: [
      '#1890ff', '#f5222d', '#fa8c16', '#faad14',
      '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
      '#2f5418', '#722ed1', '#eb2f96', '#fa541c',
    ],
    textSize: 16,
    safeDistance: 20,
    initialOpacity: 1,
    speed: 1,
  };

  public constructor(
    config: IJumpingCharactersProps,
  ) {
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
  private readonly saveCharactersArr: Character[] = [];

  private timer: any = 0;


  private __init__(
    config: IJumpingCharactersProps,
  ): void {
    this._initConfig(config);
    this._initCanvas();
    this.render();
  }

  /**
   * 初始化配置项
   * @param config 传入配置
   */
  private _initConfig(
    config: IJumpingCharactersProps,
  ): void {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const value = Reflect.get(config, key);
        Reflect.set(JumpingCharacters.defaultConfig, key, value);
      }
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
    } = JumpingCharacters.defaultConfig;

    if (container) {
      let oContainer = getEle(container);

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
    } = JumpingCharacters.defaultConfig;

    setCss(el, {
      display: 'block',
      'background-color': cvsBgColor,
    });
    setAttr(el, {
      width: cvsWidth,
      height: cvsHeight,
    });
  }

  private aidedHandleTick(): void {
    const { pen, saveCharactersArr } = this;
    const {
      cvsWidth,
      cvsHeight,
    } = JumpingCharacters.defaultConfig;

    pen.clearRect(0, 0, cvsWidth, cvsHeight);

    for (const character of saveCharactersArr) {
      character.handleDraw();
      character.handleMove();
    }
  }

  private aidedHandleCancelTimer(): void {
    clearInterval(this.timer);
  }

  private handleCreateCharacter(): void {
    const {
      pen,
      saveCharactersArr,
      mousePoint,
      aidedHandleCancelTimer,
    } = this;
    const { defaultConfig } = JumpingCharacters
    const {
      text,
      textColor,
    } = defaultConfig;

    const character = new Character({
      ...defaultConfig,
      text: text[getFullRandom(
        0,
        text.length,
      )],
      textColor: textColor[getFullRandom(
        0,
        textColor.length,
      )],
      pen,
      mousePoint,
      handleCancelTimer: aidedHandleCancelTimer,
    });
    saveCharactersArr[0] = character;
  }

  /**
   * 主运动函数
   */
  private handleAnimateCharacter(): void {
    this.aidedHandleCancelTimer();

    this.timer = setInterval(() => {
      this.aidedHandleTick();
    }, 1000 / 60);
  }

  private render(): void {
    const {
      el,
      mousePoint,
    } = this;

    el.addEventListener('click', (e: MouseEvent) => {
      mousePoint.x = e.clientX;
      mousePoint.y = e.clientY;

      this.handleCreateCharacter();

      // TODO: 使用requestAnimationFrame重构
      this.handleAnimateCharacter();
    }, false);
  }

}