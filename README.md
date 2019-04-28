# ts-utility-plugins

封装的插件库, 采用纯原生ts构建

## 一、说明

> 插件库包括 `canvas特效`插件, `业务`插件、`工具组件`等等...

> `README`后续会以`github page`形式展示

## 二、用法

![使用流程图](https://github.com/ddzy/many-universal-image/blob/master/images/business/s1.PNG)

> **PS**: 重构代码中, 暂未实现对`npm引入`的支持

## 三、目录

- [x] Canvas
  - [x] [canvas-stars-line](#四、canvas-stars-line)
  - [x] [canvas-colorful-bubble](#五、canvas-colorful-bubble)
  - [x] [canvas-jumping-characters](#六、canvas-jumping-characters)
- [x] Business
  - [x] [business-carousel](#七、business-carousel)
  - [x] [business-tab](#八、business-tab)

## 四、canvas-stars-line

> 非常nice的`星空连线`特效插件, 自定义大多数配置

#### 默认渲染

```ts
StarsLine.render(el: string);    // el canvas元素
```

#### 自定义配置项

| Key        | Type    | default | Introduce        |
| ---------- | ------- | ------- | ---------------- |
| cvsWidth   | number  | 500     | 画布宽           |
| cvsHeight  | number  | 500     | 画布高           |
| cvsBgColor | string  | #000    | 画布背景颜色     |
| ballNum    | number  | 100     | 星空点数量       |
| allowMouse | boolean | false   | 是否允许鼠标交互 |
| lineColor  | string  | #1890ff | 连线颜色         |
| lineWidth  | number  | 1       | 连线宽度         |
| ballSpeed  | number  | 1       | 星空点移动速度   |
| ballColor  | string  | #fff    | 星空点颜色       |
| isResize   | boolean | false   | 是否跟随窗口大小 |

#### 支持链式调用

```ts
StarsLine
  .config({...})
  .render(el: string)
```

## 五、canvas-colorful-bubble

> 构建的canvas气泡插件, 可自定义大多数配置

> 开启```鼠标```交互的情况下, 可用作```个人博客背景```

1. 基本用法

```ts
ColorfulBubble
  .config({})
  .render(el: string)
```

2. 自定义配置项

```ts
ColorfulBubble
  .config({
    cvsWidth?:        number    // 画布宽
    cvsHeight?:       number    // 画布高
    cvsBgColor?:      string    // 画布背景
    bubbleNum?:       number    // 气泡数量
    bubbleOpacity?:   number    // 气泡透明度
    bubbleSpeed?:     number    // 气泡移动速度
    bubbleScaleRange?: {        // 气泡半径范围
      min: number,
      max: number
    }
    allowMouse?:      boolean   // 是否允许鼠标交互
    bubbleColorArr?:  string[]  // 气泡颜色数组
    bubbleExpandRange?: number  // 气泡缩放极值
  })
  .render(el: string)
```

## 六、canvas-jumping-characters

> 点击产生文字,并逐渐消失, 可用作个人博客背景, 增强用户体验.

1. 采用默认配置项

```ts
JumpingCharacters.render({
  ele: HTMLCanvasElement,
});
```

2. 自定义配置项

> (Ps: 传入数组则随机取值)

```ts
JumpingCharacters.render({
  ele:            HTMLCanvasElement,
  cvsWidth:       number                // 画布宽
  cvsHeight:      number                // 画布高
  cvsBgColor:     string                // 画布背景
  text:           string | string[]     // 产出文字
  textColor:      string | string[]     // 文字颜色
  textSize:       number                // 文字大小
  safeDistance:   number                // 安全距离(文字移动多远后消失)
  initialOpacity: number                // 初始透明度
  speed:          number                // 移动速率
});
```

## 七、business-carousel

> 封装的```轮播```插件, 用法及其简单, 页面只需```一个div```元素, 不用撰写烦人的DOM, 插件会自动生成DOMTree

#### 7.1 基本用法

```ts
new Carousel({});
```

#### 7.2 可配置项

```ts
interface IDataSource {
  text: string,
  img: {
    url: string,
    target: string,
  },
}
```

| Key          | Type          | require | Description          |
| ------------ | ------------- | ------- | -------------------- |
| dataSource   | IDataSource[] | false   | 基本数据             |
| afterChange  | () => void    | false   | 切换后回调           |
| beforeChange | () => void    | false   | 切换前回调           |
| autoPlay     | boolean       | false   | 是否自动切换         |
| showDots     | boolean       | false   | 是否显示导航点       |
| showArrows   | boolean       | false   | 是否显示箭头         |
| easing       | string        | false   | 动画效果             |
| effect       | Fade          | false   | 切换效果             |
| delayTime    | number        | false   | 自动滚动延迟时间     |
| duringTime   | number        | false   | 过渡时间             |
| isHoverPause | boolean       | false   | 鼠标放置是否停止轮播 |

#### 7.3 注意事项

> 目前只支持 Fade & Scroll 两种状态轮播图, **默认使用`scroll`**

```ts
new Carousel({
  effect: 'scroll' | 'fade',
});
```

## 八、business-tab

> tabs标签页插件, 只需传入 渲染的数据 和 渲染区间就可

> 可自定义大多数配置项

#### 基本用法

```ts
  export interface IDataSource {
    tabPaneTitle: {
      icon: string,
      text: string,
    };
    tabPaneContent: {
      text: string,
    };
  }

  Tabs.render({ dataSource: IDataSource, ele: HTMLElement });
```

#### 可配置项

```ts
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
```

| key              | value             | default       | introduce         |
| ---------------- | ----------------- | ------------- | ----------------- |
| ele              | HTMLElement       | document.body | 渲染区间(容器)    |
| dataSource       | IDataSource       | x             | 数据              |
| type             | line(card)        | line          | 页签类型          |
| mouse            | mouseenter(click) | mouseenter    | 切换属性          |
| defaultActiveKey | number            | 1             | 初始化选中面板key |
| tabBarGap        | number            | 5             | tabsBar之间的间隙 |
| tabBarStyle      | ITabBarStyle      | {}            | tabBar样式对象    |
| tabBarLineStyle  | ITabBarLineStyle  | {}            | 线条样式          |
| animated         | boolean           | true          | 是否开启动画      |
| onTabClick       | ()=>void          | Function      | tab被点击的回调   |
| onChange         | (activeKey)=>void | Function      | 切换面板的回调    |

## 九、其它

持续更新中...

**Enjoy!**