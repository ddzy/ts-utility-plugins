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
  setAttr(ele: HTMLElement, options: IStaticPairs): ThisType<IUtilityDOMProps>;
  setCss(ele: HTMLElement, options: IStaticPairs): ThisType<IUtilityDOMProps>;
  getRandom(min: number, max: number): number;
  getRadian(angle: number): number;
  getAttr(ele: HTMLElement, key: string): string | null;
  addClass(el: HTMLElement, className: string): ThisType<IUtilityDOMProps>;
  removeClass(el: HTMLElement, className: string): ThisType<IUtilityDOMProps>;
  throttle(time: number, callback: () => void): void;
};


const utilityDOM: IUtilityDOMProps = {
  getEle(sign: string,) {
    return document.querySelector(sign) || null;
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

  getRandom(min, max) {
    return (Math.random() * (max - min) + min);
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

  throttle(time, callback) {
    // const currentClickTime: number = new Date().getTime();

    //   if (
    //     currentClickTime - this.lastClickTime >= time
    //   ) {
    //     callback();

    //     this.lastClickTime = currentClickTime;
    //   }

    let last = 0;

    return function (...args: any[]) {
      var curr = +new Date()
      if (curr - last > time){
        callback.apply<ThisType<any>, any[], any>(globalThis, args);
        last = curr;
      }
    }
  }
};


export default utilityDOM;