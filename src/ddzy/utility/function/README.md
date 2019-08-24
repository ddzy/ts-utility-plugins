# ddzy/utility/function

## 说明

汇集有关`函数`的工具方法.

## 目录

| Name          | Description                                            | Source                           | Docs                                                                                           |
| ------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| isFunction    | 检查是否`函数`                                         | [源码](./isFunction/index.ts)    | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/isfunction)    |
| _call         | 模拟实现`call`方法                                     | [源码](./_call/index.ts)         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/_call)         |
| _bind         | 模拟实现`bind`方法                                     | [源码](./_bind/index.ts)         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/_bind)         |
| _new          | 模拟实现`new`操作符                                    | [源码](./_new/index.ts)          | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/_new)          |
| getParamNames | 获取函数的`形参`名称数组                               | [源码](./getParamNames/index.ts) | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/getparamnames) |
| compose       | 从右往左执行处理器函数                                 | [源码](./compose/index.ts)       | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/compose)       |
| pipe          | 从左往右执行处理器函数, 与`compose`相反                | [源码](./pipe/index.ts)          | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/pipe)          |
| delay         | 延迟`wait`毫秒后执行处理器`callback`                   | [源码](./delay/index.ts)         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/delay)         |
| after         | 创建并返回一个函数, 等待函数运行指定`次数`后执行处理器 | [源码](./after/index.ts)         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-function/after)         |