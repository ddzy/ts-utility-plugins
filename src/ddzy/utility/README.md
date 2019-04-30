# utility

详细罗列出所有的工具函数, 主文档参考[这里](../README.md)

## 一、说明

`utility`总共分为`n`多个大区块——`dom`相关、`Array`相关...诸如此类.

## 二、目录

- [DOM](#四DOM)
  - [getEle](#getele)
  - [getAllEle](#getAllEle)
  - [setAttr](#setAttr)
  - [setCss](#setCss)
  - [getAttr](#getAttr)
  - [addClass](#addClass)
  - [removeClass](#removeClass)
  - [throttle](#throttle)
  - [isDOM](#isDOM)
  - [traversalDOMWithBFS](#traversalDOMWithBFS)
  - [traversalDOMWithDFS](#traversalDOMWithDFS)
  - [traversalDOMWithNodeIterator](#traversaldomwithnodeiterator)
  - [traversalDOMWithTreeWalker](#traversaldomwithtreewalker)
- [Array](#五Array)
- [Object](#六Object)
- [String](#七String)
- [Number](#八Number)
  - [getRadian](#getRadian)
  - [getFullRandom](#getFullRandom)
  - [getAnyRandom](#getAnyRandom)
- [Function](#九Function)
  - [isFunction](#isfunction)
- ...

## 三、DOM

### isDOM

#### 说明

检查是否DOM元素

#### 用法

```ts
utilityDOM.isDOM('ddzy') // false
utilityDOM.isDOM(document.createElement('div')) // true
```

### setCss

#### 说明

设置单个DOM样式

#### 用法

```ts
utilityDOM.setCss(document.createElement('div'), {
  width: 20,
  height: 20,
});
```

### setAttr

#### 说明

设置单个DOM属性

#### 用法

```ts
utilityDOM.setAttr(document.createElement('div'), {
  id: 'app',
  class: 'container',
});
```

### getEle

#### 说明

获取指定单个DOM元素

#### 用法

```ts
const node = utilityDOM.getEle('#app');
```

### getAttr

#### 说明

获取DOM的特定属性值

#### 用法

```ts
const value = utilityDOM.getAttr(
  document.getElementById('app'),
  'id'
);
```

### getAllEle

#### 说明

获取指定的所有DOM元素

#### 用法

```ts
const list = utilityDOM.getAllEle('.text');
```

### addClass

#### 说明

指定DOM添加单个类名

#### 用法

```ts
utilityDOM.addClass(document.createElement('div'), 'text');
```

### removeClass

#### 说明

移出指定DOM元素的单个类名

#### 用法

```ts
utilityDOM.removeClass(document.createElement('div'), 'text');
```

### traversalDOMWithBFS

#### 说明

BFS遍历指定DOM节点

#### 用法

```ts
utilityDOM.traversalDOMWithBFS(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### traversalDOMWithDFS

#### 说明

DFS遍历指定DOM节点

#### 用法

```ts
utilityDOM.traversalDOMWithDFS(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### traversalDOMWithNodeIterator

#### 说明

`NodeIterator`遍历指定DOM节点

#### 用法

```ts
utilityDOM.traversalDOMWithNodeIterator(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### traversalDOMWithTreeWalker

#### 说明

`TreeWalker`遍历指定DOM节点

#### 用法

```ts
utilityDOM.traversalDOMWithTreeWalker(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### throttle

#### 说明

节流函数

#### 用法

```ts
function log(e) {
  console.log(e); // MouseEvent
}

const foo = utilityDOM.throttle(500, log);

window.addEventListener('resize', foo);
```

## 四、Array

updating...

## 五、Object

updating...

## 六、String

updating...

## 七、Number

### getRadian

#### 说明

角度值转`弧度`值

#### 用法

```ts
utilityDOM.getRadian(90); //1.57....
```

### getFullRandom

#### 说明

获取指定范围内的随机`整数`

> 注意区分其与[getAnyRandom](#getanyrandom)的异同

#### 用法

```ts
utilityDOM.getFullRandom(1, 10); // 9, 4, 5, ...
```

### getAnyRandom

#### 说明

获取指定范围内的随机`任意数`

> 注意区分其与[getFullRandom](#getfullrandom)的异同

#### 用法

```ts
utilityDOM.getAnyRandom(1, 10); // 3, 4, 5, 2.2, 7.88 ...
```

## 八、Function

### isFunction

#### 说明

检查是否函数

#### 用法

```ts
utilityDOM.isFunction({}); // false
utilityDOM.isFunction(new Function()); // true
```