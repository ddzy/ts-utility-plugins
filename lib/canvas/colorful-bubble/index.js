"use strict";
/**
 * @name canvas-colorful-bubble
 * @description 五彩气泡背景插件
 * @author yyg
 * @version 1.0.2
 */
/**
 * @param cvsWidth number 画布宽
 * @param cvsHeight number 画布高
 * @param cvsBgColor string 画布背景
 * @param bubbleNum number 气泡数量
 * @param bubbleScaleRange object 气泡大小范围
 * @param bubbleExpandRange number 气泡扩大距离
 * @param bubbleOpacity number 气泡透明度
 * @param bubbleSpeed number 气泡移动速度
 * @param allowMouse boolean 是否允许鼠标交互
 * @param bubbleColorArr string[] 气泡颜色数组
 */
var ColorfulBubble;
(function (ColorfulBubble) {
    ColorfulBubble.yyg_settings = {
        cvsWidth: 500,
        cvsHeight: 500,
        cvsBgColor: '#000',
        bubbleNum: 20,
        bubbleScaleRange: {
            min: 3,
            max: 5,
        },
        bubbleExpandRange: 15,
        bubbleOpacity: 1,
        bubbleSpeed: 1,
        bubbleColorArr: [
            '#1890ff', '#f5222d', '#fa8c16', '#faad14',
            '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
            '#2f5418', '#722ed1', '#eb2f96', '#fa541c',
        ],
        allowMouse: true,
    };
    ColorfulBubble.yyg_el = null;
    ColorfulBubble.yyg_pen = null;
    var bubbleArr = [];
    function config(_props) {
        Init.initSettings(_props);
        return ColorfulBubble;
    }
    ColorfulBubble.config = config;
    function render(el) {
        Init.initCvsEl(el);
        Init.initBubble();
        return ColorfulBubble;
    }
    ColorfulBubble.render = render;
    var Init;
    (function (Init) {
        function initSettings(_props) {
            for (var key in _props) {
                if (_props.hasOwnProperty(key)) {
                    var element = _props[key];
                    Reflect.set(ColorfulBubble.yyg_settings, key, element);
                }
            }
        }
        Init.initSettings = initSettings;
        function initCvsEl(el) {
            if (Utils.getEle(el)) {
                var e = Utils.getEle(el);
                if (e.localName === 'canvas') {
                    ColorfulBubble.yyg_el = e;
                    ColorfulBubble.yyg_pen = e.getContext('2d');
                    Utils.setCss(ColorfulBubble.yyg_el, {
                        display: 'block',
                        'background-color': ColorfulBubble.yyg_settings.cvsBgColor,
                    });
                    Utils.setAttr(ColorfulBubble.yyg_el, {
                        width: ColorfulBubble.yyg_settings.cvsWidth,
                        height: ColorfulBubble.yyg_settings.cvsHeight,
                    });
                }
                else {
                    throw new Error('请传入canvas元素!');
                }
            }
            else {
                throw new Error('元素不存在!');
            }
        }
        Init.initCvsEl = initCvsEl;
        function initBubble() {
            var bubbleNum = ColorfulBubble.yyg_settings.bubbleNum;
            for (var i = 0; i < bubbleNum; i++) {
                _createBubbleFactory();
            }
            _moveBubble();
        }
        Init.initBubble = initBubble;
        /**
         * 气泡工厂
         */
        function _createBubbleFactory() {
            var bubble = new Bubble();
            bubbleArr.push(bubble);
            bubble.draw();
        }
        /**
         * 气泡移动
         */
        function _moveBubble() {
            var _a = ColorfulBubble.yyg_settings, cvsWidth = _a.cvsWidth, cvsHeight = _a.cvsHeight;
            ColorfulBubble.yyg_pen.clearRect(0, 0, cvsWidth, cvsHeight);
            bubbleArr.forEach(function (item) {
                item.move();
                item.draw();
            });
            window.requestAnimationFrame(_moveBubble);
        }
    })(Init || (Init = {}));
    var Utils;
    (function (Utils) {
        /**
         * 获取单个dom元素
         * @param el dom元素
         */
        function getEle(el) {
            return document
                .querySelector(el);
        }
        Utils.getEle = getEle;
        /**
         * 取随机整数
         * @param min 最小值
         * @param max 最大值
         */
        function getFullRandom(min, max) {
            return ~~(Math.random() * (max - min) + min);
        }
        Utils.getFullRandom = getFullRandom;
        /**
         * 取随机任意数
         * @param min 最小值
         * @param max 最大值
         */
        function getAnyRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
        Utils.getAnyRandom = getAnyRandom;
        /**
         * 转化弧度
         * @param angle 角度
         */
        function getRadian(angle) {
            return (Math.PI / 180) * angle;
        }
        Utils.getRadian = getRadian;
        /**
         * 设置元素样式
         * @param el dom元素
         * @param options 样式表
         * @returns Utils
         */
        function setCss(el, options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    var element = options[key];
                    el.style.cssText += key + ": " + options[key] + ";";
                }
            }
            return Utils;
        }
        Utils.setCss = setCss;
        /**
         * 设置元素属性
         * @param el dom元素
         * @param options 属性配置项
         */
        function setAttr(el, options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    var element = options[key];
                    el.setAttribute(key, element);
                }
            }
            return Utils;
        }
        Utils.setAttr = setAttr;
    })(Utils || (Utils = {}));
    var Bubble = /** @class */ (function () {
        function Bubble() {
            var cvsWidth = ColorfulBubble.yyg_settings.cvsWidth;
            var cvsHeight = ColorfulBubble.yyg_settings.cvsHeight;
            var _a = ColorfulBubble.yyg_settings, bubbleSpeed = _a.bubbleSpeed, bubbleColorArr = _a.bubbleColorArr, bubbleScaleRange = _a.bubbleScaleRange, bubbleOpacity = _a.bubbleOpacity;
            this.centerPoint = {
                x: Utils.getAnyRandom(0, cvsWidth),
                y: Utils.getAnyRandom(0, cvsHeight),
            };
            this.distance = {
                x: Utils.getAnyRandom(-bubbleSpeed, bubbleSpeed),
                y: Utils.getAnyRandom(-bubbleSpeed, bubbleSpeed),
            };
            this.color = bubbleColorArr[Utils.getFullRandom(0, bubbleColorArr.length)];
            this.radius = Utils.getAnyRandom(bubbleScaleRange && bubbleScaleRange.min, bubbleScaleRange && bubbleScaleRange.max);
            this.opacity = bubbleOpacity;
        }
        Bubble.prototype.draw = function () {
            var centerPoint = this.centerPoint;
            var color = this.color;
            var radius = this.radius;
            var opacity = this.opacity;
            ColorfulBubble.yyg_pen.save();
            ColorfulBubble.yyg_pen.beginPath();
            ColorfulBubble.yyg_pen.globalAlpha = opacity;
            ColorfulBubble.yyg_pen.fillStyle = color;
            ColorfulBubble.yyg_pen.arc(centerPoint.x, centerPoint.y, radius, 0, Utils.getRadian(360));
            ColorfulBubble.yyg_pen.fill();
            ColorfulBubble.yyg_pen.closePath();
            ColorfulBubble.yyg_pen.restore();
        };
        Bubble.prototype.move = function () {
            var _a = ColorfulBubble.yyg_settings, cvsWidth = _a.cvsWidth, cvsHeight = _a.cvsHeight;
            var centerPoint = this.centerPoint;
            var distance = this.distance;
            var radius = this.radius;
            var halfRadius = radius / 2;
            centerPoint.x += distance.x;
            centerPoint.y += distance.y;
            // 碰撞检测
            this.distance.x = centerPoint.x < halfRadius
                || centerPoint.x > cvsWidth - halfRadius
                ? -this.distance.x
                : this.distance.x;
            this.distance.y = centerPoint.y < halfRadius
                || centerPoint.y > cvsHeight - halfRadius
                ? -this.distance.y
                : this.distance.y;
        };
        return Bubble;
    }());
})(ColorfulBubble || (ColorfulBubble = {}));
var cb = ColorfulBubble
    .config({
    cvsWidth: 800,
    cvsHeight: 700,
    cvsBgColor: '#000',
})
    .render('#colorful-bubble');
