/**
 * @name event-emitter
 * @description 模拟实现EventEmitter
 * @author ddzy
 * @since 2019/6/14
 */

/**
 * @param on 放置事件
 * @param emit 发射事件
 * @param remove 移除事件
 */

export interface IEventEmitterProps {

};
export interface IEventEmitterState {
  events: EventParams;
};
export type EventParams = Record<string | number, EventHandler[]>;
export type EventHandler = ((...args: any[]) => void) | null;


export class EventEmitter {
  public static readonly defaultProps: IEventEmitterProps = {};

  public constructor(
    props: IEventEmitterProps,
  ) {
    this.__init__(props);
  }

  private readonly state: IEventEmitterState = {
    events: {},
  };

  private __init__(
    props: IEventEmitterProps,
  ): void {
    this._initProps(props);
  }

  private _initProps(
    props: IEventEmitterProps,
  ): void {
    const {
      defaultProps,
    } = EventEmitter;

    for (const key in props) {
      const value = props[
        key as keyof typeof EventEmitter.defaultProps
      ];
      defaultProps[
        key as keyof typeof EventEmitter.defaultProps
      ] = value;
    }
  }

  public get events(): EventParams {
    return this.state.events;
  }

  /**
   * 放置事件
   * @param type 事件类型
   * @param handler 处理函数
   */
  public handleOn(
    type: string,
    handler: EventHandler,
  ): {
    type: string,
    index: number,
  } {
    const {
      events,
    } = this.state;
    let index: number = 0;

    if (!events[type]) {
      events[type] = [handler];
    }
    else {
      events[type].push(handler);
      index = events[type].findIndex((v) => {
        return v === handler;
      });
    }

    return {
      type,
      index,
    };
  }

  /**
   * 发射事件
   * @param type 发射的事件类型
   */
  public handleEmit(
    type: string
  ): EventEmitter {
    const { events } = this.state;

    if (events[type]) {
      events[type].forEach(function (handler) {
        handler && handler.call(function(this: any) { return this });
      });
    }

    return this;
  }

  /**
   * 移除某type的某个handler
   * @param options 移除的配置项
   */
  public handleRemove(
    options: {
      type: string,
      index: number,
    },
  ): EventEmitter {
    const { events } = this.state;
    const { type, index } = options;

    if (events[type]) {
      events[type].splice(index, 1, null);
    }

    return this;
  }
}