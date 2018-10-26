/**
 * @name: business-tabs 
 * @description 业务插件,tabs标签页
 * @author: yyg
 * @version 1.0.0
 */

/**
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
    tabPaneTitle?: {
      iconUrl?: string,
      text?: string,
    };
    tabPaneContent?: string;
  }

  export interface ITabsProps {
    dataSource: IDataSource[];
    type?: 'line' | 'card';
    defaultActiveKey?: 1;
    tabBarGap?: 5;
    tabBarStyle?: object;
    tabBarLineStyle?: object;
    animated?: boolean;
    onChange?: (activeKey: number | string) => void;
    onTabClick?: () => void;
  }

  export function render(_props: ITabsProps): void {
    
  }

}