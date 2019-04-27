import * as Tabs from './business/tabs/index';


Tabs.default.render({
  ele: '#app',
  dataSource: [
    {
      tabPaneTitle: {
        text: '面板一',
        icon: '🐷'
      },
      tabPaneContent: {
        text: '面板一内容, 面板一内容',
      },
    },
    {
      tabPaneTitle: {
        text: '面板二',
        icon: '👌',
      },
      tabPaneContent: {
        text: '面板二内容, 面板二内容'
      },
    }
  ],
});