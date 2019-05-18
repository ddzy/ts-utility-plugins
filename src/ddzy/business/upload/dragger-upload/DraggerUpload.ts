import utilityDOM from "../../../utility/dom";

/**
 * @name 拖拽图片上传组件
 * @param [container] 挂载的节点
 * @param [onChangeHook] 文件更改事件
 * @param [size] 上传图片的限制大小(KB)
 * ? 下述为单项文件上传至本地列表时触发
 * @param [onErrorHook] FileReader读取失败时触发
 * @param [onSuccessHook] FileReader读取成功时触发
 * ? 下述为单项文件上传服务器时触发
 * @param [onUploadClickHook] 自定义图片上传
 * @param [onPreviewClickHook] 自定义图片预览
 * @param [onRemoveClickHook] 删除图片列表的某项触发
 */


export interface IDraggerUploadProps {
  container?: string;
  size?: IStaticDraggerUploadSizeParams,

  onChangeHook?: (e: Event) => void;

  onSuccessHook?: (e: FileReader) => void;
  onErrorHook?: (e: FileReader) => void;

  onUploadClickHook?: (file: File) => void;
  onPreviewClickHook?: (file: File) => void;
  onRemoveClickHook?: (file: File) => void;
};
export interface IStaticDraggerUploadSizeParams {
  min: number,
  max: number,
};


export class DraggerUpload {
  public static readonly defaultProps = {
    container: 'body',
    size: {
      min: 2,
      max: 2048,
    },
  };

  public constructor(
    props: IDraggerUploadProps,
  ) {
    this.__init__(props);
  }

  private __init__(props: IDraggerUploadProps): void {
    this._initProps(props);
    this._initDOM();
    this._initStyle();
  }

  private _initProps(
    props: IDraggerUploadProps,
  ): void {
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const value = Reflect.get(props, key);
        Reflect.set(DraggerUpload.defaultProps, key, value);
      }
    }
  }

  private _initDOM(): void {
    this.handleMountDOM(this.handleCreateDOM());
  }

  private _initStyle(): void {
    this.handleMountStyle(this.handleCreateStyle());
  }

  private handleCreateDOM(): string {
    let html: string = '';
    return html;
  }

  private handleMountDOM(text: string): void {
    const {
      container,
    } = DraggerUpload.defaultProps;

    const mountWrapper = utilityDOM.getEle(container);

    if (mountWrapper) {
      mountWrapper.innerHTML += text;
    } else {
      throw new TypeError('Please enter an existing selector.');
    }
  }

  private handleCreateStyle(): string {
    let css: string = '';
    return css;
  }

  private handleMountStyle(text: string): void {
    let oStyle = document.querySelector('style');

    if (oStyle) {
      oStyle.innerText += `
        /* Create by DraggerUpload */
        ${text}
      `;
    }
    else {
      oStyle = document.createElement('style') as HTMLStyleElement;
      oStyle.innerText += oStyle.innerText += `
        /* Create by DraggerUpload */
        ${text}
      `;;
      document.head.appendChild(oStyle);
    }
  }
}