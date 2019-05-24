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
  - [debounce](#debounce)
  - [isDOM](#isDOM)
  - [traversalDOMWithBFS](#traversalDOMWithBFS)
  - [traversalDOMWithDFS](#traversalDOMWithDFS)
  - [traversalDOMWithNodeIterator](#traversaldomwithnodeiterator)
  - [traversalDOMWithTreeWalker](#traversaldomwithtreewalker)
  - [convertPairToCSSText](#convertPairToCSSText)
  - [_querySelector](#_querySelector)
- [Array](#Array)
  - [isStrictArray](#isStrictArray)
  - [toFlatArrayOutPlace](#toFlatArrayOutPlace)
- [Object](#Object)
  - [isPlainObject](#isPlainObject)
- [String](#String)
- [Number](#Number)
  - [getRadian](#getRadian)
  - [getFullRandom](#getFullRandom)
  - [getAnyRandom](#getAnyRandom)
- [Function](#Function)
  - [isFunction](#isfunction)
- [Others](#Others)
  - [isBasicValue](#isBasicValue)
  - [invariant](#invariant)
  - [convertHumpToHyphen](#convertHumpToHyphen)
  - [deepClone](#deepClone)

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

### _querySelector

#### a. 说明

简易的`querySelector`, 具体的实现可参考jQuery的`Sizzle`引擎

#### b. 用法

```html
<div id="app">
  <kbd>Ctrl + J</kbd>
</div>
```

```ts
utilityDOM._querySelector('#app');  // <div id="app"></div>
utilityDOM._querySelector('kbd');  // <kbd>Ctrl + J</kbd>

utilityDOM._querySelector('.text')  // null
utilityDOM._querySelector('span')  // null
```

### debounce

#### a. 说明

防抖函数

#### b. 用法

```html
<input id="username" type="text" />
```

```ts
const usernameInput = document.getElementById('username');

function print(e) {
  console.log(e);
}

const debounced = utilityDOM.debounce(print, {
  timestamp: 500,   // Default
});

usernameInput.addEventListener('change', debounced);
```

## Array

### isStrictArray

#### a. 说明

判断是否严格的数组

#### b. 用法

```html
<p></p>
<p></p>
```

```ts
const o1 = document.querySelectorAll('p');
utilityArray.isStrictArray(o1);   // false

const o2 = {
  name: 'ddzy',
  age: 20,
  length: 2,
}
utilityArray.isStrictArray(o2)    // false

const o3 = [];
utilityArray.isStrictArray(o3)    // true
```

### toFlatArrayOutPlace

#### a. 说明

数组扁平化(非原地算法)

#### b. 用法

```ts
const origin = [
  'duan',
  1998,
  [
    'a',
    'b',
    [
      'c',
      'd',
      [
        'e',
        'f',
        123
      ],
    ],
  ],
  {
    name: 'duan',
    age: 20,
  },
];

// ['duan', 1998, 'a', 'b', 'c', 'd', 'e', 'f', 123, { name: 'duan', age: 20 }]
utilityArray.toFlatArrayOutPlace(origin);
```

## Object

### isPlainObject

#### a. 说明

是否普通的**键值对**对象

#### b. 用法

```html
<p></p>
<p></p>
```

```ts
const o1 = document.querySelectorAll('p');
utilityObject.isPlainObject(o1)   // false

const o2 = [];
utilityObject.isPlainObject(o2)   // false

const o3 = {
  name: 'ddzy',
  age: 20,
};
utilityObject.isPlainObject(o3)   // true
```

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

### isBasicValue

#### a. 说明

判断是否**基本类型**的值

#### b. 用法

```ts
const o1 = [
  {},
  [],
  function() {},
];
o1.forEach((v) => utilityOthers.isBasicValue(v));   // false

const o2 = [
  0,
  '',
  false,
  undefined,
  null,
  Symbol,
]
o2.forEach((v) => utilityOthers.isBasicValue(v));    // true
```

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

### deepClone

#### a. 说明

深拷贝

#### b. 用法

```ts
const origin = {
  ...
};

utilityOthers.deepClone(origin);
```