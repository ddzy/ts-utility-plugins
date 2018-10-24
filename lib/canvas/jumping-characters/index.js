"use strict";
/**
 * @name: canvas-jumping-characters
 * @description 字节跳动, 博客背景插件
 * @author: yyg
 * @version 1.0.7
 */
/**
 * @param ele 画布元素
 * @param cvsWidth 画布宽
 * @param cvsHeight 画布高
 * @param cvsBgColor 画布背景
 * @param text   string | string[] 文字
 * @param textColor string | string[] 文字颜色
 * @param textSize 文字大小
 * @param safeDistance 安全距离(移动多远消失)
 * @param initialOpacity 初始透明度
 * @param speed 移动速度
 */
var JumpingCharacters;
(function (JumpingCharacters) {
    JumpingCharacters.yyg_settings = {
        ele: '',
        cvsWidth: 500,
        cvsHeight: 500,
        cvsBgColor: '#000',
        text: [
            '富强', '民主', '文明', '和谐',
            '自由', '平等', '公正', '法治',
            '爱国', '敬业', '诚信', '友善',
        ],
        textColor: [
            '#1890ff', '#f5222d', '#fa8c16', '#faad14',
            '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
            '#2f5418', '#722ed1', '#eb2f96', '#fa541c',
        ],
        textSize: 16,
        safeDistance: 20,
        initialOpacity: 1,
        speed: 1,
    };
    JumpingCharacters.mousePoint = {
        x: 0,
        y: 0,
    };
    JumpingCharacters.saveCharactersArr = [];
    JumpingCharacters.yyg_pen = null;
    var timer = 0;
    function render(_props) {
        _aidedInitSettings(_props);
        _aidedInitJC();
        return JumpingCharacters;
    }
    JumpingCharacters.render = render;
    /**
     * 初始化自定义配置辅助函数
     * @param options 配置项
     */
    function _aidedInitSettings(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                var element = options[key];
                key === 'ele'
                    ? _aidedInitCvs(element)
                    : Reflect.set(JumpingCharacters.yyg_settings, key, element);
                _aidedInitCvsSelfConfiguration();
            }
        }
    }
    /**
     * 初始化canvas
     * @param ele canvas元素
     */
    function _aidedInitCvs(ele) {
        var el = Utils.getEle(ele);
        if (el) {
            if (el.localName === 'canvas') {
                var e = el;
                // set the initial canvas context
                Reflect.set(JumpingCharacters.yyg_settings, 'ele', e);
                JumpingCharacters.yyg_pen = e.getContext('2d');
            }
            else {
                throw new Error('Please enter the HTMLCanvasElement!');
            }
        }
        else {
            throw new Error('Please enter an exist HTMLElement!');
        }
    }
    /**
     * 初始化 canvas相关属性,样式配置
     */
    function _aidedInitCvsSelfConfiguration() {
        var _a = JumpingCharacters.yyg_settings, ele = _a.ele, cvsWidth = _a.cvsWidth, cvsHeight = _a.cvsHeight, cvsBgColor = _a.cvsBgColor;
        Utils
            .setCss(ele, {
            'background-color': cvsBgColor,
        })
            .setAttr(ele, {
            width: cvsWidth,
            height: cvsHeight,
        });
    }
    /**
     * 初始化 主类 辅助函数
     */
    function _aidedInitJC() {
        var ele = JumpingCharacters.yyg_settings.ele;
        ele.addEventListener('click', function (e) {
            JumpingCharacters.mousePoint.x = e.clientX;
            JumpingCharacters.mousePoint.y = e.clientY;
            var jc = new JC();
            JumpingCharacters.saveCharactersArr[0] = jc;
            _aidedTick();
        }, false);
    }
    function _aidedTick() {
        var cvsWidth = JumpingCharacters.yyg_settings.cvsWidth, cvsHeight = JumpingCharacters.yyg_settings.cvsHeight;
        clearInterval(timer);
        timer = setInterval(function () {
            JumpingCharacters.yyg_pen.clearRect(0, 0, cvsWidth, cvsHeight);
            for (var _i = 0, saveCharactersArr_1 = JumpingCharacters.saveCharactersArr; _i < saveCharactersArr_1.length; _i++) {
                var jc = saveCharactersArr_1[_i];
                jc.move();
                jc.draw();
            }
        }, 1000 / 60);
    }
    var Utils;
    (function (Utils) {
        function getEle(el) {
            return document.querySelector(el);
        }
        Utils.getEle = getEle;
        function setCss(el, options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    var element = options[key];
                    el.style.cssText += key + ": " + element + ";";
                }
            }
            return Utils;
        }
        Utils.setCss = setCss;
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
        function isArray(el) {
            return el && Array.isArray(el);
        }
        Utils.isArray = isArray;
        function getRandomWithPositive(min, max) {
            return ~~(Math.random() * (max - min) + min);
        }
        Utils.getRandomWithPositive = getRandomWithPositive;
    })(Utils || (Utils = {}));
    var JC = /** @class */ (function () {
        function JC() {
            var _a = JumpingCharacters.yyg_settings, initialOpacity = _a.initialOpacity, textSize = _a.textSize, textColor = _a.textColor, safeDistance = _a.safeDistance, text = _a.text, speed = _a.speed;
            this.opacity = initialOpacity;
            this.textSize = textSize;
            this.text = Utils.isArray(text)
                ? text[Utils.getRandomWithPositive(0, text.length)]
                : text;
            this.textColor = Utils.isArray(textColor)
                ? textColor[Utils.getRandomWithPositive(0, textColor.length)]
                : textColor;
            this.safeDistance = safeDistance;
            this.centerPoint = JumpingCharacters.mousePoint;
            this.speed = speed;
            this._init();
        }
        JC.prototype._init = function () {
            this.draw();
        };
        JC.prototype.draw = function () {
            var _a = this, text = _a.text, textColor = _a.textColor, textSize = _a.textSize, centerPoint = _a.centerPoint;
            this.opacity = this.opacity <= 0
                ? 0
                : this.opacity;
            JumpingCharacters.yyg_pen.save();
            JumpingCharacters.yyg_pen.beginPath();
            JumpingCharacters.yyg_pen.fillStyle = textColor;
            JumpingCharacters.yyg_pen.font = textSize + "px 'Fira Code Regular'";
            JumpingCharacters.yyg_pen.textAlign = 'center';
            JumpingCharacters.yyg_pen.textBaseLine = 'middle';
            JumpingCharacters.yyg_pen.globalAlpha = this.opacity;
            JumpingCharacters.yyg_pen.fillText(text, centerPoint.x, centerPoint.y);
            JumpingCharacters.yyg_pen.closePath();
            JumpingCharacters.yyg_pen.restore();
        };
        JC.prototype.move = function () {
            var centerPoint = this.centerPoint;
            centerPoint.y -= this.speed;
            this.opacity -= .03;
        };
        return JC;
    }());
})(JumpingCharacters || (JumpingCharacters = {}));
var a = JumpingCharacters.render({
    ele: '#jumping-characters',
    initialOpacity: 1,
    textSize: 24,
});
// console.log(a);
