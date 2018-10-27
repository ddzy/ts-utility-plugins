/**
 * @name: business-tabs 
 * @description 业务插件,tabs标签页
 * @author: yyg
 * @version 1.0.1
 */

/**
 * @param ele 渲染区间
 * @param dataSource 数据来源
 * @param type 页签基本样式 line|card
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
  }


  class Tab {
    public constructor() {
      this.init();
    }
    
    private init(): void {
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
  }
}

const tabs = Tabs.render({
  dataSource: [{
    tabPaneTitle: {
      icon: '',
      text: '标题一',
    },
    tabPaneContent: {
      text: `
        <h3>内容一内容一.</h3>
      `,
    },
  }, {
    tabPaneTitle: {
      icon: '',
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