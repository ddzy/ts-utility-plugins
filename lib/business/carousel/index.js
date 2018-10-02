"use strict";
/**
 * @name: business-carousel 业务轮播
 * @author: zhaoy_duan
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
    var settings = {
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
                    Reflect.set(settings, key, element);
                }
            }
        }
        Init.initSettings = initSettings;
        function initEl(el) {
            Carousel.yyg_el = document.querySelector(el);
        }
        Init.initEl = initEl;
    })(Init || (Init = {}));
})(Carousel || (Carousel = {}));
Carousel
    .config({
    dataSource: [{
            text: 'Slide One',
            url: '',
        }],
    width: 600,
    height: 200,
})
    .render();
