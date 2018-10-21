"use strict";
/**
 * @name: canvas-jumping-characters
 * @description 字节跳动, 博客背景插件
 * @author: yyg
 * @version 1.0.4
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
    };
    JumpingCharacters.mousePoint = {
        x: 0,
        y: 0,
    };
    JumpingCharacters.yyg_pen = null;
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
        }, false);
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
    })(Utils || (Utils = {}));
    var JC = /** @class */ (function () {
        function JC() {
            var _a = JumpingCharacters.yyg_settings, initialOpacity = _a.initialOpacity, textSize = _a.textSize, textColor = _a.textColor, safeDistance = _a.safeDistance, text = _a.text;
            this.opacity = initialOpacity;
            this.textSize = textSize;
            this.text = text;
            this.textColor = textColor;
            this.safeDistance = safeDistance;
        }
        return JC;
    }());
})(JumpingCharacters || (JumpingCharacters = {}));
var a = JumpingCharacters.render({
    ele: '#jumping-characters',
});
// console.log(a);
