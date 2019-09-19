# ddzy/utility/array

## 说明

汇集有关`数组`的工具方法.

## 目录

| Name                | Description                                                          | Source                                                                             | Docs                                                                                              |
| ------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| isStrictArray       | 判断是否严格的数组                                                   | [源码](./isStrictArray/index.ts)                                                   | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/isstrictarray)       |
| toFlatArrayOutPlace | 数组扁平化(`非原地算法`)                                             | [源码](./toFlatArrayOutPlace/index.ts)                                             | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/toflatarrayoutplace) |
| toStrictArray       | 将给定的类数组转化为严格的数组(`非原地`)                             | [源码](./toStrictArray/index.ts)                                                   | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/tostrictarray)       |
| trunk               | 将源数组根据指定大小`分片`                                           | [源码](./trunk/index.ts)                                                           | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/trunk)               |
| compact             | 过滤指定数组中的假值(`0`、`''`、`false`、`null`、`undefined`、`NaN`) | [源码](./compact/index.ts)                                                         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/compact)             |
| castArray           | 将给定的值强制转成数组                                               | [源码](./castArray/index.ts)                                                       | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/castarray)           |
| _concat             | 将给定的任意数量的值追加至源数组                                     | [源码](./_concat/index.ts)                                                         | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/_concat)             |
| difference          | 创建一个具有唯一`array`值的数组，每个值不包含在其他给定的数组中      | [源码](./difference/index.ts)                                                      | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/difference)          |
| drop                | 创建一个切片数组, 去除`array`前面的`n`个元素                         | [源码](./drop/index.ts)                                                            | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/drop)                |
| head                | 获取指定数组的第`一`个元素                                           | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/head) | [源码](./head/index.ts)                                                                           |
| dropRight           | 从源数组的右侧开始, 舍弃指定个数的值                                 | [源码](./dropRight/index.ts)                                                       | [文档](https://ddzy.gitbook.io/ts-utility-plugins-docs/utility/utility-array/dropRight)           |