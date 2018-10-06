"use strict";
/**
 * @name: business-carousel
 * @description 业务轮播插件
 * @author: yyg
 * @version 1.0.1
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
         * 获取元素集合
         * @param sign 索引
         */
        function getAllEle(sign) {
            return document.querySelectorAll(sign);
        }
        Utils.getAllEle = getAllEle;
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
                this.oList = null;
                this.oDotsItem = null;
                this.oListItem = null;
                this.oListWidth = 0;
                this.oItemLength = 0;
                this.oItemWidth = 0;
                this.initDOM();
            }
            // private static MIN_CLICK_DELAY_TIME: number = yyg_settings.duringTime || 1500;
            // private static lastClickTime: number = 0;
            /**
             * 自动轮播辅助函数
             */
            Scroll._aidedAutoScroll = function (count, oList, oListWidth, oItemLength) {
                Utils.setCss(oList, {
                    transition: "all " + yyg_settings.duringTime + "s " + yyg_settings.easing + "; ",
                    transform: "translateX(-" + oListWidth / (oItemLength) * (count + 1) + "px)",
                });
            };
            /**
             * 辅助函数: dot栏改变
             * @param oDotsItem 圆点数组
             */
            Scroll._aidedChangeDotsStyle = function (count, oItemLength, oDotsItem) {
                for (var i = 0, outer = void 0; outer = oDotsItem[i++];) {
                    Utils.removeClass(outer, 'yyg-dot-item-active');
                }
                if (count === oItemLength - 1) {
                    Utils.addClass(oDotsItem[0], 'yyg-dot-item-active');
                }
                else if (++count === 1) {
                    Utils.addClass(oDotsItem[oItemLength - 3], 'yyg-dot-item-active');
                }
                else {
                    Utils.addClass(oDotsItem[count - 2], 'yyg-dot-item-active');
                }
            };
            Scroll.prototype.initDOM = function () {
                if (Carousel.yyg_el) {
                    // 初始化DOM结构
                    Carousel.yyg_el.innerHTML = this.createDOMTree();
                    this.createStyle();
                    // 初始化公共对象(优化)
                    this.initCommonEle();
                    yyg_settings.autoPlay
                        && this.handleAutoScroll();
                    yyg_settings.isHoverPause
                        && this.handleImgHover();
                    yyg_settings.showDots
                        && this.handleDotsHover();
                    yyg_settings.showArrows
                        && this.handleArrowClick();
                }
            };
            /**
             * 初始化通用对象
             */
            Scroll.prototype.initCommonEle = function () {
                this.oList = Utils
                    .getEle('.yyg-content-list');
                this.oListWidth = this.oList.offsetWidth;
                this.oDotsItem = Utils.getAllEle('.yyg-dot-item');
                this.oListItem = Utils.getAllEle('.yyg-content-item');
                this.oItemLength = this.oListItem.length;
                this.oItemWidth = this.oListWidth / this.oItemLength;
            };
            Scroll.prototype.createDOMTree = function () {
                var dataSource = yyg_settings.dataSource;
                var showArrows = yyg_settings.showArrows, showDots = yyg_settings.showDots;
                var dotsSpan = '';
                var contentLi = '';
                contentLi += "\n          <li class=\"yyg-content-item\" data-id=" + dataSource.length + ">\n            " + (dataSource[dataSource.length - 1].img.url
                    ? "<a\n                    href=" + dataSource[dataSource.length - 1].img.target + "\n                    ><img src=" + dataSource[dataSource.length - 1].img.url + " alt=\"\u56FE\u7247\u63D0\u793A\" /></a>"
                    : dataSource[dataSource.length - 1].text) + "\n          </li>\n        ";
                dataSource.forEach(function (item, index) {
                    dotsSpan += "\n            <span\n              class=\"yyg-dot-item" + (index === 0
                        ? ' yyg-dot-item-active'
                        : '') + "\"\n              data-id=" + (index + 1) + "\n            ></span>\n          ";
                    contentLi += "\n            <li class=\"yyg-content-item\" data-id=" + (index + 1) + ">\n              " + (item.img.url
                        ? "<a\n                      href=" + item.img.target + "\n                     ><img src=" + item.img.url + " alt=\"\u56FE\u7247\u63D0\u793A\" /></a>"
                        : item.text) + "\n            </li>\n          ";
                });
                // 无缝
                contentLi += "\n          <li class=\"yyg-content-item\" data-id=" + 1 + ">\n            " + (dataSource[0].img.url
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
                oStyle.innerText += "\n          .yyg-carousel-container {\n            box-sizing: border-box;\n            height: 100%;\n            padding: 10px;\n            border: 5px solid #1890ff;\n            border-radius: 20px;\n          }\n          .yyg-carousel-main {\n            position: relative;\n            height: 100%;\n          }\n          .yyg-arrow-wrapper {\n            position: absolute;\n            z-index: 999;\n            top: 50%;\n            width: 30px;\n            heigth: 45px;\n            border-top-right-radius: 15px;\n            border-bottom-right-radius: 15px;\n            background-clip: padding-box;\n            background-color: rgba(0,0,0,.5);\n            color: #fff;\n            line-height: 45px;\n            font-size: 24px;\n            text-align: center;\n            cursor: pointer;\n            user-select: none;\n            transform: translateY(-50%);\n          }\n          .yyg-arrow-prev-wrapper {\n            left: 15px;\n          }\n          .yyg-arrow-next-wrapper {\n            right: 15px;\n          }\n          .yyg-content-wrapper {\n            overflow: hidden;\n            height: 100%;\n          }\n          .yyg-content-list {\n            width: " + (dataSource.length + 2) * 100 + "%;\n            height: 100%;\n            // transition: all " + yyg_settings.duringTime + "s " + yyg_settings.easing + ";\n            transform: translateX(-" + 100 / (dataSource.length + 2) + "%); \n          }\n          .yyg-content-item {\n            float: left;\n            width: " + 100 / (dataSource.length + 2) + "%;\n            height: 100%;\n            text-align: center;\n          }\n          .yyg-content-item a img {\n            display: block;\n            max-width: 100%;\n            height: 100%;\n            border-radius: 6px;\n          }\n          .yyg-dots-wrapper {\n            position: absolute;\n            left: 50%;\n            bottom: 10px;\n            padding: 2px 0;\n            border: 1px solid #ccc;\n            border-radius: 8px;\n            background-color: rgba(0,0,0,.5);\n            font-size: 0;\n            transform: translateX(-50%);\n          }\n          .yyg-dot-item {\n            display: inline-block;\n            margin-left: 5px;\n            width: 12px;\n            height: 12px;\n            background-color: #fff;\n            border-radius: 50%;\n            transition: all .5s ease-in-out;\n          }\n          .yyg-dot-item:last-child {\n            margin-right: 5px;\n          }\n          .yyg-dot-item-active {\n            background-color: #d50;\n          }\n        ";
            };
            /**
             * 处理 自动轮播
             */
            Scroll.prototype.handleAutoScroll = function () {
                var _this = this;
                var oList = this.oList;
                var oItemLength = this.oItemLength;
                var oDotsItem = this.oDotsItem;
                var oItemWidth = this.oItemWidth;
                var oListWidth = this.oListWidth;
                this.timer = setInterval(function () {
                    // 执行钩子函数
                    yyg_settings.beforeChange
                        && yyg_settings.beforeChange();
                    // 自动滚动
                    Scroll._aidedAutoScroll(_this.count++, oList, oListWidth, oItemLength);
                    // dot栏改变
                    Scroll._aidedChangeDotsStyle(_this.count, oItemLength, oDotsItem);
                }, yyg_settings.delayTime);
                // 无缝检测
                oList.addEventListener('transitionend', function () {
                    // 执行钩子函数
                    yyg_settings.afterChange
                        && yyg_settings.afterChange();
                    if (_this.count > oItemLength) {
                        _this.count = 2;
                        Utils.setCss(oList, {
                            transition: null,
                            transform: "translateX(" + -(_this.count) * oItemWidth + "px)",
                        });
                    }
                }, false);
            };
            /**
             * 处理 图片 hover
             */
            Scroll.prototype.handleImgHover = function () {
                var _this = this;
                var oListItem = this.oListItem;
                for (var key in oListItem) {
                    if (oListItem.hasOwnProperty(key)) {
                        var element = oListItem[key];
                        element.addEventListener('mouseenter', function () {
                            clearInterval(_this.timer);
                        }, false);
                        element.addEventListener('mouseleave', function () {
                            _this.handleAutoScroll();
                        }, false);
                    }
                }
            };
            /**
             * 处理 圆点 hover
             */
            Scroll.prototype.handleDotsHover = function () {
                var _this = this;
                var oList = this.oList;
                var oItemWidth = this.oItemWidth;
                var oDotsItem = this.oDotsItem;
                var _loop_1 = function (i, outer) {
                    outer.addEventListener('mouseenter', function () {
                        var signId = Utils
                            .getAttr(outer, 'data-id');
                        // 清除定时器
                        clearInterval(_this.timer);
                        // 同步count
                        _this.count = Number(signId);
                        // dot栏样式改变
                        for (var j = 0, inner = void 0; inner = oDotsItem[j++];) {
                            Utils.removeClass(inner, 'yyg-dot-item-active');
                        }
                        Utils.addClass(outer, 'yyg-dot-item-active');
                        // 同步轮播
                        Utils.setCss(oList, {
                            transition: "all " + yyg_settings.duringTime + "s " + yyg_settings.easing + "; ",
                            transform: "translateX(" + -(_this.count) * oItemWidth + "px)",
                        });
                    });
                    // 移除dot栏重新滚动
                    outer.addEventListener('mouseleave', function () {
                        _this.handleAutoScroll();
                    });
                };
                for (var i = 0, outer = void 0; outer = oDotsItem[i++];) {
                    _loop_1(i, outer);
                }
            };
            /**
             * 处理 箭头 点击
             */
            Scroll.prototype.handleArrowClick = function () {
                var _this = this;
                var oList = this.oList;
                var oDotsItem = this.oDotsItem;
                var oItemWidth = this.oItemWidth;
                var oItemLength = this.oItemLength;
                var prevArrow = Utils
                    .getEle('.yyg-arrow-prev-wrapper');
                var nextArrow = Utils
                    .getEle('.yyg-arrow-next-wrapper');
                // 左箭头
                prevArrow.addEventListener('click', function () {
                    clearInterval(_this.timer);
                    _this.count--;
                    //左移
                    Utils.setCss(oList, {
                        transition: "all " + yyg_settings.duringTime + "s " + yyg_settings.easing,
                        transform: "translateX(" + -(_this.count) * oItemWidth + "px)",
                    });
                    Scroll._aidedChangeDotsStyle(_this.count, oItemLength, oDotsItem);
                    // this.handleAutoScroll();
                }, false);
                // 右箭头
                nextArrow.addEventListener('click', function () {
                    clearInterval(_this.timer);
                    _this.count++;
                    Utils.setCss(oList, {
                        transition: "all " + yyg_settings.duringTime + "s " + yyg_settings.easing,
                        transform: "translateX(" + -(_this.count) * oItemWidth + "px)",
                    });
                    // 自动滚动
                    _this.handleAutoScroll();
                }, false);
                oList.addEventListener('transitionend', function () {
                    if (_this.count === 0) {
                        _this.count = oItemLength - 2;
                    }
                    else if (_this.count === oItemLength - 1) {
                        _this.count = 1;
                    }
                    Utils.setCss(oList, {
                        transition: "null",
                        transform: "translateX(" + -(_this.count) * oItemWidth + "px)",
                    });
                }, false);
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
    // easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    easing: 'ease-in-out',
    delayTime: 1500,
    isHoverPause: true,
    duringTime: 1,
}).render('#app');
