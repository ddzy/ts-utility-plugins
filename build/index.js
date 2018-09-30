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
    /**
     * 取随机值
     * @param min 最小值
     * @param max 最大值
     */
    function getRandom(min, max) {
        return ~~(Math.random() * (max - min) + min);
    }
    Utils.getRandom = getRandom;
})(Utils || (Utils = {}));
;
var Line = /** @class */ (function () {
    function Line(options) {
        this.el = Utils.getEle(options.el || '') || Line._createNew();
        this.pen = this.el.getContext('2d');
        this.width = options.width || Utils.getWinRange().winWidth;
        this.height = options.height || Utils.getWinRange().winHeight;
        this.bgColor = options.bgColor || '#000';
        this.lineColor = options.lineColor || '#fff';
        this.initCanvas();
        this.draw();
    }
    /**
     * 创建canvas
     */
    Line._createNew = function () {
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
            display: 'block',
        });
        return Utils.getEle('yyg-stars-line');
    };
    Line.prototype.initCanvas = function () {
        Utils.setAttr(this.el, {
            width: this.width,
            height: this.height,
        });
        Utils.setCss(this.el, {
            'background-color': this.bgColor,
            display: 'block',
        });
    };
    Line.prototype.draw = function () {
        var pen = this.pen;
        // 随机线起点
        var startPoint = {
            x: Utils.getRandom(0, this.width),
            y: Utils.getRandom(0, this.height),
        };
        pen.save();
        pen.beginPath();
        pen.moveTo(startPoint.x, startPoint.y);
        pen.lineTo(startPoint.x + Utils.getRandom(5, 10), startPoint.y + Utils.getRandom(5, 10));
        pen.closePath();
        pen.strokeStyle = this.lineColor;
        pen.lineWidth = 2;
        pen.stroke();
        pen.restore();
    };
    return Line;
}());
;
var line = new Line({
    el: 'stars-line',
    bgColor: '#000',
});
