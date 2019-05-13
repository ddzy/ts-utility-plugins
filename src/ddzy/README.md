# ts-utility-plugins/ddzy

一些有用的插件库集合

## 说明

> 插件库包括 `canvas特效`插件, `业务`插件、`工具组件`等等...

部分插件已投入使用:

- [canvas-colorful-bubble](https://blog.yyge.top/)
- [canvas-jumping-characters](https://blog.yyge.top/)

**TODO**: 后续会考虑放置到`GitHub-pages`展示

## 用法

> **PS**: 重构代码中, 暂未实现对`npm引入`的支持

详细用法, 参考[这里](https://github.com/ddzy/ts-utility-plugins#usage)

## 目录

- [x] Canvas
  - [x] [canvas-stars-line](#canvas-stars-line)
  - [x] [canvas-colorful-bubble](#canvas-colorful-bubble)
  - [x] [canvas-jumping-characters](#canvas-jumping-characters)
- [x] Business
  - [x] [business-carousel](#business-carousel)
  - [x] [business-tab](#business-tab)
  - [x] [business-draggable](#business-draggable)
- [x] Utility
  - [ ] [utility-dom](#utility)
  - [ ] [utility-number](#utility)
  - [ ] [utility-others](#utility)
  - [ ] [utility-function](#utility)

## canvas-stars-line

> 非常nice的`星空连线`特效插件

### a. 基本用法

```ts
new StarsLine({
  container: '#app',
});
```

### b. 可配置项

```ts
export interface IStaticStarsLineBallRadiusParams {
  min: number,
  max: number,
};
```

| Key          | Type                             | Require | Description      |
| ------------ | -------------------------------- | ------- | ---------------- |
| container    | string                           | true    | 挂载的canvas节点 |
| cvsWidth     | number                           | false   | 画布宽           |
| cvsHeight    | number                           | false   | 画布高           |
| cvsBgColor   | string                           | false   | 画布背景颜色     |
| ballNum      | number                           | false   | 星空点数量       |
| ballRadius   | IStaticStarsLineBallRadiusParams | false   | 星的半径         |
| allowMouse   | boolean                          | false   | 是否允许鼠标交互 |
| lineColor    | string                           | false   | 连线颜色         |
| lineWidth    | number                           | false   | 连线宽度         |
| ballSpeed    | number                           | false   | 星空点移动速度   |
| ballColor    | string                           | false   | 星空点颜色       |
| isResize     | boolean                          | false   | 是否跟随窗口大小 |
| safeDistance | number                           | false   | 连线安全距离     |

### c. 注意事项

鼠标交互(`allowMouse`)暂未实现.

## canvas-colorful-bubble

> 构建的canvas气泡插件, 可用作个人博客背景(本人已用上👌, [点这里](https://blog.yyge.top/)查看).

### a. 基本用法

```ts
new ColorfulBubble({
  container:
});
```

### b. 可配置项

```ts
interface IStaticColorfulBubbleScaleRangeParams {
  min: number,
  max: number,
};
```

| Key               | Type                                  | Require | Description      |
| ----------------- | ------------------------------------- | ------- | ---------------- |
| container         | string                                | false   | 挂载的canvas节点 |
| cvsWidth          | number                                | false   | 画布的初始宽     |
| cvsHeight         | number                                | false   | 画布的初始高     |
| cvsBgColor        | string                                | false   | 画布背景色       |
| bubbleNum         | number                                | false   | 生成的气泡数量   |
| bubbleScaleRange  | IStaticColorfulBubbleScaleRangeParams | false   | 气泡半径大小     |
| bubbleExpandRange | number                                | false   | 气泡最大伸缩距离 |
| bubbleOpacity     | number                                | false   | 气泡初始透明度   |
| bubbleSpeed       | number                                | false   | 气泡运动步长     |
| bubbleColorArr    | string[]                              | false   | 气泡颜色         |
| allowMouse        | boolean                               | false   | 是否允许鼠标交互 |

### c. 注意事项

> **Q**: 关于`container`配置项?

***A***: 默认为可选, 但是不填的话会抛出`自定义的异常`, 所以最好还是提供一个挂载节点👌.

> **Q**: 是否会添加`opacity`变化功能?

***A***: 有时间再搞.

## canvas-jumping-characters

> 点击产生文字,并逐渐消失, 可用作个人博客背景.

### a. 基本用法

```ts
new JumpingCharacters({
  container: '#app',
});
```

### b. 可配置项

| Key            | Type     | Require | Description                  |
| -------------- | -------- | ------- | ---------------------------- |
| container      | string   | true    | 挂载的canvas节点             |
| cvsWidth       | number   | false   | 画布的初始宽                 |
| cvsHeight      | number   | false   | 画布的初始高                 |
| cvsBgColor     | string   | false   | 画布背景色                   |
| text           | string[] | false   | 产生的文字                   |
| textColor      | string[] | false   | 文字颜色                     |
| textSize       | number   | false   | 文字大小                     |
| safeDistance   | number   | false   | 安全距离(文字移动多远后消失) |
| initialOpacity | number   | false   | 初始透明度                   |
| speed          | number   | false   | 移动速率                     |

### c. 注意事项

待补充...

## business-carousel

> 封装的```轮播```插件, 用法及其简单, 页面只需```一个div```元素, 不用撰写烦人的DOM, 插件会自动生成DOMTree

### a. 基本用法

```ts
new Carousel({});
```

### b. 可配置项

```ts
interface IDataSource {
  text: string,
  img: {
    url: string,
    target: string,
  },
}
```

| Key          | Type          | Require | Description          |
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

### c. 注意事项

> 目前只支持 Fade & Scroll 两种状态轮播图, **默认使用`scroll`**

```ts
new Carousel({
  effect: 'scroll' | 'fade',
});
```

## business-tab

> tabs标签页插件, 只需传入 渲染的数据 和 渲染区间就可

### a. 基本用法

> **PS**: 默认会挂载于`body`上, 采用默认数据.

```ts
new Tab({});
```

### b. 可用接口

> **PS**: 如下列出了一系列配置项接口.

```ts
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
export interface ITabDataSource {
  tabPaneTitle: {
    icon?: string,
    text?: string,
  },
  tabPaneContent: {
    text?: string,
  },
};
export interface ITabBarStyle {
  'background-color'?: string;
  color?: string;
  'font-size'?: number;
  'font-family'?: string;
  backgroundColorActive?: string;
  colorActive?: string;
}
export interface ITabBarLineStyle {
  'background-color'?: string;
  height?: number;
}
export type ITabTypeEffect = 'line' | 'card';
export type ITabMouseEffect = 'mouseenter' | 'click';
```

### c. 可配置项

> **PS**: 下述表格中为所有的可配置项

| Key              | Value             | Require | Description       |
| ---------------- | ----------------- | ------- | ----------------- |
| container        | HTMLElement       | false   | 挂载容器          |
| dataSource       | IDataSource       | false   | 源数据            |
| type             | line(card)        | false   | 页签类型          |
| mouse            | mouseenter(click) | false   | 切换属性          |
| defaultActiveKey | number            | false   | 初始化选中面板key |
| tabBarGap        | number            | false   | tabsBar之间的间隙 |
| tabBarStyle      | ITabBarStyle      | false   | tabBar样式对象    |
| tabBarLineStyle  | ITabBarLineStyle  | false   | 线条样式          |
| animated         | boolean           | false   | 是否开启动画      |
| onTabClick       | ()=>void          | false   | tab被点击的回调   |
| onChange         | (activeKey)=>void | false   | 切换面板的回调    |

## business-draggable

### a. 前置说明

该组件模块只暴露出了`Draggable`对象, 并挂载了多个不同类型拖拽组件:

- SortDraggable
- 待补充...

### b. 基本用法

```ts
new Draggable.SortDraggable({
  container: '#app',
});
```

### c. 可用接口

```ts
export interface IStaticDataSourceParams {
  titleText?: string;
  contentText?: string;
};
```

### d. 可配置项

| Key                   | Value                                              | Require | Description                  |
| --------------------- | -------------------------------------------------- | ------- | ---------------------------- |
| container             | HTMLElement                                        | true    | 挂载容器                     |
| dataSource            | IStaticDataSourceParams                            | false   | 源数据                       |
| animate               | boolean                                            | false   | 是否开启过渡效果             |
| dragWrapperStyle      | Partial<CSSStyleDeclaration>                       | false   | 拖拽外部容器的样式           |
| dragOriginStyle       | Partial<CSSStyleDeclaration>                       | false   | 拖拽对象的初始样式           |
| dragOriginActiveStyle | Partial<CSSStyleDeclaration>                       | false   | 拖拽该对象时的样式           |
| dragTargetActiveStyle | Partial<CSSStyleDeclaration>                       | false   | 拖拽时目标对象的样式         |
| onDragStartHook       | (origin: HTMLElement) => void                      | false   | 开始拖拽时的钩子             |
| onDragEnterHook       | (origin: HTMLElement, target: HTMLElement) => void | false   | 拖拽进入目标时的钩子         |
| onDragLeaveHook       | (origin: HTMLElement, target: HTMLElement) => void | false   | 拖拽离开目标时的钩子         |
| onDragOverHook        | (origin: HTMLElement, target: HTMLElement) => void | false   | 在目标对象上持续拖拽时的钩子 |
| onDropHook            | (origin: HTMLElement) => void                      | false   | 放置拖拽对象时的钩子         |

### e. 问题记录

> **Q**: 关于draggable的事件触发时机?

***A***: source(`ondragstart`、`ondrag`、`ondragend`), target(`ondragenter`、`ondragover`、`ondragleave`、`ondrop`)

> **Q**: `ondrop`事件无法触发?

***A***: `ondragover`必须进行`e.preventDefault()`

> **Q**: 父元素设置`draggable`, 子元素会触发drag事件

***A***: 给所有子元素添加`pointer-events: none`.

## utility

一系列工具函数, [项目目录](https://github.com/ddzy/ts-utility-plugins/tree/master/src/ddzy/utility).

避免篇幅过长, 已迁移至[此处](./utility/README.md)展示.

## 其它

持续更新中...

**Enjoy!**