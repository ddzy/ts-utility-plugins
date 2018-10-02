# canvas-stars-line
非常漂浪的canvas星空连线, 哇哇哇

## 说明
ts构建的星空连线特效插件, 可自定义大多数配置

## 安装
1. 开启ts监听
   ```
   tsc -w
   ```
2. vscode启动liveServer or 右键index.html直接运行


## 用法
> 全局暴露 ```YYG``` 构造器, ```console```其可查看实例方法
1. 默认渲染
```
YYG.render(el: string): void;    // el canvas元素
```
2. 自定义配置项
```
YYG.config({
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

YYG.render(el: string): void;     // el canvas元素

可链式调用
YYG.config({...}).render(el: string)
```
3. 后续会抽离js, 并且发布npm包
