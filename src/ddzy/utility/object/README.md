# ddzy/utility/object

## 说明

汇集有关`对象`的工具方法.

## 目录

| Name          | Description                                                                                                                                  | Source                           | Docs                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| isPlainObject | 判断是否普通的`键值对`对象                                                                                                                   | [源码](./isPlainObject/index.ts) | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-object/isplainobject) |
| get           | 根据`object`对象的`path`路径获取值                                                                                                           | [源码](./get/index.ts)           | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-object/get)           |
| forIn         | 使用 `iteratee` 遍历对象的自身和继承的可枚举属性. `iteratee` 会传入3个参数: (value, key, object). 如果返回 `false`, iteratee 会提前退出遍历. | [源码](./forIn/index.ts)         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-object/forin)         |
| forOwn        | 遍历对象自身的可枚举属性, 不包括继承而来的属性                                                                                               | [源码](./forOwn/index.ts)        | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-object/forown)        |