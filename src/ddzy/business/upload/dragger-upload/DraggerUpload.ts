import utilityDOM from "../../../utility/dom";

/**
 * @name 拖拽图片上传组件
 * @param [container] 挂载的节点
 * ? 下述为单项文件上传至本地列表时触发
 * @param [onBeforeUpload] 文件上传前触发, 在此处进行文件格式、文件大小限制
 * @param [onChangeHook] 文件更改事件
 * @param [onErrorHook] FileReader读取失败时触发
 * @param [onSuccessHook] FileReader读取成功时触发
 * ? 下述为单项文件上传服务器时触发
 * @param [onUploadClickHook] 自定义图片上传
 * @param [onPreviewClickHook] 自定义图片预览
 * @param [onRemoveClickHook] 删除图片列表的某项触发
 */

/**
 * BUG1: 无法在ondrop内部直接使用`e.dataTransfer.files`获取文件列表, 需要自定义数组, 再遍历一遍;
 * BUG2: ondrag和onclick无法共存, 导致无法追加自定义样式, 只需监听onmouseup, 并在其中自行调用`label`标签的click方法 - `label.click()`;
 */


export interface IDraggerUploadProps {
  container?: string;

  onChangeHook?: (e: Event) => void;
  onBeforeUploadHook?: (file: File, fileList: File[]) => boolean | Promise<File | undefined>;

  onUploadClickHook?: (file: File, FileList: File[]) => boolean | Promise<any>;
  onPreviewClickHook?: (file: File, fileList: File[]) => void;
  onRemoveClickHook?: (file: File, fileList: File[]) => void;
  onUploadClickSuccessHook?: (file: File, fileList: File[]) => void;
  onUploadClickFailHook?: (file: File, fileList: File[]) => void;
};

export interface IDraggerUploadState {
  files: File[];
  oContainer: HTMLDivElement;
  oLabel: HTMLLabelElement;
  oInput: HTMLInputElement;
  oShowList: HTMLUListElement;
}


export class DraggerUpload {
  public static readonly defaultProps: IDraggerUploadProps = {
    container: 'body',
  };

  public constructor(
    props: IDraggerUploadProps,
  ) {
    this.__init__(props);
  }


  public readonly state: IDraggerUploadState = {
    files: [],
    oContainer: document.createElement('div'),
    oLabel: document.createElement('label'),
    oInput: document.createElement('input'),
    oShowList: document.createElement('ul'),
  };


  private __init__(props: IDraggerUploadProps): void {
    this._initProps(props);
    this._initDOM();
    this._initStyle();
    this._initCommonEle();
    this.handleDragUpload();
    this.handleClickUpload();
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

  /**
   * 初始化一些常用的变量
   */
  private _initCommonEle(): void {
    const oContainer = utilityDOM.getEle('.ddzy-upload-drag-container') as HTMLDivElement;
    const oLabel = utilityDOM.getEle('.ddzy-upload-drag-main-content') as HTMLLabelElement;
    const oInput = utilityDOM.getEle('.ddzy-upload-drag-main-input') as HTMLInputElement;
    const oShowList = utilityDOM.getEle('.ddzy-upload-show-list') as HTMLUListElement;

    this.state.oContainer = oContainer;
    this.state.oLabel = oLabel;
    this.state.oInput = oInput;
    this.state.oShowList = oShowList;
  }

  private handleCreateDOM(): string {
    let html: string = `
      <div id="ddzy-upload-wrapper">
        <div class="ddzy-upload-main">
          <!-- 拖拽容器 -->
          <div class="ddzy-upload-drag-container" draggable="true">
            <div class="ddzy-upload-drag-main">
              <input id="ddzy-upload-drag-main-input" class="ddzy-upload-drag-main-input" type="file" multiple="true" accept="image/jpg, image/jpeg, image/gif, image/png, image/ico" style="display: none;" />

              <label for="ddzy-upload-drag-main-input" class="ddzy-upload-drag-main-content">
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
          </div>
          <!-- 文件列表 -->
          <div class="ddzy-upload-show-container">
            <div class="ddzy-upload-show-content">
              <ul class="ddzy-upload-show-list">

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

    const mountWrapper = utilityDOM.getEle(container as string);

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
      #ddzy-upload-wrapper .ddzy-upload-main {
        height: 100%;
        user-select: none;
        cursor: pointer;
      }


      /* 拖拽上传部分 */
      #ddzy-upload-wrapper .ddzy-upload-drag-container {
        border: 1px dashed #ccc;
        background-color: #f9f9f9;
        cursor: pointer;
        transition: all .3s ease;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-container:hover {
        border-color: #1890ff;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-main {
        pointer-events: none;
      }

      #ddzy-upload-wrapper .ddzy-upload-drag-main-content {
        padding: 8px;
        text-align: center;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-icon-box {
        margin-top: 8px;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-title-box {
        margin-top: 22px;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-description-box {
        margin-top: 10px;
        margin-bottom: 16px;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-icon-box svg {
        color: #1890ff;
        min-width: 40px;
        min-height: 40px;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-title-box h3 {
        color: #888;
      }
      #ddzy-upload-wrapper .ddzy-upload-drag-description-box p {
        color: #999;
        font-size: 14px;
      }


      /* 文件列表部分 */
      #ddzy-upload-wrapper .ddzy-upload-show-container {
        margin-top: 8px;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-content {

      }
      #ddzy-upload-wrapper .ddzy-upload-show-list {

      }
      #ddzy-upload-wrapper .ddzy-upload-show-item {
        display: flex;
        margin-top: 8px;
        padding: 4px 8px;
        border: 1px solid #ddd;
        color: #666;
        transition: all .3s ease;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-item:hover {
        background-color: #f3f4f5;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-item svg:hover {
        color: #1890ff;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-box {
        flex: 8;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action {

      }
      #ddzy-upload-wrapper .ddzy-upload-show-action > span {
        display: inline-block;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-preview {
        margin-left: 8px;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-send {
        margin-left: 4px;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-name {
        margin-left: 16px;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-loading {

      }
      #ddzy-upload-wrapper .ddzy-upload-show-close-box {
        flex: 1;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-close {
        text-align: right;
      }

      /* Animation */
      @keyframes showItemLoading {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      /* Active classes */
      #ddzy-upload-wrapper .ddzy-upload-drag-container-active {
        border-color: #1890ff;
        filter: blur(1px);
      }

      #ddzy-upload-wrapper .ddzy-upload-show-item-in-animate {
        transition: none;
        opacity: 0;
        transform: translateX(100%);
      }

      #ddzy-upload-wrapper .ddzy-upload-show-item-out-animate {
        transform: translateX(-100%);
        opacity: 0;
      }

      #ddzy-upload-wrapper .ddzy-upload-show-action-loading-active {
        animation: showItemLoading .5s linear infinite;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-loading-success {
        animation: none;
        color: #52c41a;
      }
      #ddzy-upload-wrapper .ddzy-upload-show-action-loading-faild {
        animation: none;
        color: #f5222d;
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

  private handleDragEnter(): void {
    const {
      oContainer,
    } = this.state;

    utilityDOM.addClass(oContainer, 'ddzy-upload-drag-container-active');
  }

  private handleDragLeave(): void {
    const {
      oContainer,
    } = this.state;

    utilityDOM.removeClass(oContainer, 'ddzy-upload-drag-container-active');
  }


  /**
   * 处理单项列表进场动画
   */
  private handleLocalItemAnimateIn(): void {
    const oShowItems = utilityDOM.getAllEle('.ddzy-upload-show-item') as ArrayLike<HTMLLIElement>;
    const oShowItem = oShowItems[oShowItems.length - 1];

    // ! [Bug-fix] 解决多文件上传至本地时, 只显示最后一个文件的问题
    Array.from(oShowItems).forEach((v) => {
      v === oShowItem
        ? (utilityDOM.addClass(v, 'ddzy-upload-show-item-in-animate'))
        : (utilityDOM.removeClass(v, 'ddzy-upload-show-item-in-animate'));
    });

    setTimeout(() => {
      utilityDOM.removeClass(oShowItem, 'ddzy-upload-show-item-in-animate');
    }, 0);
  }

  /**
   * 处理单项列表出场动画
   */
  private handleLocalItemAnimateOut(
    currentItem: HTMLLIElement,
  ): void {
    const { oShowList } = this.state;

    utilityDOM.addClass(currentItem, 'ddzy-upload-show-item-out-animate');

    setTimeout(() => {
      oShowList.removeChild(currentItem);
    }, 300);
  }

  /**
   * 处理本地列表项移除
   */
  private handleLocalItemRemove(): void {
    const oShowItems = utilityDOM
      .getAllEle('.ddzy-upload-show-item') as ArrayLike<HTMLLIElement>;
    const {
      onRemoveClickHook,
    } = DraggerUpload.defaultProps;
    const {
      files,
    } = this.state;

    Array.from(oShowItems).forEach((li) => {
      const oShowItemCloseBtn = li
        .getElementsByClassName('ddzy-upload-show-close')[0]
        .firstElementChild as SVGAElement;

      oShowItemCloseBtn.addEventListener('click', () => {
        const index: number = Number(utilityDOM.getAttr(li, 'data-index'));
        const file: File = files[index];

        // ? 执行移除钩子
        onRemoveClickHook && onRemoveClickHook(file, files);
        this.handleLocalItemAnimateOut(li);
      })
    })
  }

  /**
   * 处理本地列表项预览
   */
  private handleLocalItemPreview(): void {
    const oShowItems = utilityDOM
      .getAllEle('.ddzy-upload-show-item') as ArrayLike<HTMLLIElement>;
    const { files } = this.state;
    const { onPreviewClickHook } = DraggerUpload.defaultProps;

    Array.from(oShowItems).forEach((li) => {
      const oShowItemPreviewBtn = li
        .getElementsByClassName('ddzy-upload-show-action-preview')[0] as HTMLSpanElement;

      oShowItemPreviewBtn.addEventListener('click', () => {
        // ? 根据当前点击的li的下标找到对应的file
        const index: number = Number(utilityDOM.getAttr(li, 'data-index'));
        const file: File = files[index];

        // ? 执行预览钩子
        onPreviewClickHook && onPreviewClickHook(file, files);
      });
    })
  }

  /**
   * 处理成功上传至服务器
   */
  private handleLocalItemSendSuccess(
    showItem: HTMLLIElement,
    file: File,
    fileList: File[],
  ): void {
    const {
      onUploadClickSuccessHook,
    } = DraggerUpload.defaultProps;
    const oShowItemLoadingBtn = showItem
      .getElementsByClassName('ddzy-upload-show-action-loading')[0] as HTMLSpanElement;

    // ? 处理成功上传至服务器时的loading状态
    utilityDOM
      .addClass(oShowItemLoadingBtn, 'ddzy-upload-show-action-loading-success');

    // ? 执行成功上传至服务器的钩子
    onUploadClickSuccessHook && onUploadClickSuccessHook(file, fileList);
  }

  /**
   * 处理上传至服务器失败
   */
  private handleLocalItemSendFaild(
    showItem: HTMLLIElement,
    file: File,
    fileList: File[],
  ): void {
    const {
      onUploadClickFailHook,
    } = DraggerUpload.defaultProps;
    const oShowItemLoadingBtn = showItem
      .getElementsByClassName('ddzy-upload-show-action-loading')[0] as HTMLSpanElement;

    // ? 处理上传至服务器失败时的loading状态
    utilityDOM
      .addClass(oShowItemLoadingBtn, 'ddzy-upload-show-action-loading-faild');

    // ? 执行上传至服务器失败的钩子
    onUploadClickFailHook && onUploadClickFailHook(file, fileList);
  }

  /**
   * 处理本地列表项上传至服务器
   */
  private handleLocalItemSend(): void {
    const oShowItems = utilityDOM
      .getAllEle('.ddzy-upload-show-item') as ArrayLike<HTMLLIElement>;
    const { files } = this.state;
    const { onUploadClickHook } = DraggerUpload.defaultProps;

    Array.from(oShowItems).forEach((li) => {
      const oShowItemSendBtn = li
        .getElementsByClassName('ddzy-upload-show-action-send')[0]
        .firstElementChild as SVGAElement;
      const oShowItemLoadingBtn = li
        .getElementsByClassName('ddzy-upload-show-action-loading')[0] as HTMLSpanElement;

      oShowItemSendBtn.addEventListener('click', () => {
        const index: number = Number(utilityDOM.getAttr(li, 'data-index'));
        const file: File = files[index];

        // ? 处理上传时的loading状态
        utilityDOM
          .addClass(oShowItemLoadingBtn, 'ddzy-upload-show-action-loading-active');

        // ? 执行上传钩子
        if (onUploadClickHook) {
          const result = onUploadClickHook(file, files);

          if ( result instanceof Promise ) {
            result
              .then(() => {
                // ? 成功上传至远程服务器
                this.handleLocalItemSendSuccess(li, file, files);
              })
              .catch(() => {
                // ? 上传远程服务器失败
                this.handleLocalItemSendFaild(li, file, files);
              })
          } else {
            if ( result ) {
              this.handleLocalItemSendSuccess(li, file, files);
            } else {
              this.handleLocalItemSendFaild(li, file, files);
            }
          }
        }
      });
    })
  }

  /**
   * 处理本地展示的单项列表相关(入场、预览、上传、移除、出场...)
   */
  private handleLocalItem(): void {
    this.handleLocalItemAnimateIn();
    this.handleLocalItemRemove();
    this.handleLocalItemPreview();
    this.handleLocalItemSend();
  }


  /**
   * 处理添加至本地预览列表
   * @param file 单个文件对象
   */
  private handleAppendToShow(file: File): void {
    const { oShowList } = this.state;
    const { name } = file;

    const text = `
      <li class="ddzy-upload-show-item" data-index=${oShowList.children.length}>
        <div class="ddzy-upload-show-action-box">
          <div class="ddzy-upload-show-action">
            <span class="ddzy-upload-show-action-loading">
              <svg class="icon" aria-hidden="true" data-index=${oShowList.children.length}>
                <use xlink:href="#icon-Loading"></use>
              </svg>
            </span>
            <span class="ddzy-upload-show-action-name" title="图片名称">
              ${name}
            </span>
            <span class="ddzy-upload-show-action-preview" title="预览">
              <svg class="icon" aria-hidden="true" data-index=${oShowList.children.length}>
                <use xlink:href="#icon-eye"></use>
              </svg>
            </span>
            <span class="ddzy-upload-show-action-send" title="上传">
              <svg class="icon" aria-hidden="true" data-index=${oShowList.children.length}>
                <use xlink:href="#icon-upload1"></use>
              </svg>
            </span>
          </div>
        </div>
        <div class="ddzy-upload-show-close-box">
          <div class="ddzy-upload-show-close" title="移除">
            <svg class="icon" aria-hidden="true" data-index=${oShowList.children.length}>
              <use  xlink:href="#icon-et-wrong"></use>
            </svg>
          </div>
        </div>
      </li>
    `;

    oShowList.innerHTML += text;

    this.handleLocalItem();
  }


  /**
   * 处理添加至文件数组, 后续会用到
   * @param file 单个文件对象
   */
  private handleAppendToFiles(file: File): void {
    this.state.files.push(file);
  }


  /**
   * 处理文件上传前的钩子, 根据`onBeforeUploadHook`返回true或resolve来添加至本地列表, 反之不添加
   * @param file 单个文件对象
   * @param files 文件列表
   */
  private handleBeforeUploadHook(file: File, files: FileList): void {
    const {
      onBeforeUploadHook,
    } = DraggerUpload.defaultProps;

    if (onBeforeUploadHook) {
      const result = onBeforeUploadHook(file, Array.from(files));

      if (result instanceof Promise) {
        result
          .then((newFile) => {
            if (newFile instanceof File) {
              this.handleAppendToFiles(newFile);
              this.handleAppendToShow(newFile);
            } else {
              this.handleAppendToFiles(file);
              this.handleAppendToShow(file);
            }
          })
          .catch(() => { })
      } else {
        if (result) {
          this.handleAppendToFiles(file);
          this.handleAppendToShow(file);
        }
      }
    } else {
      this.handleAppendToFiles(file);
      this.handleAppendToShow(file);
    }
  }


  private handleDrop(e: DragEvent): void {
    const {
      onChangeHook,
    } = DraggerUpload.defaultProps;
    const {
      oContainer,
    } = this.state;
    const dataTransfer = e.dataTransfer as DataTransfer;

    // ? 执行文件更改钩子
    onChangeHook && onChangeHook(e);

    utilityDOM.removeClass(oContainer, 'ddzy-upload-drag-container-active');

    Array.from(dataTransfer.files).forEach((file) => {
      this.handleBeforeUploadHook(file, dataTransfer.files);
    });
  }

  private handleChange(e: Event): void {
    const {
      onChangeHook,
    } = DraggerUpload.defaultProps;
    const target = e.target as HTMLInputElement;
    const fileList = target.files as FileList;

    // ? 执行文件更改钩子
    onChangeHook && onChangeHook(e);

    Array.from(fileList).forEach((file) => {
      console.log(file);
      this.handleBeforeUploadHook(file, fileList);
    });
  }

  /**
   * 处理拖拽形式上传到本地
   */
  private handleDragUpload(): void {
    const { oContainer } = this.state;

    // ? 解决浏览器默认打开预览窗口
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    document.addEventListener('drop', (e) => {
      e.preventDefault();
    });

    oContainer.addEventListener('dragenter', () => {
      this.handleDragEnter();
    });
    oContainer.addEventListener('dragleave', () => {
      this.handleDragLeave();
    });
    oContainer.addEventListener('drop', (e) => {
      this.handleDrop(e);
    });
  }

  /**
   * 处理点击上传到本地
   */
  private handleClickUpload(): void {
    const {
      oContainer,
      oLabel,
      oInput,
    } = this.state;

    // ? 解决ondrag和onclick冲突, 导致无法弹起文件选框的问题
    oContainer.addEventListener('mouseup', () => {
      oLabel.click();
    });

    oInput.addEventListener('change', (e) => {
      this.handleChange(e);
    });
  }
}