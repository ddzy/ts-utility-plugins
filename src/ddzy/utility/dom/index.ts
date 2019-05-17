import utilityOthers from '../others/index';

export interface IStaticPairs {
  [key: string]: any;
};
export interface IUtilityDOMProps {
  getEle(sign: string): HTMLElement | null;
  getAllEle(sign: string): ArrayLike<HTMLElement> | null;
  setAttr(ele: HTMLElement, options: IStaticPairs): OmitThisParameter<IUtilityDOMProps>;
  setCss(ele: HTMLElement, options: IStaticPairs): OmitThisParameter<IUtilityDOMProps>;
  getAttr(ele: HTMLElement, key: string): string | null;
  addClass(el: HTMLElement, className: string): OmitThisParameter<IUtilityDOMProps>;
  removeClass(el: HTMLElement, className: string): OmitThisParameter<IUtilityDOMProps>;

  throttle(time: number, callback: (...args: any[]) => void): void;

  isDOM(node: any): boolean;

  traversalDOMWithBFS(container: HTMLElement, callback: (node: HTMLElement) => void): void;
  traversalDOMWithDFS(container: HTMLElement, callback: (node: HTMLElement) => void): void;
  traversalDOMWithNodeIterator(container: HTMLElement, callback: (node: HTMLElement) => void): void;
  traversalDOMWithTreeWalker(container: HTMLElement, callback: (node: HTMLElement) => void): void;

  convertPairToCSSText(pair: Partial<CSSStyleDeclaration>): string;

  _querySelector(selector: string): Element | null;
};


const utilityDOM: IUtilityDOMProps = {
  /**
   * 获取指定单个DOM元素
   * @param sign 任意选择器
   */
  getEle(sign) {
    return document.querySelector(sign);
  },

  /**
   * 获取指定的所有DOM元素
   * @param sign 任意选择器
   */
  getAllEle(sign) {
    return document.querySelectorAll(sign);
  },

  /**
   * 设置单个DOM属性
   * @param ele 目标DOM
   * @param options 属性键值对
   */
  setAttr(ele, options) {
    for (const key in options) {
      ele.setAttribute(key, options[key]);
    }

    return this;
  },

  /**
   * 设置单个DOM样式
   * @param ele 目标DOM
   * @param options 样式键值对
   */
  setCss(ele, options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = options[key];
        ele.style.cssText += `${key}: ${element};`;
      }
    }

    return this;
  },

  /**
   * 获取DOM的特定属性值
   * @param ele 目标DOM
   * @param key 属性名
   */
  getAttr(ele, key) {
    return ele.getAttribute(key);
  },

  /**
   * 指定DOM添加单个类名
   * @param el 目标DOM
   * @param className 类名
   */
  addClass(el, className) {
    el && el.classList.add(className);

    return this;
  },

  /**
   * 移出指定DOM元素的单个类名
   * @param el 目标DOM
   * @param className 类名
   */
  removeClass(el, className) {
    el && el.classList.remove(className);

    return this;
  },

  /**
   * 节流函数
   * @param timestamp 时间戳
   * @param callback 执行回调
   */
  throttle(timestamp, callback) {
    let lastClickTime = Date.now();

    return (...args: any[]) => {
      const currentClickTime = Date.now();

      if (currentClickTime - lastClickTime > timestamp){
        callback.apply<ThisType<any>, any[], any>(globalThis, args);
        lastClickTime = currentClickTime;
      }
    }
  },


  /**
   * 检查是否DOM元素
   * @param node 指定目标
   */
  isDOM(node) {
    return node
      && typeof node === 'object'
      && node.nodeType === 1;
  },

  /**
   * BFS遍历指定DOM节点
   * @param container 遍历的DOM容器
   * @param callback 回调
   */
  traversalDOMWithBFS(container, callback) {
    if (!this.isDOM(container)) {
      throw new TypeError('Require a DOM element');
    }

    const queue: Element[] = [container];

    while (queue.length) {
      const node = (queue.shift() as HTMLElement);
      callback && callback(node);

      const children = node.children as ArrayLike<Element>;
      queue.push(...(Array.from(children)));
    }
  },

  /**
   * DFS遍历指定DOM节点
   * @param container 遍历的DOM容器
   * @param callback 回调
   */
  traversalDOMWithDFS(container, callback) {
    if (!this.isDOM(container)) {
      throw new TypeError('Require a DOM element');
    }

    callback && callback(container);

    _aidedTraversal(container.children);

    function _aidedTraversal(children: HTMLCollection) {
      if (children.length === 0) {
        return;
      }

      for (let i = 0, every; every = children[i++];) {
        callback && callback(every as HTMLElement);
        _aidedTraversal(every.children);
      }
    }
  },

  /**
   * NodeIterator遍历指定DOM节点
   * @param container 遍历的DOM容器
   * @param callback 执行回调
   */
  traversalDOMWithNodeIterator(container, callback) {
    if (!this.isDOM(container)) {
      throw new TypeError('Require a DOM element');
    }

    const nodeIterator: NodeIterator = document.createNodeIterator(
      container,
      NodeFilter.SHOW_ELEMENT,
    );
    let currentNode: Node | null = null;

    while ((currentNode = nodeIterator.nextNode())) {
      callback && callback(currentNode as HTMLElement);
    }
  },

  /**
   * TreeWalker遍历指定DOM节点
   * @param container 遍历的DOM容器
   * @param callback 执行回调
   */
  traversalDOMWithTreeWalker(container, callback) {
    if (!this.isDOM(container)) {
      throw new TypeError('Require a DOM element');
    }

    const treeWalker: TreeWalker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ELEMENT,
    );
    let currentNode: Node | null = null;

    while (( currentNode = treeWalker.nextNode() )) {
      callback && callback(( currentNode as HTMLElement ));
    }
  },

  /**
   * 样式组转化为内联样式(style.cssText)
   * @param pair CSS样式键值对
   */
  convertPairToCSSText(pair) {
    let text = '';

    for (const key in pair) {
      const value = Reflect.get(pair, key);
      text += `${utilityOthers.convertHumpToHyphen(key)}: ${value}; `;
    }

    return text;
  },

  /**
   * 简单的模拟querySelector
   * @param selector 选择器
   */
  _querySelector(selector) {
    const plainMatcher: RegExp = /^(?:#([a-zA-Z]+))|(?:\.(\w+))|([a-z]+)$/;
    const matched = selector.match(plainMatcher);

    // ? 处理三种基本类型
    if ( matched ) {
      if ( matched[1] ) {
        return document.getElementById(matched[1]);
      } else if ( matched[2] ) {
        return document.getElementsByClassName(matched[2])[0];
      } else {
        return document.getElementsByTagName(matched[3])[0];
      }
    }

    return null;
  }
};


export default utilityDOM;