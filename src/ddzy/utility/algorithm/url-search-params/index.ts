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
export type IStaticParams = Record<string, IStaticParamsValue>;
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
    key: string,
    value: IStaticParamsValue,
  ): void {
    const url: string = `${this.state.url}&${key}=${value}`;

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleDelete(
    key: string,
  ): void {
    const matchPair = new RegExp(`(${key}=\\w+[&?])|([&]${key}=\\w+)`, 'g');
    const url = this.state.url.replace(matchPair, '');

    this._aidedHandleSetURLState(url);
    this._aidedHandleSetParamsState(this.state.url);
  }

  private _aidedHandleGet(
    key: string,
  ): IStaticParamsValue | null {
    const { params } = this.state;

    return params[key] ? params[key] : null;
  }

  /**
   * 追加新的键值对, 入口
   * @param key 需要追加的键
   * @param value 键值
   * @returns {string} 返回新的url
   */
  public handleAppend(
    key: string,
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
    key: string,
  ): URLSearchParams {
    this._aidedHandleDelete(key);

    return this;
  }

  /**
   * 获取指定的参数键值, 入口
   * @param key 键名
   */
  public handleGet(
    key: string,
  ): IStaticParamsValue | null {
    return this._aidedHandleGet(key);
  }
}