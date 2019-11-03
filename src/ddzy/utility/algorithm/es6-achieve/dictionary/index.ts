export interface IDictionaryProps {

};

/**
 * 字典
 * @description 模拟 ES2015 的 Map 数据结构
 */
export class Dictionary {
  /**
   * 生成字符串的哈希值
   * @param text 字符串
   */
  public static generateStringHashCode(
    text: string,
  ) {
    let hashCode = 0;

    for (let i = 0; i < text.length; i++) {
      hashCode += text[i].charCodeAt(0);
    }

    return hashCode % 37;
  }

  constructor() {

  }

  // 哈希表
  private hashMap: {
    [key: number]: any,
  } = {};
  // 哈希键表
  private hashTable: any[] = [];
  // 对象池, 方便比对同地址的对象或者字符串, 来计算 total
  private objectPool: any[] = [];

  // 键值对个数
  private total: number = 0;


  /**
   * 生成普通对象的唯一标识字符串
   * @param obj 普通对象
   * @param objPool 对象池
   */
  private _computeObjectUniqueKey(
    obj: Object,
    objPool: any[],
  ) {
    // 查找对象池位置
    let objPosition = objPool.indexOf(obj);

    if (objPosition === -1) {
      objPool.push(obj);
      objPosition = objPool.length - 1;
    }

    // 生成唯一字符串
    const uniqueKey = JSON.stringify(obj) + objPosition;

    return uniqueKey;
  }

  /**
   * 生成函数的唯一标识字符串
   * @param fn 函数
   * @param objPool 对象池
   */
  private _computeFunctionUniqueKey(
    fn: Function,
    objPool: any[],
  ) {
    // 查找对象池位置
    let objPosition = objPool.indexOf(fn);

    if (objPosition === -1) {
      objPool.push(fn);
      objPosition = objPool.length - 1;
    }

    const uniqueKey = `ts_utility_plugins_${fn.name}_${objPosition}`;

    return uniqueKey
  }

  /**
   * 生成字符串的唯一标识
   * @param text 字符串
   * @param objPool 对象池
   */
  private _computeStringUniqueKey(
    text: string,
    objPool: any[],
  ) {
    // 查找对象池位置
    let objPosition = objPool.indexOf(text);

    if (objPosition === -1) {
      objPool.push(text);
      objPosition = objPool.length - 1;
    }

    const uniqueKey = text;

    return uniqueKey;
  }

  /**
   * 重新计算字典表的长度
   */
  private _computetotal() {
    this.total = Object.keys(this.hashMap).length;
  }


  /**
   * 将普通对象加入字典
   * @param key 关键字
   * @param value 记录值
   */
  private _putObjectIntoDictionary(
    key: Object,
    value: any,
  ) {
    // 生成唯一字符串
    const uniqueID = this._computeObjectUniqueKey(key, this.objectPool);
    // 生成哈希值
    const hashCode = Dictionary.generateStringHashCode(uniqueID);

    this.hashTable[hashCode] = key;
    this.hashMap[hashCode] = value;
  }

  /**
   * 将函数加入字典
   * @param key 关键字
   * @param value 记录值
   */
  private _putFunctionIntoDictionary(
    key: Function,
    value: any,
  ) {
    // 生成函数的标识字符串
    const uniqueID = this._computeFunctionUniqueKey(key, this.objectPool);
    // 生成哈希值
    const hashCode = Dictionary.generateStringHashCode(uniqueID);

    this.hashTable[hashCode] = key;
    this.hashMap[hashCode] = value;
  }

  /**
   * 将普通字符串加入字典
   * @param key 关键字
   * @param value 记录值
   */
  private _putStringIntoDictionary(
    key: string,
    value: any,
  ) {
    // 生成字符串的标识
    const uniqueID = this._computeStringUniqueKey(key, this.objectPool);
    // 生成哈希值
    const hashCode = Dictionary.generateStringHashCode(uniqueID);

    this.hashTable[hashCode] = key;
    this.hashMap[hashCode] = value;
  }


  /**
   * 向字典中追加值
   * @param key 记录的关键字
   * @param value 记录的值
   */
  public set<M, N>(
    key: M,
    value: N,
  ) {
    // 字符串 => 直接生成 hashCode
    // 对象 => 加入对象池 => object + index
    switch (typeof key) {
      case 'object': {
        this._putObjectIntoDictionary(key, value);
        this._computetotal();

        return this;
      };
      case 'function': {
        const funcKey = key as unknown as Function;

        this._putFunctionIntoDictionary(funcKey, value);
        this._computetotal();

        return this;
      };
      default: {
        const strKey = String(key);

        this._putStringIntoDictionary(strKey, value);
        this._computetotal();

        return this;
      };
    }
  }

  /**
   * 获取字典对应的记录
   * @param key 记录的键
   */
  public get<M>(
    key: M,
  ) {
    switch (typeof key) {
      case 'object': {
        // 生成字符串的标识
        const uniqueID = this._computeObjectUniqueKey(key, this.objectPool);
        // 生成哈希值
        const hashCode = Dictionary.generateStringHashCode(uniqueID);

        return this.hashMap[hashCode] ? this.hashMap[hashCode] : undefined;
      };
      case 'function': {
        const funcKey = key as unknown as Function;
        // 生成函数的标识字符串
        const uniqueID = this._computeFunctionUniqueKey(funcKey, this.objectPool);
        // 生成哈希值
        const hashCode = Dictionary.generateStringHashCode(uniqueID);

        return this.hashMap[hashCode] ? this.hashMap[hashCode] : undefined;
      };
      default: {
        const strKey = String(key);
        // 生成字符串的标识
        const uniqueID = this._computeStringUniqueKey(strKey, this.objectPool);
        // 生成哈希值
        const hashCode = Dictionary.generateStringHashCode(uniqueID);

        return this.hashMap[hashCode] ? this.hashMap[hashCode] : undefined;
      };
    }
  }

  /**
   * 从字典中移除指定项
   * @param key 需要移除的键
   */
  public delete<M>(
    key: M,
  ) {
    switch (typeof key) {
      case 'object': {
        // 查找键在对象池中的位置, 便于重置
        const keyPosition = this.objectPool.indexOf(key);
        // 生成字符串的标识
        const uniqueID = this._computeObjectUniqueKey(key, this.objectPool);
        // 生成哈希值
        const hashCode = Dictionary.generateStringHashCode(uniqueID);

        // 移除哈希表上的对应键
        const isDeleteHashMapKey = delete this.hashMap[hashCode];
        // 重置哈希键表上的对应键
        this.hashTable[hashCode] = undefined;
        // 重置对象池的对应项
        this.objectPool[keyPosition] = undefined;
        // 重置哈希表长度
        this._computetotal();

        return isDeleteHashMapKey;
      };
      case 'function': {
        const funcKey = key as unknown as Function;
        // 查找键在对象池中的位置
        const keyPosition = this.objectPool.indexOf(funcKey);
        // 生成函数的标识字符串
        const uniqueID = this._computeFunctionUniqueKey(funcKey, this.objectPool);
        // 生成哈希值
        const hashCode = Dictionary.generateStringHashCode(uniqueID);

        // 移除哈希表上的对应键
        const isDeleteHashMapKey = delete this.hashMap[hashCode];
        // 重置哈希键表上的对应键
        this.hashTable[hashCode] = undefined;
        // 重置对象池的对应项
        this.objectPool[keyPosition] = undefined;
        // 重置哈希表长度
        this._computetotal();

        return isDeleteHashMapKey;
      };
      default: {
        const strKey = String(key);

        // 查找键在对象池中的位置, 便于重置
        const keyPosition = this.objectPool.indexOf(key);
        // 生成字符串的标识
        const uniqueID = this._computeStringUniqueKey(strKey, this.objectPool);
        // 生成哈希值
        const hashCode = Dictionary.generateStringHashCode(uniqueID);

        // 移除哈希表上的对应键
        const isDeleteHashMapKey = delete this.hashMap[hashCode];
        // 重置哈希键表上的对应键
        this.hashTable[hashCode] = undefined;
        // 重置对象池的对应项
        this.objectPool[keyPosition] = undefined;
        // 重置哈希表长度
        this._computetotal();

        return isDeleteHashMapKey;
      };
    }
  }

  /**
   * 获取字典的元素数量
   */
  public size() {
    return this.total;
  }

  /**
   * 遍历字典, 返回 false 则终止遍历
   * @param callback 回调处理器
   */
  public traversal(
    callback: (
      value: any,
      key: any,
      self: { [key: number]: any }
    ) => boolean | void,
  ) {
    const hashMap = this.hashMap;
    const hashTable = this.hashTable;

    for (const key in hashMap) {
      if (hashMap.hasOwnProperty(key)) {
        const value = hashMap[key];
        const realKey = hashTable[key];

        const isExit = callback.call(this, value, realKey, hashMap);

        if (isExit === false) {
          break;
        }
      }
    }
  }
}