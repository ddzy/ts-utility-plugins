"use strict";
/**
 * create_time: 18-9-30
 * author: yyg
 */
;
var Utils;
(function (Utils) {
    /**
     * 获取元素
     * @param id 元素id
     */
    function getEle(id) {
        return document.getElementById(id) || null;
    }
    Utils.getEle = getEle;
    /**
     * 获取窗口宽高
     */
    function getWinRange() {
        return {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        };
    }
    Utils.getWinRange = getWinRange;
    /**
     * 设置元素属性
     * @param ele 元素
     * @param options 属性配置
     */
    function setAttr(ele, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                ele.setAttribute(key, options.key);
            }
        }
        return ele;
    }
    Utils.setAttr = setAttr;
    // /**
    //  * 设置元素样式
    //  * @param el 元素
    //  * @param options 属性配置
    //  */
    // export function setCss(
    //   ele: HTMLElement,
    //   options: any,
    // ): HTMLElement {
    //   for(const item in options) {
    //     if(options.hasOwnProperty(item)) {
    //     }
    //   }
    //   return ele;
    // }
})(Utils || (Utils = {}));
;
var Line = /** @class */ (function () {
    function Line(options) {
        if (options === void 0) { options = {}; }
        // public static createNew(): HTMLCanvasElement {
        //   const oCanvas = document.createElement('canvas');
        //   const { winWidth, winHeight } = Utils.getWinRange();
        //   document.body.appendChild(oCanvas);
        //   Utils.setAttr(oCanvas, {
        //     width: winWidth,
        //     height: winHeight,
        //   });
        // }
        this.el = null;
        this.pen = null;
        this._init(options);
    }
    /**
     * 初始化星空线
     * @param options 配置项
     */
    Line.prototype._init = function (options) {
        this.el = options.el || Line.createNew();
    };
    return Line;
}());
;
