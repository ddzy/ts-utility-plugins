/**
 * @name: business-tabs
 * @description: 业务插件, tabs
 * @author: ddzy
 * @since: 最近修改于2019/4/28
 */

import utilityDOM from '../../utility/dom/index';


export interface ITabConfigProps {
  container?: string;
  dataSource?: ITabDataSource[];
  type?: ITabTypeEffect;
  mouse?: ITabMouseEffect;
  defaultActiveKey?: number;
  tabBarGap?: number;
  tabBarStyle?: ITabBarStyle;
  tabBarLineStyle?: ITabBarLineStyle;
  animated?: boolean;
  onChange?: (activeKey: number | string) => void;
  onTabClick?: () => void;
}
interface ITabDataSource {
  tabPaneTitle: {
    icon?: string,
    text?: string,
  },
  tabPaneContent: {
    text?: string,
  },
};
interface ITabBarStyle {
  'background-color'?: string;
  color?: string;
  'font-size'?: number;
  'font-family'?: string;
  backgroundColorActive?: string;
  colorActive?: string;
}
interface ITabBarLineStyle {
  'background-color'?: string;
  height?: number;
}
type ITabTypeEffect = 'line' | 'card';
type ITabMouseEffect = 'mouseenter' | 'click';


export default class Tab {
  public static defaultConfig = {
    container: 'body',
    dataSource: [
      {
        tabPaneTitle: {
          text: '面板一',
          icon: '😂',
        },
        tabPaneContent: {
          text: '内容区块一',
        },
      },
      {
        tabPaneTitle: {
          text: '面板二',
          icon: '😘',
        },
        tabPaneContent: {
          text: '内容区块二',
        },
      },
      {
        tabPaneTitle: {
          text: '面板三',
          icon: '😍',
        },
        tabPaneContent: {
          text: '内容区块三',
        },
      }
    ],
    type: 'line',
    mouse: 'mouseenter',
    defaultActiveKey: 1,
    tabBarGap: 8,
    tabBarStyle: {
      'background-color': '#fafafa',
      color: '#5a5a5a',
      'font-size': 14,
      backgroundColorActive: '#fff',
      colorActive: '#1890ff',
    },
    tabBarLineStyle: {
      'background-color': '#1890ff',
      height: 3,
    },
    animated: true,
    onTabClick: () => void 0,
    onChange: (_activeKey: string | number) => void 0,
  }

  public constructor(
    config: ITabConfigProps,
  ) {
    this.__init(config);
  }

  private __init(
    config: ITabConfigProps,
  ): void {
    this.__initSettings(config);
    this.render();
  }

  /**
   * 初始化配置项
   * @param config 配置项
   */
  private __initSettings(
    config: ITabConfigProps,
  ): void {
    const { defaultConfig } = Tab;

    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const value = Reflect.get(config, key);
        Reflect.set(defaultConfig, key, value);
      }
    }
  }

  private render(): void {
    this.handleMount();
    this.handleSetStyle();
    this.handleMouse();
  }

  /**
   * 挂载
   */
  private handleMount(): void {
    const {
      container,
    } = Tab.defaultConfig;
    const oContainer = utilityDOM.getEle(container);

    if (oContainer) {
      const oTempDiv = document.createElement('div');
      oTempDiv.innerHTML = this.handleCreateDOMTree();
      oContainer.appendChild(oTempDiv);
    } else {
      throw new TypeError('Invalid container you have passed!');
    }
  }

  /**
   * 初始化样式
   */
  private handleSetStyle(): void {
    const {
      tabBarGap,
      dataSource,
      tabBarStyle,
      tabBarLineStyle,
    } = Tab.defaultConfig;
    const oIconBoxArr = utilityDOM
      .getAllEle('.yyg-nav-item-icon') as any;
    const oNavItem = utilityDOM
      .getEle('.yyg-nav-item') as HTMLLIElement;
    let oStyle = utilityDOM
      .getEle('style');

    if (!oStyle) {
      const oHead = utilityDOM.getEle('head') as HTMLHeadElement;
      oStyle = document.createElement('style');

      oHead.appendChild(oStyle);
    }

    dataSource.forEach((item: ITabDataSource, index: number) => {
      if (item.tabPaneTitle.icon) {
        oIconBoxArr[index].innerHTML = item.tabPaneTitle.icon;
        utilityDOM.setCss(oIconBoxArr[index], {
          flex: .6,
          'text-align': 'right',
        });
      } else {
        utilityDOM.setCss(oIconBoxArr[index], {
          display: 'none',
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
      }
      .yyg-nav-item {
        flex: 1;
        display: flex;
        margin-right: ${tabBarGap}px;
        text-align: center;
        color: ${tabBarStyle['color'] || '#5a5a5a'};
        font-size: ${tabBarStyle['font-size'] || 14}px;
        cursor: pointer;
        user-select: none;
        transition: all .3s ease-in;
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
        width: ${oNavItem.clientWidth / dataSource.length - tabBarGap}px;
        height: ${tabBarLineStyle['height'] || 3}px;
        background-color: ${tabBarLineStyle['background-color'] || '#1890ff'};
        transition: all .3s ease-in;
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
      }
      .yyg-tabpane-item {
        float: left;
        width: ${100 / dataSource.length}%;
      }

      /* type */
      .yyg-nav-item-line {

      }
      .yyg-nav-item-card {
        border: 1px solid #e8e8e8;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        background-color: ${tabBarStyle['background-color'] || '#fafafa'};
      }

      /* 活动样式类 */
      .yyg-nav-item-card-active {
        background-color: ${tabBarStyle['backgroundColorActive'] || '#fff'};
        color: ${tabBarStyle['colorActive'] || '#1890ff'};
      }
      .yyg-nav-item-line-active {
        color: ${tabBarStyle['colorActive'] || '#1890ff'};
      }

      /* animated */
      .yyg-tabpane-list-animated {
        transition: all .2s ease-in-out;
      }
    `;
  }

  /**
   * 鼠标配置项相关
   */
  private handleMouse(): void {
    const {
      mouse,
      tabBarGap,
      type,
      defaultActiveKey,
      animated,
      onTabClick,
      onChange,
    } = Tab.defaultConfig;
    const paneList = utilityDOM
      .getEle('.yyg-tabpane-list') as HTMLUListElement;
    const barItems = utilityDOM
      .getAllEle('.yyg-nav-item') as NodeListOf<HTMLLIElement>;
    const lineBox = utilityDOM
      .getEle('.yyg-nav-line-box');

    // TODO: 判断不同type不同active样式
    const whichTypeActiveClass: string = type === 'line'
      ? 'yyg-nav-item-line-active'
      : 'yyg-nav-item-card-active';
    // TODO: 是否具有动画效果
    const whichAnimatedClass: string = animated
      ? 'yyg-tabpane-list-animated'
      : 'yyg-tabpane-list-noanimated';


    lineBox && utilityDOM.setCss(lineBox, {
      transform: `translateX(${
        lineBox.clientWidth * (defaultActiveKey - 1) + tabBarGap * (defaultActiveKey - 1)
      }px)`,
    });

    utilityDOM
      .addClass(
        barItems[defaultActiveKey - 1],
        whichTypeActiveClass
      )
      .setCss(paneList, {
        transform: `translateX(${-(defaultActiveKey - 1) * 500}px)`,
      })
      .addClass(paneList, whichAnimatedClass);

    barItems.forEach((item: HTMLLIElement, index: number) => {
      item.addEventListener(mouse, () => {
        // 钩子
        onTabClick && onTabClick();
        onChange && onChange(
          utilityDOM.getAttr(item, 'data-id') as string,
        );

        barItems.forEach((ite: HTMLLIElement) => {
          utilityDOM.removeClass(ite, whichTypeActiveClass);
        })

        lineBox && utilityDOM.setCss(lineBox, {
          transform: `translateX(${
            lineBox.clientWidth * index + tabBarGap * index
          }px)`,
        });

        utilityDOM
          .addClass(item, whichTypeActiveClass)
          .setCss(paneList, {
            transform: `translateX(${-index * 500}px)`,
          });
      });
    });
  }

  private handleCreateDOMTree(): string {
    const {
      dataSource,
      type,
    } = Tab.defaultConfig;
    let navStr: string = '';
    let contentStr: string = '';

    if (dataSource.length !== 0) {
      dataSource.forEach((item: ITabDataSource, index: number) => {
        navStr += `
          <li class="yyg-nav-item ${
            type === 'line' ? 'yyg-nav-item-line' : 'yyg-nav-item-card'
          }" data-id=${index + 1}>
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

    const navBottomLineStr: string = `
      <div class="yyg-nav-line-box">
        <span class="yyg-nav-line"></span>
      </div>
    `;

    const html: string = `
      <div class="yyg-tabs-wrapper">
        <div class="yyg-tabs-main">
          <!-- 导航容器 -->
          <div class="yyg-tabs-main-bar">
            <div class="yyg-bar-nav-container">
              <ul class="yyg-nav-list-box">
                ${navStr}
              </ul>
              ${type === 'line' ? navBottomLineStr : ''}
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
}