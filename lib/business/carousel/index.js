"use strict";
/**
 * @name: business-carousel 业务轮播
 * @author: yyg
 * @version 1.0.0
 */
/**
 * dataSource: 数据
 * afterChange: 切换后的回调
 * beforeChange: 切换前的回调
 * autoPlay: 是否自动切换
 * showDots: 是否显示导航点
 * showArrows: 是否显示箭头
 * easing: 动画效果
 * effect: 切换效果 Scroll | scroll
 * vertical: 垂直显示
 * delayTime: 自动滚动延迟时间
 * duringTime: 过渡时间
 * isHoverPause: 鼠标放置是否停止轮播
 */
var Carousel;
(function (Carousel) {
    Carousel.yyg_el = null;
    var yyg_settings = {
        dataSource: [],
        autoPlay: false,
        showDots: false,
        showArrows: false,
        easing: 'ease-in-out',
        effect: 'scroll',
        vertical: false,
        duringTime: 1.5,
        delayTime: 3000,
        isHoverPause: true,
        beforeChange: function () { return null; },
        afterChange: function () { return null; },
    };
    function config(options) {
        Init.initSettings(options);
        return Carousel;
    }
    Carousel.config = config;
    function render(el) {
        Init.initEl(el);
        Init.initWhichEffect();
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
            if (Utils.getEle(el)) {
                Carousel.yyg_el = Utils.getEle(el);
            }
            else {
                throw new Error('el不存在, 请输入其他的!');
            }
        }
        Init.initEl = initEl;
        // 调用轮播图
        function initWhichEffect() {
            new Main.Scroll({});
        }
        Init.initWhichEffect = initWhichEffect;
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
        /**
         * 添加类名
         * @param el 元素
         * @param className 类名
         */
        function addClass(el, className) {
            el.classList.add(className);
            return Utils;
        }
        Utils.addClass = addClass;
        /**
         * 移除类名
         * @param el 元素
         * @param className 类名
         */
        function removeClass(el, className) {
            el.classList.remove(className);
            return Utils;
        }
        Utils.removeClass = removeClass;
    })(Utils || (Utils = {}));
    ;
    var Main;
    (function (Main) {
        var Scroll = /** @class */ (function () {
            function Scroll(_props) {
                this.timer = 0;
                this.count = 1;
                this.initDOM();
            }
            /**
             * 自动轮播辅助函数
             */
            Scroll._aidedAutoScroll = function (count) {
                var oList = Utils
                    .getEle('.yyg-content-list');
                var oListWidth = oList.offsetWidth;
                var oItemLength = yyg_settings.dataSource.length;
                Utils.setCss(oList, {
                    transition: "all " + yyg_settings.duringTime + "s " + yyg_settings.easing + "; ",
                    transform: "translateX(-" + oListWidth / (oItemLength + 1) * (count) + "px)",
                });
            };
            Scroll.prototype.initDOM = function () {
                if (Carousel.yyg_el) {
                    // 初始化DOM结构
                    Carousel.yyg_el.innerHTML = this.createDOMTree();
                    this.createStyle();
                    yyg_settings.autoPlay
                        && this.handleAutoScroll();
                    yyg_settings.isHoverPause
                        && this.handleImgHover();
                    yyg_settings.showDots
                        && this.handleDotsHover();
                }
            };
            Scroll.prototype.createDOMTree = function () {
                var dataSource = yyg_settings.dataSource;
                var showArrows = yyg_settings.showArrows, showDots = yyg_settings.showDots;
                var dotsSpan = '';
                var contentLi = '';
                dataSource.forEach(function (item, index) {
                    dotsSpan += "\n            <span class=\"yyg-dot-item\" data-id=" + index + "></span>\n          ";
                    contentLi += "\n            <li class=\"yyg-content-item\" data-id=" + index + ">\n              " + (item.img.url
                        ? "<a\n                      href=" + item.img.target + "\n                     ><img src=" + item.img.url + " alt=\"\u56FE\u7247\u63D0\u793A\" /></a>"
                        : item.text) + "\n            </li>\n          ";
                });
                // 无缝
                contentLi += "\n          <li class=\"yyg-content-item\" data-id=" + 0 + ">\n            " + (dataSource[0].img.url
                    ? "<a\n                    href=" + dataSource[0].img.target + "\n                    ><img src=" + dataSource[0].img.url + " alt=\"\u56FE\u7247\u63D0\u793A\" /></a>"
                    : dataSource[0].text) + "\n          </li>\n        ";
                var final = "\n          <div class=\"yyg-carousel-container\">\n            <div class=\"yyg-carousel-main\">\n              <div class=\"yyg-content-wrapper\">\n                <ul class=\"yyg-content-list\">" + contentLi + "</ul>\n              </div>\n              " + (showArrows
                    ? "\n                    <div class=\"yyg-arrow-wrapper yyg-arrow-prev-wrapper\">\n                      <i class=\"yyg-arrow yyg-arrow-prev\">&lt;</i>\n                    </div>\n                    <div class=\"yyg-arrow-wrapper yyg-arrow-next-wrapper\">\n                      <i class=\"yyg-arrow yyg-arrow-next\">&gt;</i>\n                    </div>\n                  "
                    : '') + "\n              " + (showDots
                    ? "<div class=\"yyg-dots-wrapper\">" + dotsSpan + "</div>"
                    : '') + "\n            </div>\n          </div>\n        ";
                return final;
            };
            Scroll.prototype.createStyle = function () {
                var oStyle = Utils
                    .getEle('style');
                var dataSource = yyg_settings.dataSource;
                // style标签不存在
                if (!oStyle) {
                    oStyle = document.createElement('style');
                    var oHead = Utils
                        .getEle('head');
                    oHead.appendChild(oStyle);
                }
                oStyle.innerText += "\n          .yyg-carousel-container {\n            box-sizing: border-box;\n            height: 100%;\n            padding: 10px;\n            border: 5px solid #1890ff;\n            border-radius: 20px;\n          }\n          .yyg-carousel-main {\n            position: relative;\n            height: 100%;\n          }\n          .yyg-arrow-wrapper {\n            position: absolute;\n            z-index: 999;\n            top: 50%;\n            width: 30px;\n            heigth: 45px;\n            border-top-right-radius: 15px;\n            border-bottom-right-radius: 15px;\n            background-clip: padding-box;\n            background-color: rgba(0,0,0,.5);\n            color: #fff;\n            line-height: 45px;\n            font-size: 24px;\n            text-align: center;\n            cursor: pointer;\n            user-select: none;\n            transform: translateY(-50%);\n          }\n          .yyg-arrow-prev-wrapper {\n            left: 0;\n          }\n          .yyg-arrow-next-wrapper {\n            right: 0;\n          }\n          .yyg-content-wrapper {\n            overflow: hidden;\n            height: 100%;\n          }\n          .yyg-content-list {\n            width: " + (dataSource.length + 1) * 100 + "%;\n            height: 100%;\n            transition: all " + yyg_settings.duringTime + "s " + yyg_settings.easing + "; \n          }\n          .yyg-content-item {\n            float: left;\n            width: " + 100 / (dataSource.length + 1) + "%;\n            height: 100%;\n            text-align: center;\n          }\n          .yyg-content-item a img {\n            display: block;\n            max-width: 100%;\n            height: 100%;\n            border-radius: 6px;\n          }\n          .yyg-dots-wrapper {\n            position: absolute;\n            left: 50%;\n            bottom: 10px;\n            padding: 2px 0;\n            border: 1px solid #ccc;\n            border-radius: 8px;\n            background-color: rgba(0,0,0,.5);\n            font-size: 0;\n            transform: translateX(-50%);\n          }\n          .yyg-dot-item {\n            display: inline-block;\n            margin-left: 5px;\n            width: 12px;\n            height: 12px;\n            background-color: #fff;\n            border-radius: 50%;\n            transition: all .5s ease-in-out;\n          }\n          .yyg-dot-item:last-child {\n            margin-right: 5px;\n          }\n          .yyg-dot-item-active {\n            background-color: #d50;\n          }\n        ";
            };
            /**
             * 处理 自动轮播
             */
            Scroll.prototype.handleAutoScroll = function () {
                var _this = this;
                var oList = Utils
                    .getEle('.yyg-content-list');
                var oListWidth = oList.offsetWidth;
                var oItemLength = yyg_settings.dataSource.length + 1;
                var oItemWidth = oListWidth / (oItemLength + 1);
                this.timer = setInterval(function () {
                    // 执行钩子函数
                    yyg_settings.beforeChange
                        && yyg_settings.beforeChange();
                    Scroll._aidedAutoScroll(_this.count++);
                }, yyg_settings.delayTime);
                // 无缝检测
                oList.addEventListener('transitionend', function () {
                    // 执行钩子函数
                    yyg_settings.afterChange
                        && yyg_settings.afterChange();
                    if (_this.count === oItemLength) {
                        _this.count = 1;
                        Utils.setCss(oList, {
                            transition: null,
                            transform: "translateX(" + -(_this.count - 1) * oItemWidth + "px)"
                        });
                    }
                    else if (_this.count === 0) {
                        _this.count = oItemLength - 1;
                        Utils.setCss(oList, {
                            transition: null,
                            transform: "translateX(" + -(_this.count - 1) * oItemWidth + "px)"
                        });
                    }
                }, false);
            };
            /**
             * 处理 图片 hover
             */
            Scroll.prototype.handleImgHover = function () {
                var _this = this;
                // 鼠标放置图片, 停止轮播
                var oList = Utils
                    .getEle('.yyg-content-list');
                var oListItem = oList
                    .querySelectorAll('.yyg-content-item');
                for (var key in oListItem) {
                    if (oListItem.hasOwnProperty(key)) {
                        var element = oListItem[key];
                        element.addEventListener('mouseenter', function () {
                            clearInterval(_this.timer);
                        }, false);
                        element.addEventListener('mouseleave', function () {
                            _this.timer = setInterval(function () {
                                yyg_settings.beforeChange
                                    && yyg_settings.beforeChange();
                                Scroll._aidedAutoScroll(_this.count++);
                            }, yyg_settings.delayTime);
                        }, false);
                    }
                }
            };
            /**
             * 处理 圆点 hover
             */
            Scroll.prototype.handleDotsHover = function () {
                var oDotsWrapper = Utils
                    .getEle('.yyg-dots-wrapper');
                console.log(oDotsWrapper);
            };
            return Scroll;
        }());
        Main.Scroll = Scroll;
    })(Main || (Main = {}));
})(Carousel || (Carousel = {}));
Carousel.config({
    dataSource: [{
            text: 'Slide One',
            img: {
                url: 'https://img.alicdn.com/tps/i4/TB11ULPd3HqK1RjSZFPSuwwapXa.jpg_q90_.webp',
                target: '#',
            },
        }, {
            text: 'Slide Two',
            img: {
                url: '',
                target: '',
            },
        }, {
            text: 'Slide Three',
            img: {
                url: '',
                target: '',
            },
        }, {
            text: 'Slide Four',
            img: {
                url: '',
                target: '',
            },
        }],
    showArrows: true,
    showDots: true,
    autoPlay: true,
    easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    delayTime: 3000,
    isHoverPause: true,
}).render('#app');
