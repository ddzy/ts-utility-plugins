
/**
 * @name: business-tabs 
 * @description 业务插件,tabs标签页
 * @author: yyg
 * @version 1.0.3
 */

/**
 * @param ele 渲染区间
 * @param dataSource 数据来源
 * @param type 页签基本样式 line|card
 * @param mouse 切换属性 mouseenter | click
 * @param defaultActiveKey 初始化选中面板的key
 * @param tabBarGap tabs之间的间隙
 * @param tabBarStyle tab bar的样式对象
 * @param tabBarLineStyle tab bar下面的线条样式
 * @param onChange 切换面板的回调
 * @param onTabClick tab被点击的回调
 * @param animated 是否使用动画
 */


namespace Tabs {

  export interface IDataSource {
    tabPaneTitle: {
      icon: string,
      text: string,
    };
    tabPaneContent: {
      text: string,
    };
  }

  export interface ITabsProps {
    ele: string;
    dataSource: IDataSource[];
    type?: 'line' | 'card';
    mouse?: 'mouseenter' | 'click';
    defaultActiveKey?: number;
    tabBarGap?: number;
    tabBarStyle?: object;
    tabBarLineStyle?: object;
    animated?: boolean;
    onChange?: (activeKey: number | string) => void;
    onTabClick?: () => void;
  }


  export const defaultSettings = {
    ele: null,
    dataSource: [],
    type: 'line',
    mouse: 'mouseenter',
    defaultActiveKey: 1,
    tabBarGap: 5,
    tabBarStyle: {},
    tabBarLineStyle: {},
    animated: true,
    onChange: null,
    onTabClick: null,
  };


  export function render(_props: ITabsProps) {
    _aidedInitSettings(_props);
    _aidedInitTab();

    return Tabs;
  }


  function _aidedInitSettings(_props: any): void {
    for (const key in _props) {
      if (_props.hasOwnProperty(key)) {
        const element = _props[key];
        key === 'ele'
          ? _aidedInitEle(element)
          : Reflect.set(defaultSettings, key, element);
      }
    }
  }


  function _aidedInitEle(key: string): void {
    const ele = Utils.getEle(key);

    if (ele) {
      Reflect.set(defaultSettings, 'ele', ele);
    } else {
      throw new Error('Please enter an exist HTMLElement!');
    }
  }


  function _aidedInitTab() {
    return new Tab();
  }


  namespace Utils {
    export function getEle(
      el: string,
    ): HTMLElement | null {
      return document.querySelector(el);
    }

    export function getAllEle(
      el: string,
    ): NodeList | null {
      return document.querySelectorAll(el);
    }

    export function setCss(
      el: HTMLElement,
      options: any,
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];
          el.style.cssText += `${key}: ${element};`;
        }
      }

      return Utils;
    }

    export function setAttr(
      el: HTMLElement,
      options: any,
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];
          el.setAttribute(key, element);
        }
      }

      return Utils;
    }

    export function isArray(
      el: any,
    ): boolean {
      return el && Array.isArray(el);
    }

    export function getRandomWithPositive(
      min: number,
      max: number,
    ): number {
      return ~~(Math.random() * (max - min) + min);
    }

    export function removeClass(
      el: HTMLElement,
      ...args: string[]
    ) {
      args.forEach((item: string) => {
        el.classList.remove(item);
      });

      return Utils;
    }

    export function addClass(
      el: HTMLElement,
      ...args: string[]
    ) {
      args.forEach((item: string) => {
        el.classList.add(item);
      });

      return Utils;
    }
  }


  class Tab {
    public constructor() {
      this.init();
    }
    
    private init(): void {
      this.handleInitEle();
      this.handleSetStyle();
      this.handleMouse();
    }

    private handleInitEle() {
      const { ele } = defaultSettings;

      if (ele) {
        const el = ele as HTMLElement;
        el.innerHTML = this.handleCreateDOMTree();
      }
    }

    private handleCreateDOMTree(): string {
      const { dataSource } = defaultSettings as any;
      let navStr: string = '';
      let contentStr: string = '';

      if (dataSource.length !== 0) {
        dataSource.forEach((item: IDataSource, index: number) => {
          navStr += `
            <li class="yyg-nav-item" data-id=${index + 1}>
              <div class="yyg-nav-item-icon">
                ${item.tabPaneTitle.icon}
              </div>
              <div class="yyg-nav-item-text">
                ${item.tabPaneTitle.text}
              </div>
            </li>
          `;
          contentStr += `
            <li class="yyg-tabpane-item" data-id=${index + 1}>
              <div class="yyg-tabpane-item-content">
                ${item.tabPaneContent.text}
              </div>
            </li>
          `;
        });
      }

      const html: string = `
        <div class="yyg-tabs-wrapper">
          <div class="yyg-tabs-main">
            <!-- 导航容器 -->
            <div class="yyg-tabs-main-bar">
              <div class="yyg-bar-nav-container">
                <ul class="yyg-nav-list-box">
                  ${navStr}
                </ul>
                <div class="yyg-nav-line-box">
                  <span class="yyg-nav-line"></span>
                </div>
              </div>
            </div>
            <!-- 内容容器 -->
            <div class="yyg-tabs-main-content">
              <div class="yyg-content-tabpane-container">
                <ul class="yyg-tabpane-list">
                  ${contentStr}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;

      return html;
    }

    private handleSetStyle(): void {
      const {
        tabBarGap,
        dataSource,
      } = defaultSettings as any;
      const oIconBoxArr = Utils
        .getAllEle('.yyg-nav-item-icon') as any;
      let oStyle = Utils
        .getEle('style');

      if (!oStyle) {
        const oHead = Utils.getEle('head') as HTMLHeadElement;
        oStyle = document.createElement('style');

        oHead.appendChild(oStyle);
      }

      dataSource.forEach((item: IDataSource, index: number) => {
        if (item.tabPaneTitle.icon) {
          oIconBoxArr[index].innerHTML = item.tabPaneTitle.icon;
          Utils.setCss(oIconBoxArr[index], {
            flex: .6,
            'text-align': 'right',
          });
        }
      });


      oStyle.innerText += `
        .yyg-tabs-wrapper {
          width: 100%;
          height: 100%;
        }
        .yyg-tabs-main {
          box-sizing: border-box;
          padding: 10px 0;
        }
        .yyg-tabs-main-bar {
          
        }
        .yyg-bar-nav-container {
          box-sizing: border-box;
          height: 50px;
          border-bottom: 1px solid #ccc;
          line-height: 47px;
        }
        .yyg-nav-list-box {
          display: flex;
          transition: all 1s ease-in;
        }
        .yyg-nav-item {
          flex: 1;
          display: flex;
          margin-left: ${tabBarGap}px;
          text-align: center;
          color: #5a5a5a;
          font-size: 14px;
          cursor: pointer;
          user-select: none;
        }
        .yyg-nav-item:hover {
          color: #1890ff;
        }
        /*
          bar-item
        */
        .yyg-nav-item-icon {
          flex: ${0};
          font-size: 12px;
        }
        .yyg-nav-item-text {
          flex: 1;
        }
        .yyg-nav-line-box {
          width: 155px;
          height: 3px;
          margin-left: ${tabBarGap}px;
          background-color: #1890ff;
        }

        /* 内容框 */
        .yyg-tabs-main-bar {

        }
        .yyg-content-tabpane-container {
          overflow: hidden;
          box-sizing: border-box;
          padding: 5px 0;
        }
        .yyg-tabpane-list {
          width: ${dataSource.length * 100}%;
          transition: all .1s ease-in-out;
        }
        .yyg-tabpane-item {
          float: left;
          width: ${100 / dataSource.length}%;
        }

        /* 活动样式类 */
        .yyg-nav-item-active {
          color: #1890ff;
        }
      `;
    }

    private handleMouse(): void {
      const { mouse } = defaultSettings;
      const paneList = Utils
        .getEle('.yyg-tabpane-list') as HTMLUListElement;
      const barItems = Utils
        .getAllEle('.yyg-nav-item') as NodeListOf<HTMLLIElement>;

      barItems.forEach((item: HTMLLIElement) => {
        item.addEventListener(mouse, () => {
          barItems.forEach((ite: HTMLLIElement) => {
            Utils.removeClass(ite, 'yyg-nav-item-active');
          })
          Utils.addClass(item, 'yyg-nav-item-active');
        });
      });
    }
  }
}

const tabs = Tabs.render({
  dataSource: [{
    tabPaneTitle: {
      // icon: '<i class="icon iconfont icon-goumai"></i>',
      icon: '',
      text: '标题一',
    },
    tabPaneContent: {
      text: `
        <ol>
          <li>todo1</li>
          <li>todo2</li>
          <li>todo3</li>
        </ol>
      `,
    },
  }, {
    tabPaneTitle: {
      icon: '<i class="icon iconfont icon-gongnengjianyi"></i>',
      // icon: '',
      text: '标题二',
    },
    tabPaneContent: {
      text: `
        <h3>内容二内容二.</h3>
      `,
    },
  },{
    tabPaneTitle: {
      icon: '',
      text: '标题一',
    },
    tabPaneContent: {
      text: `
        <h3>内容三内容三.</h3>
      `,
    },
  }],
  ele: '#app',
});