/**
 * @author: ddzy
 * @description: DOM相关工具方法
 * @since: 2019/4/28
 */


export interface IStaticPairs {
  [key: string]: any;
};
export interface IUtilityDOMProps {
  getEle(sign: string): HTMLElement | null;
  getAllEle(sign: string): ArrayLike<HTMLElement> | null;
  setAttr(ele: HTMLElement, options: IStaticPairs): OmitThisParameter<IUtilityDOMProps>;
  setCss(ele: HTMLElement, options: IStaticPairs): OmitThisParameter<IUtilityDOMProps>;
  getRadian(angle: number): number;
  getAttr(ele: HTMLElement, key: string): string | null;
  addClass(el: HTMLElement, className: string): OmitThisParameter<IUtilityDOMProps>;
  removeClass(el: HTMLElement, className: string): OmitThisParameter<IUtilityDOMProps>;
  throttle(time: number, callback: (...args: any[]) => void): void;
  getFullRandom(min: number, max: number): number,
  getAnyRandom(min: number, max: number): number;

  isDOM(node: any): boolean;

  traversalDOMWithBFS(container: HTMLElement, callback: (node: HTMLElement) => void): void;
};


const utilityDOM: IUtilityDOMProps = {
  getEle(sign: string,) {
    return document.querySelector(sign);
  },

  getAllEle(sign) {
    return document.querySelectorAll(sign);
  },

  setAttr(ele, options) {
    for (const key in options) {
      ele.setAttribute(key, options[key]);
    }

    return this;
  },

  setCss(ele, options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = options[key];
        ele.style.cssText += `${key}: ${element};`;
      }
    }

    return this;
  },

  getFullRandom(min, max) {
    return ~~(Math.random() * (max - min) + min);
  },

  getAnyRandom(min, max) {
    return Math.random() * (max - min) + min;
  },

  getRadian(angle) {
    return (Math.PI / 180) * angle;
  },

  getAttr(ele, key) {
    return ele.getAttribute(key);
  },

  addClass(el, className) {
    el && el.classList.add(className);

    return this;
  },

  removeClass(el, className) {
    el && el.classList.remove(className);

    return this;
  },

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
   * @param container 查找的DOM容器
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
  }
};


export default utilityDOM;