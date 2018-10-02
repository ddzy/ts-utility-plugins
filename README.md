# my-utility-plugins
自己封装的插件库

## 说明
插件库包括 ```canvas特效```插件, ```业务```插件

## 导航
1. Canvas 
  + [canvas-stars-line](#canvas-stars-line)
2. Business

### canvas-stars-line
> 非常nice的星空连线插件, 自定义大多数配置
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
  isResize?: boolean(d: false)    // 是否跟随窗口大小
});

StarsLine.render(el: string): void;     // el canvas元素
```
3. 支持链式调用
```
StarsLine
  .config({...})
  .render(el: string)
```