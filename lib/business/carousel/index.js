"use strict";
/**
 * @name: business-carousel
 * @description 业务轮播插件
 * @author: yyg
 * @version 1.0.4
 * @constant 最近修改于 18/10/13
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
            switch (yyg_settings.effect) {
                case 'scroll':
                    new Main.Scroll({});
                    break;
                case 'fade':
                    new Main.Fade({});
                    break;
                default:
                    break;
            }
        }
        Init.initWhichEffect = initWhichEffect;
    })(Init || (Init = {}));
    var Utils;
    (function (Utils) {
        var lastClickTime = 0;
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
            el && el.classList.add(className);
            return Utils;
        }
        Utils.addClass = addClass;
        /**
         * 移除类名
         * @param el 元素
         * @param className 类名
         */
        function removeClass(el, className) {
            el && el.classList.remove(className);
            return Utils;
        }
        Utils.removeClass = removeClass;
        /**
         * 节流
         * @param time 过渡时间
         * @param callback 回调函数
         */
        function throttle(time, callback) {
            var currentClickTime = new Date().getTime();
            if (currentClickTime - lastClickTime >= time) {
                callback();
                lastClickTime = currentClickTime;
            }
        }
        Utils.throttle = throttle;
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
                this.oPrevArrow = null;
                this.oNextArrow = null;
                this.oListWidth = 0;
                this.oItemLength = 0;
                this.oItemWidth = 0;
                this.initDOM();
            }
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
                    yyg_settings.showArrows
                        && this.handleArrowHover();
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
                this.oPrevArrow = Utils.getEle('.yyg-arrow-prev-wrapper');
                this.oNextArrow = Utils.getEle('.yyg-arrow-next-wrapper');
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
                oStyle.innerText += "\n          .yyg-carousel-container {\n            box-sizing: border-box;\n            height: 100%;\n            padding: 10px;\n            border: 5px solid #1890ff;\n            border-radius: 20px;\n          }\n          .yyg-carousel-main {\n            position: relative;\n            height: 100%;\n          }\n          .yyg-arrow-wrapper {\n            position: absolute;\n            z-index: 999;\n            top: 50%;\n            width: 30px;\n            heigth: 45px;\n            border-top-right-radius: 15px;\n            border-bottom-right-radius: 15px;\n            background-clip: padding-box;\n            background-color: rgba(0,0,0,.5);\n            color: #fff;\n            opacity: 0;\n            line-height: 45px;\n            font-size: 24px;\n            text-align: center;\n            cursor: pointer;\n            user-select: none;\n            transform: translateY(-50%);\n            transition: all .5s ease-in-out;\n          }\n          .yyg-arrow-prev-wrapper {\n            left: -10px;\n          }\n          .yyg-arrow-next-wrapper {\n            right: -10px;\n          }\n          .yyg-content-wrapper {\n            overflow: hidden;\n            height: 100%;\n          }\n          .yyg-content-list {\n            width: " + (dataSource.length + 2) * 100 + "%;\n            height: 100%;\n            // transition: all " + yyg_settings.duringTime + "s " + yyg_settings.easing + ";\n            transform: translateX(-" + 100 / (dataSource.length + 2) + "%); \n          }\n          .yyg-content-item {\n            float: left;\n            width: " + 100 / (dataSource.length + 2) + "%;\n            height: 100%;\n            text-align: center;\n          }\n          .yyg-content-item a img {\n            display: block;\n            max-width: 100%;\n            height: 100%;\n            border-radius: 6px;\n          }\n          .yyg-dots-wrapper {\n            display: none;\n            position: absolute;\n            left: 50%;\n            bottom: 10px;\n            padding: 2px 0;\n            border: 1px solid #ccc;\n            border-radius: 8px;\n            background-color: rgba(0,0,0,.5);\n            font-size: 0;\n            transform: translateX(-50%);\n          }\n          .yyg-dot-item {\n            display: inline-block;\n            margin-left: 5px;\n            width: 12px;\n            height: 12px;\n            background-color: #fff;\n            border-radius: 50%;\n            transition: all .5s ease-in-out;\n          }\n          .yyg-dot-item:last-child {\n            margin-right: 5px;\n          }\n          .yyg-dot-item-active {\n            background-color: #d50;\n          }\n          .yyg-prev-wrapper-active {\n            left: 15px;\n            opacity: 1;\n          }\n          .yyg-next-wrapper-active {\n            right: 15px;\n            opacity: 1;\n          }\n        ";
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
                            _this.aidedHandleArrowVisible(yyg_settings.showArrows);
                        }, false);
                        element.addEventListener('mouseleave', function () {
                            _this.handleAutoScroll();
                            _this.aidedHandleArrowVisible(false);
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
                var oDotsWrapper = Utils
                    .getEle('.yyg-dots-wrapper');
                Utils.setCss(oDotsWrapper, {
                    display: 'block',
                });
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
                var oItemWidth = this.oItemWidth;
                var oItemLength = this.oItemLength;
                var prevArrow = this.oPrevArrow;
                var nextArrow = this.oNextArrow;
                // 左箭头
                prevArrow && prevArrow.addEventListener('click', function () {
                    _this.aidedHandleArrowClick('left');
                }, false);
                // 右箭头
                nextArrow && nextArrow.addEventListener('click', function () {
                    _this.aidedHandleArrowClick('right');
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
            /**
             * 悬浮箭头, 箭头显隐(解决bug)
             */
            Scroll.prototype.handleArrowHover = function () {
                var _this = this;
                var oPrevArrow = this.oPrevArrow;
                var oNextArrow = this.oNextArrow;
                oPrevArrow && oPrevArrow.addEventListener('mouseenter', function () {
                    _this.aidedHandleArrowVisible(true);
                }, false);
                oNextArrow && oNextArrow.addEventListener('mouseenter', function () {
                    _this.aidedHandleArrowVisible(true);
                }, false);
            };
            /**
             * 箭头点击切换辅助函数
             * @param whichArrow 哪边箭头
             */
            Scroll.prototype.aidedHandleArrowClick = function (whichArrow) {
                var _this = this;
                var oList = this.oList;
                var oDotsItem = this.oDotsItem;
                var oItemWidth = this.oItemWidth;
                var oItemLength = this.oItemLength;
                clearInterval(this.timer);
                // 节流处理
                Utils.throttle(Scroll.MIN_CLICK_DELAY_TIME, function () {
                    switch (whichArrow) {
                        case 'left':
                            _this.count--;
                            break;
                        case 'right':
                            _this.count++;
                            break;
                        default:
                            break;
                    }
                    Utils.setCss(oList, {
                        transition: "all " + yyg_settings.duringTime + "s " + yyg_settings.easing,
                        transform: "translateX(" + -(_this.count) * oItemWidth + "px)",
                    });
                    Scroll._aidedChangeDotsStyle(_this.count, oItemLength, oDotsItem);
                });
                this.handleAutoScroll();
            };
            /**
             * 控制箭头显隐 辅助函数
             * @param show 箭头显隐
             */
            Scroll.prototype.aidedHandleArrowVisible = function (show) {
                var oPrevArrow = this.oPrevArrow;
                var oNextArrow = this.oNextArrow;
                if (show) {
                    Utils.addClass(oPrevArrow, 'yyg-prev-wrapper-active');
                    Utils.addClass(oNextArrow, 'yyg-next-wrapper-active');
                }
                else {
                    Utils.removeClass(oPrevArrow, 'yyg-prev-wrapper-active');
                    Utils.removeClass(oNextArrow, 'yyg-next-wrapper-active');
                }
            };
            Scroll.MIN_CLICK_DELAY_TIME = yyg_settings.duringTime * 1000 || 1500;
            return Scroll;
        }());
        Main.Scroll = Scroll;
        var Fade = /** @class */ (function () {
            function Fade(_props) {
                this.oContentItem = null;
                this.oArrowWrapper = null;
                this.oPrevWrapper = null;
                this.oNextWrapper = null;
                this.oDotsWrapper = null;
                this.oDotsItem = null;
                this.oContentItemLength = 0;
                this.oDotsItemLength = 0;
                this.timer = 0;
                this.count = 0;
                this.init();
            }
            Fade.prototype.init = function () {
                if (Carousel.yyg_el) {
                    var showArrows = yyg_settings.showArrows, showDots = yyg_settings.showDots, autoPlay = yyg_settings.autoPlay;
                    Carousel.yyg_el.innerHTML = this.createDOM();
                    this.createStyle();
                    this.initCommonEle();
                    autoPlay && this.handleAutoPlay();
                    showArrows && this.handleArrowClick();
                    showArrows && this.handleImgHover();
                    showDots && this.handleDotsHover();
                }
            };
            Fade.prototype.createDOM = function () {
                var dataSource = yyg_settings.dataSource;
                var showArrows = yyg_settings.showArrows, showDots = yyg_settings.showDots;
                var dotsSpan = '';
                var contentLi = '';
                dataSource.forEach(function (item, index) {
                    dotsSpan += "\n            <span\n              class=\"yyg-dot-item" + (index === 0
                        ? ' yyg-dot-item-active'
                        : '') + "\"\n              data-id=" + (index + 1) + "\n            ></span>\n          ";
                    contentLi += "\n            <li class=\"yyg-content-item\" data-id=" + (index + 1) + ">\n              " + (item.img.url
                        ? "<a\n                      href=" + item.img.target + "\n                     ><img src=" + item.img.url + " alt=\"\u56FE\u7247\u63D0\u793A\" /></a>"
                        : item.text) + "\n            </li>\n          ";
                });
                var final = "\n          <div class=\"yyg-carousel-container\">\n            <div class=\"yyg-carousel-main\">\n              <div class=\"yyg-content-wrapper\">\n                <ul class=\"yyg-content-list\">" + contentLi + "</ul>\n              </div>\n              " + (showArrows
                    ? "\n                    <div class=\"yyg-arrow-wrapper yyg-arrow-prev-wrapper\">\n                      <i class=\"yyg-arrow yyg-arrow-prev\">&lt;</i>\n                    </div>\n                    <div class=\"yyg-arrow-wrapper yyg-arrow-next-wrapper\">\n                      <i class=\"yyg-arrow yyg-arrow-next\">&gt;</i>\n                    </div>\n                  "
                    : '') + "\n              " + (showDots
                    ? "<div class=\"yyg-dots-wrapper\">" + dotsSpan + "</div>"
                    : '') + "\n            </div>\n          </div>\n        ";
                return final;
            };
            Fade.prototype.createStyle = function () {
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
                oStyle.innerText += "\n        .yyg-carousel-container {\n          box-sizing: border-box;\n          height: 100%;\n          padding: 10px;\n          border: 5px solid #1890ff;\n          border-radius: 20px;\n        }\n        .yyg-carousel-main {\n          position: relative;\n          height: 100%;\n        }\n        .yyg-arrow-wrapper {\n          display: none;\n          position: absolute;\n          z-index: 999;\n          top: 50%;\n          width: 30px;\n          heigth: 45px;\n          border-top-right-radius: 15px;\n          border-bottom-right-radius: 15px;\n          background-clip: padding-box;\n          background-color: rgba(0,0,0,.5);\n          color: #fff;\n          opacity: 0;\n          line-height: 45px;\n          font-size: 24px;\n          text-align: center;\n          cursor: pointer;\n          user-select: none;\n          transform: translateY(-50%);\n          transition: all .5s ease-in-out;\n        }\n        .yyg-arrow-prev-wrapper {\n          left: 0;\n        }\n        .yyg-arrow-next-wrapper {\n          right: 0;\n        }\n        .yyg-content-wrapper {\n          overflow: hidden;\n          height: 100%;\n        }\n        .yyg-content-list {\n          position: relative;\n          height: 100%;\n        }\n        .yyg-content-item {\n          position: absolute;\n          width: 100%;\n          height: 100%;\n          text-align: center;\n          opacity: 0;\n        }\n        .yyg-content-item:first-child {\n          opacity: 1;\n          z-index: 0;\n        }\n        .yyg-content-item a img {\n          display: block;\n          max-width: 100%;\n          height: 100%;\n          border-radius: 6px;\n        }\n        .yyg-dots-wrapper {\n          position: absolute;\n          left: 50%;\n          bottom: 10px;\n          z-index: 888;\n          padding: 2px 0;\n          border: 1px solid #ccc;\n          border-radius: 8px;\n          background-color: rgba(0,0,0,.5);\n          font-size: 0;\n          transform: translateX(-50%);\n        }\n        .yyg-dot-item {\n          display: inline-block;\n          margin-left: 5px;\n          width: 12px;\n          height: 12px;\n          background-color: #fff;\n          border-radius: 50%;\n          transition: all .5s ease-in-out;\n        }\n        .yyg-dot-item:last-child {\n          margin-right: 5px;\n        }\n        .yyg-dot-item-active {\n          background-color: #d50;\n        }\n        .yyg-prev-wrapper-active {\n          left: 15px;\n          opacity: 1;\n        }\n        .yyg-next-wrapper-active {\n          right: 15px;\n          opacity: 1;\n        }\n      ";
            };
            Fade.prototype.initCommonEle = function () {
                this.oContentItem = Utils.getAllEle('.yyg-content-item');
                this.oDotsItem = Utils.getAllEle('.yyg-dot-item');
                this.oDotsWrapper = Utils.getEle('.yyg-dots-wrapper');
                this.oArrowWrapper = Utils.getAllEle('.yyg-arrow-wrapper');
                this.oPrevWrapper = Utils.getEle('.yyg-arrow-prev-wrapper');
                this.oNextWrapper = Utils.getEle('.yyg-arrow-next-wrapper');
                this.oContentItemLength = this.oContentItem.length;
                this.oDotsItemLength = this.oDotsItem.length;
            };
            /**
             * 处理 自动轮播
             */
            Fade.prototype.handleAutoPlay = function () {
                var _this = this;
                var delayTime = yyg_settings.delayTime, easing = yyg_settings.easing, duringTime = yyg_settings.duringTime;
                var oContentItem = this.oContentItem;
                var oDotsItem = this.oDotsItem;
                var oContentItemLength = this.oContentItemLength;
                this.timer = setInterval(function () {
                    oContentItem.forEach(function (item, index) {
                        if (index === _this.count) {
                            Utils.setCss(item, {
                                transition: "all " + duringTime + "s " + easing,
                                'z-index': _this.count + 1,
                                opacity: 1,
                            });
                            // dot栏样式改变
                            oDotsItem.forEach(function (item, inx) {
                                inx === _this.count
                                    ? Utils.addClass(item, 'yyg-dot-item-active')
                                    : Utils.removeClass(item, 'yyg-dot-item-active');
                            });
                        }
                        else {
                            Utils.setCss(item, {
                                transition: "all " + duringTime + "s " + easing,
                                'z-index': 0,
                                opacity: 0,
                            });
                        }
                    });
                    _this.count++;
                }, delayTime);
                oContentItem.forEach(function (item) {
                    item.addEventListener('transitionend', function () {
                        if (_this.count > oContentItemLength - 1) {
                            _this.count = 0;
                        }
                    }, false);
                });
            };
            /**
             * 处理 鼠标 点击切换
             */
            Fade.prototype.handleArrowClick = function () {
                var _this = this;
                var oNextArrow = this.oNextWrapper;
                var oPrevArrow = this.oPrevWrapper;
                oNextArrow.addEventListener('click', function () {
                    _this.aidedArrowClick('next');
                }, false);
                oPrevArrow.addEventListener('click', function () {
                    _this.aidedArrowClick('prev');
                }, false);
            };
            /**
             * 箭头点击辅助函数
             * @param direction 哪个箭头
             */
            Fade.prototype.aidedArrowClick = function (direction) {
                var _this = this;
                var duringTime = yyg_settings.duringTime, easing = yyg_settings.easing;
                var oContentItem = this.oContentItem;
                var oDotsItem = this.oDotsItem;
                var oContentItemLength = this.oContentItemLength;
                clearInterval(this.timer);
                switch (direction) {
                    case 'prev':
                        this.count--;
                        this.count = this.count < 0
                            ? oContentItemLength - 1
                            : this.count;
                        break;
                    case 'next':
                        this.count++;
                        this.count = this.count > oContentItemLength - 1
                            ? 0
                            : this.count;
                        break;
                    default:
                        break;
                }
                oContentItem.forEach(function (item, index) {
                    _this.count === index
                        ? Utils
                            .setCss(item, {
                            transition: "all " + duringTime + "s " + easing,
                            opacity: 1,
                            'z-index': index,
                        })
                            .addClass(oDotsItem[index], 'yyg-dot-item-active')
                        : Utils
                            .setCss(item, {
                            transition: "all " + duringTime + "s " + easing,
                            opacity: 0,
                            'z-index': 0,
                        })
                            .removeClass(oDotsItem[index], 'yyg-dot-item-active');
                });
                this.handleAutoPlay();
            };
            /**
             * 处理 dot栏hover
             */
            Fade.prototype.handleDotsHover = function () {
                var _this = this;
                var showDots = yyg_settings.showDots, duringTime = yyg_settings.duringTime, easing = yyg_settings.easing;
                var oContentItem = this.oContentItem;
                var oDotsItem = this.oDotsItem;
                showDots && oDotsItem.forEach(function (item) {
                    var oSignId = Number(Utils.getAttr(item, 'data-id'));
                    item.addEventListener('mouseenter', function () {
                        clearInterval(_this.timer);
                        oContentItem.forEach(function (item, index) {
                            index === oSignId - 1
                                ? Utils
                                    .setCss(item, {
                                    transition: "all " + duringTime + "s " + easing,
                                    opacity: 1,
                                    'z-index': _this.count,
                                })
                                    .addClass(oDotsItem[index], 'yyg-dot-item-active')
                                : Utils
                                    .setCss(item, {
                                    transition: "all " + duringTime + "s " + easing,
                                    opacity: 0,
                                    'z-index': 0,
                                })
                                    .removeClass(oDotsItem[index], 'yyg-dot-item-active');
                        });
                    }, false);
                    item.addEventListener('mouseleave', function () {
                        // 更新索引
                        _this.count = oSignId - 1;
                        _this.handleAutoPlay();
                    }, false);
                });
            };
            /**
             * 处理 图片hover
             */
            Fade.prototype.handleImgHover = function () {
                var _this = this;
                var oArrowWrapper = this.oArrowWrapper;
                var oContentItem = this.oContentItem;
                var oPrevArrow = this.oPrevWrapper;
                var oNextArrow = this.oNextWrapper;
                oArrowWrapper.forEach(function (item) {
                    Utils.setCss(item, {
                        display: 'block',
                    });
                });
                oContentItem.forEach(function (item) {
                    item.addEventListener('mouseenter', function () {
                        clearInterval(_this.timer);
                        // 显示箭头
                        Utils
                            .addClass(oPrevArrow, 'yyg-prev-wrapper-active')
                            .addClass(oNextArrow, 'yyg-next-wrapper-active');
                    }, false);
                    item.addEventListener('mouseleave', function () {
                        // 箭头隐藏
                        Utils
                            .removeClass(oPrevArrow, 'yyg-prev-wrapper-active')
                            .removeClass(oNextArrow, 'yyg-next-wrapper-active');
                        // 自己动
                        _this.handleAutoPlay();
                    }, false);
                });
            };
            return Fade;
        }());
        Main.Fade = Fade;
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
                url: 'https://img.alicdn.com/tfs/TB1Kc14ekvoK1RjSZFwXXciCFXa-520-280.png_q90_.webp',
                target: '',
            },
        }, {
            text: 'Slide Three',
            img: {
                url: 'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
                target: '',
            },
        }, {
            text: 'Slide Four',
            img: {
                url: 'https://img.alicdn.com/tfs/TB1twNrdgDqK1RjSZSyXXaxEVXa-520-280.jpg_q90_.webp',
                target: '',
            },
        }],
    showArrows: true,
    showDots: true,
    autoPlay: true,
    easing: 'ease-in-out',
    delayTime: 2000,
    isHoverPause: true,
    duringTime: 1,
    effect: 'fade',
}).render('#app');
