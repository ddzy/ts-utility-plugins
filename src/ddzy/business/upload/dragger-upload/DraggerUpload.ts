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
    let html: string = `
      <div id="ddzy-upload-wrapper">
        <div class="ddzy-upload-main">
          <!-- 拖拽容器 -->
          <div class="ddzy-upload-drag-container">
            <input id="ddzy-upload-drag-input" type="file" multiple="true" accept="image/jpg, image/jpeg, image/gif, image/png" style="display: none;" />

            <label for="ddzy-upload-drag-input" class="ddzy-upload-drag-content">
              <div class="ddzy-upload-drag-icon-box">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-upload"></use>
                </svg>
              </div>
              <div class="ddzy-upload-drag-title-box">
                <h3>Click or Drag to upload</h3>
              </div>
              <div class="ddzy-upload-drag-description-box">
                <p>Support mutiple files but only image</p>
              </div>
            </label>
          </div>
          <!-- 文件列表 -->
          <div class="ddzy-upload-show-container">
            <div class="ddzy-upload-show-content">
              <ul class="ddzy-upload-show-list">
                <li class="ddzy-upload-show-item">
                  <div class="ddzy-upload-show-action-box">
                    <div class="ddzy-upload-show-action">
                      <span class="ddzy-upload-show-action-loading">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-Loading"></use>
                        </svg>
                      </span>
                      <span class="ddzy-upload-show-action-name" title="图片名称">
                        miaomiao.jpg
                      </span>
                      <span class="ddzy-upload-show-action-preview" title="预览">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-eye"></use>
                        </svg>
                      </span>
                      <span class="ddzy-upload-show-action-send" title="上传">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-upload1"></use>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div class="ddzy-upload-show-close-box">
                    <div class="ddzy-upload-show-close" title="移除">
                      <svg class="icon" aria-hidden="true">
                        <use  xlink:href="#icon-et-wrong"></use>
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

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
    let css: string = `
      body, ul, li, p, h3 {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style-type: none;
      }
      label {
        display: block;
        cursor: pointer;
      }

      #ddzy-upload-wrapper {
        height: 100%;
      }
      .ddzy-upload-main {
        height: 100%;
        user-select: none;
        cursor: pointer;
      }


      /* 拖拽上传部分 */
      .ddzy-upload-drag-container {
        border: 1px dashed #666;
        background-color: #f7f7f7;
        cursor: pointer;
      }
      .ddzy-upload-drag-container:hover {
        border-color: #1890ff;
      }
      .ddzy-upload-drag-content {
        padding: 8px;
        text-align: center;
      }
      .ddzy-upload-drag-icon-box {
        margin-top: 8px;
      }
      .ddzy-upload-drag-title-box {
        margin-top: 22px;
      }
      .ddzy-upload-drag-description-box {
        margin-top: 10px;
        margin-bottom: 16px;
      }
      .ddzy-upload-drag-icon-box svg {
        color: #1890ff;
        min-width: 40px;
        min-height: 40px;
      }
      .ddzy-upload-drag-title-box h3 {
        color: #888;
      }
      .ddzy-upload-drag-description-box p {
        color: #999;
        font-size: 14px;
      }


      /* 文件列表部分 */
      .ddzy-upload-show-container {
        margin-top: 8px;
      }
      .ddzy-upload-show-content {

      }
      .ddzy-upload-show-list {

      }
      .ddzy-upload-show-item {
        display: flex;
        padding: 4px 8px;
        border: 1px solid #ddd;
        color: #666;
        transition: all .3s ease;
      }
      .ddzy-upload-show-item:hover {
        background-color: #f3f4f5;
      }
      .ddzy-upload-show-item svg:hover {
        color: #1890ff;
      }
      .ddzy-upload-show-action-box {
        flex: 8;
      }
      .ddzy-upload-show-action {

      }
      .ddzy-upload-show-action > span {
        display: inline-block;
      }
      .ddzy-upload-show-action-preview {
        margin-left: 8px;
      }
      .ddzy-upload-show-action-send {
        margin-left: 4px;
      }
      .ddzy-upload-show-action-name {
        margin-left: 16px;
      }
      .ddzy-upload-show-action-loading {

      }
      .ddzy-upload-show-close-box {
        flex: 1;
      }
      .ddzy-upload-show-close {
        text-align: right;
      }
    `;

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