# utility

详细罗列出所有的工具函数, 主文档参考[这里](../README.md)

## 说明

`utility`总共分为`n`多个大区块——`dom`相关、`Array`相关...诸如此类.

## 目录

- [DOM](#DOM)
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
  - [convertPairToCSSText](#convertPairToCSSText)
- [Array](#Array)
- [Object](#Object)
- [String](#String)
- [Number](#Number)
  - [getRadian](#getRadian)
  - [getFullRandom](#getFullRandom)
  - [getAnyRandom](#getAnyRandom)
- [Function](#Function)
  - [isFunction](#isfunction)
- [Others](#Others)
  - [invariant](#invariant)
  - [convertHumpToHyphen](#convertHumpToHyphen)

## DOM

### isDOM

#### a. 说明

检查是否DOM元素

#### b. 用法

```ts
utilityDOM.isDOM('ddzy') // false
utilityDOM.isDOM(document.createElement('div')) // true
```

### setCss

#### a. 说明

设置单个DOM样式

#### b. 用法

```ts
utilityDOM.setCss(document.createElement('div'), {
  width: 20,
  height: 20,
});
```

### setAttr

#### a. 说明

设置单个DOM属性

#### b. 用法

```ts
utilityDOM.setAttr(document.createElement('div'), {
  id: 'app',
  class: 'container',
});
```

### getEle

#### a. 说明

获取指定单个DOM元素

#### b. 用法

```ts
const node = utilityDOM.getEle('#app');
```

### getAttr

#### a. 说明

获取DOM的特定属性值

#### b. 用法

```ts
const value = utilityDOM.getAttr(
  document.getElementById('app'),
  'id'
);
```

### getAllEle

#### a. 说明

获取指定的所有DOM元素

#### b. 用法

```ts
const list = utilityDOM.getAllEle('.text');
```

### addClass

#### a. 说明

指定DOM添加单个类名

#### b. 用法

```ts
utilityDOM.addClass(document.createElement('div'), 'text');
```

### removeClass

#### a. 说明

移出指定DOM元素的单个类名

#### b. 用法

```ts
utilityDOM.removeClass(document.createElement('div'), 'text');
```

### traversalDOMWithBFS

#### a. 说明

BFS遍历指定DOM节点

#### b. 用法

```ts
utilityDOM.traversalDOMWithBFS(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### traversalDOMWithDFS

#### a. 说明

DFS遍历指定DOM节点

#### b. 用法

```ts
utilityDOM.traversalDOMWithDFS(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### traversalDOMWithNodeIterator

#### a. 说明

`NodeIterator`遍历指定DOM节点

#### b. 用法

```ts
utilityDOM.traversalDOMWithNodeIterator(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### traversalDOMWithTreeWalker

#### a. 说明

`TreeWalker`遍历指定DOM节点

#### b. 用法

```ts
utilityDOM.traversalDOMWithTreeWalker(
  document.getElementById('app'),
  (node) => {
    console.log(node);
  },
);
```

### throttle

#### a. 说明

节流函数

#### b. 用法

```ts
function log(e) {
  console.log(e); // MouseEvent
}

const foo = utilityDOM.throttle(500, log);

window.addEventListener('resize', foo);
```

### convertPairToCSSText

#### a. 说明

将给定的`CSS样式键值对`转化为相应的`cssText`字符串.

#### b. 用法

```ts
const rules = {
  border: '1px dotted red',
  backgroundColor: 'blue',
};

// 'border: 1px dotted red; background-color: blue; '
utilityDOM.convertPairToCSSText(rules);
```

## Array

updating...

## Object

updating...

## String

updating...

## Number

### getRadian

#### a. 说明

角度值转`弧度`值

#### b. 用法

```ts
utilityDOM.getRadian(90); //1.57....
```

### getFullRandom

#### a. 说明

获取指定范围内的随机`整数`

> 注意区分其与[getAnyRandom](#getanyrandom)的异同

#### b. 用法

```ts
utilityDOM.getFullRandom(1, 10); // 9, 4, 5, ...
```

### getAnyRandom

#### a. 说明

获取指定范围内的随机`任意数`

> 注意区分其与[getFullRandom](#getfullrandom)的异同

#### b. 用法

```ts
utilityDOM.getAnyRandom(1, 10); // 3, 4, 5, 2.2, 7.88 ...
```

## Function

### isFunction

#### a. 说明

检查是否函数

#### b. 用法

```ts
utilityDOM.isFunction({}); // false
utilityDOM.isFunction(new Function()); // true
```

## Others

### invariant

#### a. 说明

自定义的处理异常方法

#### b. 用法

```ts
// 'Ddzy's plugins error: i will be throwed.'
utilityOthers.invariant(true, 'i will be throwed');

// undefined
utilityOthers.invariant(false, '...');
```

### convertHumpToHyphen

#### a. 说明

将`驼峰`格式字符串转为`连字符`形式

#### b. 用法

```ts
const hump = 'backgroundColor';

// background-color
const hyphen = utilityOthers.convertHumpToHyphen(hump);
```