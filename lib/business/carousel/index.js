"use strict";
/**
 * @name: business-carousel 业务轮播
 * @author: yyg
 * @version 1.0.0
 */
/**
 * width: 宽
 * height: 高
 * dataSource: 数据
 * afterChange: 切换后的回调
 * beforeChange: 切换前的回调
 * autoPlay: 是否自动切换
 * showDots: 是否显示导航点
 * showArrows: 是否显示箭头
 * easing: 动画效果
 * effect: 切换效果 fade | scroll
 * vertical: 垂直显示
 * duringTime: 间隔时间
 */
var Carousel;
(function (Carousel) {
    Carousel.yyg_el = null;
    var yyg_settings = {
        width: 0,
        height: 0,
        dataSource: [],
        autoPlay: false,
        showDots: false,
        showArrows: false,
        easing: 'linear',
        effect: 'scroll',
        vertical: false,
        duringTime: 3,
    };
    function config(options) {
        Init.initSettings(options);
        return Carousel;
    }
    Carousel.config = config;
    function render(el) {
        Init.initEl(el);
        return Carousel;
    }
    Carousel.render = render;
    var Init;
    (function (Init) {
        function initSettings(options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    var element = options[key];
                    Reflect.set(yyg_settings, key, element);
                }
            }
        }
        Init.initSettings = initSettings;
        function initEl(el) {
            if (document.querySelector(el)) {
                Carousel.yyg_el = document.querySelector(el);
            }
            else {
                throw new Error('容器元素不存在!');
            }
        }
        Init.initEl = initEl;
    })(Init || (Init = {}));
    var Utils;
    (function (Utils) {
        /**
         * 获取元素
         * @param id 元素id
         */
        function getEle(sign) {
            return document.querySelector(sign) || null;
        }
        Utils.getEle = getEle;
        /**
         * 设置元素属性
         * @param ele 元素
         * @param options 属性配置
         */
        function setAttr(ele, options) {
            for (var key in options) {
                ele.setAttribute(key, options[key]);
            }
            return Utils;
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
            return Utils;
        }
        Utils.setCss = setCss;
        /**
         * 取随机值
         * @param min 最小值
         * @param max 最大值
         */
        function getRandom(min, max) {
            return (Math.random() * (max - min) + min);
        }
        Utils.getRandom = getRandom;
        /**
         * 转化弧度
         * @param angle 角度
         */
        function getRadian(angle) {
            return (Math.PI / 180) * angle;
        }
        Utils.getRadian = getRadian;
        /**
         * 获取元素属性值
         * @param ele 元素
         * @param key 属性名
         */
        function getAttr(ele, key) {
            return ele.getAttribute(key);
        }
        Utils.getAttr = getAttr;
    })(Utils || (Utils = {}));
    ;
})(Carousel || (Carousel = {}));
Carousel.config({
    dataSource: [{
            text: 'Slide One',
            url: '',
        }],
    width: 600,
    height: 200,
}).render('#app');
console.log(Carousel);
