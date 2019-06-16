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
 * @todo getAll()
 * @todo has()
 * @todo set(key, value)
 * @todo keys()
 * @todo values()
 */

export interface IURLSearchParamsProps {
  url?: string;
};
export interface IURLSearchParamsState {
  url: string;
  params: IStaticParams;
};
export type IStaticParams = Record<IStaticParamsKey, IStaticParamsValue>;
export type IStaticParamsKey = string;
export type IStaticParamsValue = string;


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
    const url: string = `${this.state.url}&${key}=${value}`;

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleDelete(
    key: IStaticParamsKey,
  ): void {
    const matchPair = new RegExp(`(${key}=\\w+[&?])|([&]${key}=\\w+)`, 'g');
    const url = this.state.url.replace(matchPair, '');

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleGet(
    key: IStaticParamsKey,
  ): IStaticParamsValue | null {
    const { params } = this.state;

    return params[key] ? params[key] : null;
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
   * 获取所有的参数值
   * @returns {[IStaticParamsKey, IStaticParamsValue][]}
   */
  public handleGetAll(): [IStaticParamsKey, IStaticParamsValue][] {
    return this._aidedHandleGetAll();
  }
}