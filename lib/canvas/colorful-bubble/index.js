"use strict";
/**
 * @name canvas-colorful-bubble
 * @description 五彩气泡背景插件
 * @author yyg
 * @version 1.0.1
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
            new Bubble();
        }
        Init.initBubble = initBubble;
    })(Init || (Init = {}));
    var Utils;
    (function (Utils) {
        function getEle(el) {
            return document
                .querySelector(el);
        }
        Utils.getEle = getEle;
    })(Utils || (Utils = {}));
    var Bubble = /** @class */ (function () {
        function Bubble() {
        }
        Bubble.prototype.draw = function () {
            ColorfulBubble.yyg_pen.save();
            ColorfulBubble.yyg_pen.beginPath();
            ColorfulBubble.yyg_pen.closePath();
            ColorfulBubble.yyg_pen.restore();
        };
        return Bubble;
    }());
})(ColorfulBubble || (ColorfulBubble = {}));
var cb = ColorfulBubble
    .config({
    cvsWidth: 500,
    cvsHeight: 600,
})
    .render('#colorful-bubble');
