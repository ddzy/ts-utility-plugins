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
            ele.setAttribute(key, options[key]);
        }
        return ele;
    }
    Utils.setAttr = setAttr;
    /**
     * 设置元素样式
     * @param el 元素
     * @param options 属性配置
     */
    function setCss(ele, options) {
        for (var item in options) {
            if (options.hasOwnProperty(item)) {
                ele.style.cssText += item + ": " + options[item] + ";";
            }
        }
        return ele;
    }
    Utils.setCss = setCss;
})(Utils || (Utils = {}));
;
var Line = /** @class */ (function () {
    function Line(options) {
        if (options === void 0) { options = {}; }
        this.el = null;
        this.pen = null;
        this._init(options);
    }
    /**
     * 创建canvas
     */
    Line.createNew = function () {
        var oCanvas = document.createElement('canvas');
        var oBody = document.body;
        var _a = Utils.getWinRange(), winWidth = _a.winWidth, winHeight = _a.winHeight;
        oBody.appendChild(oCanvas);
        Utils.setAttr(oCanvas, {
            id: 'yyg-stars-line',
            width: winWidth,
            height: winHeight,
        });
        Utils.setCss(oCanvas, {
            'background-color': '#000',
        });
        return Utils.getEle('yyg-stars-line');
    };
    /**
     * 初始化星空线
     * @param options 配置项
     */
    Line.prototype._init = function (options) {
        console.log(Line.createNew());
    };
    return Line;
}());
;
var line = new Line();
