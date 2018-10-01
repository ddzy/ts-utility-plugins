# canvas-stars-line
非常火的canvas星空连线, 哇哇哇

## 说明
ts构建的星空连线特效插件, 已完成鼠标交互&&自动连线功能

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
  cvsWidth?: 画布宽
  cvsHeight?: 画布高
  cvsBgColor?: 画布背景颜色
  ballNum?: 星空点数量
  allowMouse?: 是否允许鼠标交互
  lineColor?: 连线颜色
  lineWidth?: 连线宽度
  ballSpeed?: 星空点移动速度 default: 1
  ballColor?: 星空点颜色
});

YYG.render(el: string): void;     // el canvas元素
```
