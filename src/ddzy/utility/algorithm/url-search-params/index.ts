import utilityOthers from "../../others";

/**
 * @name URLSearchParams
 * @description 模拟实现`URLSearchParams`API
 * @author ddzy
 * @since 2019/6/16
 */

/**
 * Symbol.iterator
 * @todo append(key, value) √
 * @todo delete(key) √
 * @todo get(key) √
 * @todo getAll() √
 * @todo has() √
 * @todo set(key, value) √
 * @todo keys() √
 * @todo values() √
 * @todo iterator
 */

export interface IURLSearchParamsProps {
  url?: string;
};
export interface IURLSearchParamsState {
  url: string;
  params: IStaticParams;
};
export type IStaticParams = Record<IStaticParamsKey, IStaticParamsValue>;
export type IStaticParamsKey = string | symbol;
export type IStaticParamsValue = string | number | boolean | Function;


export class URLSearchParams {
  public static readonly defaultProps: IURLSearchParamsProps = {
    url: 'https://ddzy.github.io/login?name=ddzy&age=21&isSelf=true',
  };

  public constructor(
    props: IURLSearchParamsProps,
  ) {
    this.__init__(props);
  }

  public readonly state: IURLSearchParamsState = {
    url: '',
    params: {},
  };

  private __init__(
    props: IURLSearchParamsProps,
  ): void {
    this._initProps(props);
    this._initState();
    this._initIterator();
  }

  private _initProps(
    props: IURLSearchParamsProps,
  ): void {
    const {
      defaultProps,
    } = URLSearchParams;

    for (const key in props) {
      const value = props[
        key as keyof typeof URLSearchParams.defaultProps
      ];
      defaultProps[
        key as keyof typeof URLSearchParams.defaultProps
      ] = value;
    }
  }

  private _initState(): void {
    const { url } = URLSearchParams.defaultProps;

    this._aidedHandleSetURLState(url as string);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _initIterator(): void {
    const { params } = this.state;

    params[Symbol.iterator as any] = function *() {
      for (const key in params) {
        const value = params[key];
        yield [key, value];
      }
    }
  }

  private _aidedHandleSetURLState(
    url: string,
  ): void {
    this.state.url = url;
  }

  private _aidedHandleSetParamsState(
    url: string,
  ): void {
    this.state.params = utilityOthers.convertURLParameterToObject(url as string);
  }

  private _aidedHandleAppend(
    key: IStaticParamsKey,
    value: IStaticParamsValue,
  ): void {
    const url: string = `${this.state.url}&${key as string}=${value}`;

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleDelete(
    key: IStaticParamsKey,
  ): void {
    const matchPair = new RegExp(`(${key as string}=\\w+[&?])|([&]${key as string}=\\w+)`, 'g');
    const url = this.state.url.replace(matchPair, '');

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleGet(
    key: IStaticParamsKey,
  ): IStaticParamsValue | null {
    const { params } = this.state;

    return params[key as string] ? params[key as string] : null;
  }

  private _aidedHandleGetAll(): [IStaticParamsKey, IStaticParamsValue][] {
    const { params } = this.state;
    const result: [IStaticParamsKey, IStaticParamsValue][] = [];

    for (const key in params) {
      const temp: [IStaticParamsKey, IStaticParamsValue] = ['', ''];
      const value = params[key];

      [temp[0], temp[1]] = [key, value];
      result.push(temp);
    }

    return result;
  }

  private _aidedHandleHas(
    key: IStaticParamsKey,
  ): boolean {
    const { params } = this.state;

    return params.hasOwnProperty(key);
  }

  private _aidedHandleSet(
    key: IStaticParamsKey,
    value: IStaticParamsValue,
  ): void {
    const matchPair = new RegExp(`${key as string}=\\w+`, 'g');
    const url = this.state.url.replace(matchPair, `${key as string}=${value}`);

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleKeys(): IStaticParamsKey[] {
    const { params } = this.state;

    return Object.keys(params);
  }

  private _aidedHandleValues(): IStaticParamsValue[] {
    const { params } = this.state;
    const result: IStaticParamsValue[] = [];

    for (const key in params) {
      result.push(params[key]);
    }

    return result;
  }

  /**
   * 追加新的键值对, 入口
   * @param key 需要追加的键
   * @param value 键值
   * @returns {string} 返回新的url
   */
  public handleAppend(
    key: IStaticParamsKey,
    value: IStaticParamsValue,
  ): URLSearchParams {
    this._aidedHandleAppend(key, value);

    return this;
  }

  /**
   * 移除某个键值对, 入口
   * @param key 键名
   */
  public handleDelete(
    key: IStaticParamsKey,
  ): URLSearchParams {
    this._aidedHandleDelete(key);

    return this;
  }

  /**
   * 获取指定的参数键值, 入口
   * @param key 键名
   */
  public handleGet(
    key: IStaticParamsKey,
  ): IStaticParamsValue | null {
    return this._aidedHandleGet(key);
  }

  /**
   * 获取所有的参数值, 入口
   * @returns {[IStaticParamsKey, IStaticParamsValue][]}
   */
  public handleGetAll(): [IStaticParamsKey, IStaticParamsValue][] {
    return this._aidedHandleGetAll();
  }

  /**
   * 判断是否存在指定键名, 入口
   * @param key 键名
   */
  public handleHas(
    key: IStaticParamsKey,
  ): boolean {
    return this._aidedHandleHas(key);
  }

  /**
   * 更新源url中的对应键值(但是params中的值是不变的), 入口
   * @param key 键名
   * @param value 键值
   */
  public handleSet(
    key: IStaticParamsKey,
    value: IStaticParamsValue,
  ): URLSearchParams {
    this._aidedHandleSet(key, value);

    return this;
  }

  /**
   * 获取键名数组, 入口
   */
  public handleKeys(): IStaticParamsKey[] {
    return this._aidedHandleKeys();
  }

  /**
   * 获取键值数组, 入口
   */
  public handleValues(): IStaticParamsValue[] {
    return this._aidedHandleValues();
  }
}