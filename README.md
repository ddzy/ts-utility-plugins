# ts-utility-plugins
自己封装的插件库, 采用ts开发

## 说明
> 插件库包括 ```canvas特效```插件, ```业务```插件

## 更新
> 最近更新于 18/10/10

## 导航
1. Canvas 
  + [canvas-stars-line](#canvas-stars-line)
2. Business
  + [business-carousel](#business-carousel)

## canvas-stars-line
> 非常nice的```星空连线```特效插件, 自定义大多数配置
1. 默认渲染
```
StarsLine.render(el: string): void;    // el canvas元素
```
2. 自定义配置项
```
StarsLine.config({
  cvsWidth?: number(d:500)     画布宽
  cvsHeight?: number(d:500)    画布高
  cvsBgColor?: string(d:#000)   画布背景颜色
  ballNum?: number(d:100)      星空点数量
  allowMouse?: boolean(d:false)  是否允许鼠标交互
  lineColor?: string(d:#1890ff)    连线颜色
  lineWidth?: number(d:1)    连线宽度
  ballSpeed?: number(d:1)    星空点移动速度
  ballColor?: string(d:#fff)    星空点颜色
  isResize?: boolean(d: false)    是否跟随窗口大小
});

StarsLine.render(el: string): void;     // el canvas元素
```
3. 支持链式调用
```
StarsLine
  .config({...})
  .render(el: string)
```

## business-carousel
> 封装的```轮播```插件, 用法及其简单, 页面只需```一个div```元素, 不用撰写烦人的DOM, 插件会自动生成DOMTree
> 可自定义常用配置项
1. 基本用法
```
Carousel
  .config({ dataSource: object[] })     轮播数据(必填)
  .render(el: string)     轮播容器      
```
2. 可配置项
```
Carousel
  .config({
    dataSource: {           // 基本数据, 必需 
      text: string,
      img: {
        url: string,
        target: string,
      },
    }[]          
    afterChange?: () => void         // 切换后回调   
    beforeChange?: () => void        // 切换前回调  
    autoPlay?: boolean               // 是否自动切换    d.true
    showDots?:                       // 是否显示导航点  d.true
    showArrows?:                     // 是否显示箭头   d.true
    easing?:                         // 动画效果    d.ease-in-out
    effect?:                         // 切换效果 Fade | Scroll(default)
    vertical?:                       // 垂直显示  d.false    
    delayTime?:                      // 自动滚动延迟时间    d.3000
    duringTime?:                     // 过渡时间      d.1500
    isHoverPause?:                   // 鼠标放置是否停止轮播  d.true
  })
```
3. effet
```
Carousel.config({ effect: 'fade' | 'scroll'  })
目前只支持 Fade & Scroll 两种状态轮播图
```
