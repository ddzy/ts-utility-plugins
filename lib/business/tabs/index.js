"use strict";
/**
 * @name: business-tabs
 * @description 业务插件,tabs标签页
 * @author: yyg
 * @version 1.0.6
 */
/**
 * @param ele 渲染区间
 * @param dataSource 数据来源
 * @param type 页签基本样式 line|card
 * @param mouse 切换属性 mouseenter | click
 * @param defaultActiveKey 初始化选中面板的key
 * @param tabBarGap tabs之间的间隙
 * @param tabBarStyle tab bar的样式对象
 * @param tabBarLineStyle tab bar下面的线条样式
 * @param onChange 切换面板的回调
 * @param onTabClick tab被点击的回调
 * @param animated 是否使用动画
 */
var Tabs;
(function (Tabs) {
    Tabs.defaultSettings = {
        ele: null,
        dataSource: [],
        type: 'line',
        mouse: 'mouseenter',
        defaultActiveKey: 1,
        tabBarGap: 5,
        tabBarStyle: {},
        tabBarLineStyle: {},
        animated: true,
        onChange: Function,
        onTabClick: Function,
    };
    function render(_props) {
        _aidedInitSettings(_props);
        _aidedInitTab();
        return Tabs;
    }
    Tabs.render = render;
    function _aidedInitSettings(_props) {
        for (var key in _props) {
            if (_props.hasOwnProperty(key)) {
                var element = _props[key];
                key === 'ele'
                    ? _aidedInitEle(element)
                    : Reflect.set(Tabs.defaultSettings, key, element);
            }
        }
    }
    function _aidedInitEle(key) {
        var ele = Utils.getEle(key);
        if (ele) {
            Reflect.set(Tabs.defaultSettings, 'ele', ele);
        }
        else {
            throw new Error('Please enter an exist HTMLElement!');
        }
    }
    function _aidedInitTab() {
        return new Tab();
    }
    var Utils;
    (function (Utils) {
        function getEle(el) {
            return document.querySelector(el);
        }
        Utils.getEle = getEle;
        function getAllEle(el) {
            return document.querySelectorAll(el);
        }
        Utils.getAllEle = getAllEle;
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
        function removeClass(el) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            args.forEach(function (item) {
                el.classList.remove(item);
            });
            return Utils;
        }
        Utils.removeClass = removeClass;
        function addClass(el) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            args.forEach(function (item) {
                el.classList.add(item);
            });
            return Utils;
        }
        Utils.addClass = addClass;
    })(Utils || (Utils = {}));
    var Tab = /** @class */ (function () {
        function Tab() {
            this.init();
        }
        Tab.prototype.init = function () {
            this.handleInitEle();
            this.handleSetStyle();
            this.handleMouse();
        };
        Tab.prototype.handleInitEle = function () {
            var ele = Tabs.defaultSettings.ele;
            if (ele) {
                var el = ele;
                el.innerHTML = this.handleCreateDOMTree();
            }
        };
        Tab.prototype.handleCreateDOMTree = function () {
            var _a = Tabs.defaultSettings, dataSource = _a.dataSource, type = _a.type;
            var navStr = '';
            var contentStr = '';
            if (dataSource.length !== 0) {
                dataSource.forEach(function (item, index) {
                    navStr += "\n            <li class=\"yyg-nav-item " + (type === 'line' ? 'yyg-nav-item-line' : 'yyg-nav-item-card') + "\" data-id=" + (index + 1) + ">\n              <div class=\"yyg-nav-item-icon\">\n                " + item.tabPaneTitle.icon + "\n              </div>\n              <div class=\"yyg-nav-item-text\">\n                " + item.tabPaneTitle.text + "\n              </div>\n            </li>\n          ";
                    contentStr += "\n            <li class=\"yyg-tabpane-item\" data-id=" + (index + 1) + ">\n              <div class=\"yyg-tabpane-item-content\">\n                " + item.tabPaneContent.text + "\n              </div>\n            </li>\n          ";
                });
            }
            var navBottomLineStr = "\n        <div class=\"yyg-nav-line-box\">\n          <span class=\"yyg-nav-line\"></span>\n        </div>\n      ";
            var html = "\n        <div class=\"yyg-tabs-wrapper\">\n          <div class=\"yyg-tabs-main\">\n            <!-- \u5BFC\u822A\u5BB9\u5668 -->\n            <div class=\"yyg-tabs-main-bar\">\n              <div class=\"yyg-bar-nav-container\">\n                <ul class=\"yyg-nav-list-box\">\n                  " + navStr + "\n                </ul>\n                " + (type === 'line' ? navBottomLineStr : '') + "\n              </div>\n            </div>\n            <!-- \u5185\u5BB9\u5BB9\u5668 -->\n            <div class=\"yyg-tabs-main-content\">\n              <div class=\"yyg-content-tabpane-container\">\n                <ul class=\"yyg-tabpane-list\">\n                  " + contentStr + "\n                </ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      ";
            return html;
        };
        Tab.prototype.handleSetStyle = function () {
            var _a = Tabs.defaultSettings, tabBarGap = _a.tabBarGap, dataSource = _a.dataSource, tabBarStyle = _a.tabBarStyle, tabBarLineStyle = _a.tabBarLineStyle;
            var oIconBoxArr = Utils
                .getAllEle('.yyg-nav-item-icon');
            var oNavItem = Utils
                .getEle('.yyg-nav-item');
            var oStyle = Utils
                .getEle('style');
            if (!oStyle) {
                var oHead = Utils.getEle('head');
                oStyle = document.createElement('style');
                oHead.appendChild(oStyle);
            }
            dataSource.forEach(function (item, index) {
                if (item.tabPaneTitle.icon) {
                    oIconBoxArr[index].innerHTML = item.tabPaneTitle.icon;
                    Utils.setCss(oIconBoxArr[index], {
                        flex: .6,
                        'text-align': 'right',
                    });
                }
            });
            oStyle.innerText += "\n        .yyg-tabs-wrapper {\n          width: 100%;\n          height: 100%;\n        }\n        .yyg-tabs-main {\n          box-sizing: border-box;\n          padding: 10px 0;\n        }\n        .yyg-tabs-main-bar {\n          \n        }\n        .yyg-bar-nav-container {\n          box-sizing: border-box;\n          height: 50px;\n          border-bottom: 1px solid #ccc;\n          line-height: 47px;\n        }\n        .yyg-nav-list-box {\n          display: flex;\n        }\n        .yyg-nav-item {\n          flex: 1;\n          display: flex;\n          margin-right: " + tabBarGap + "px;\n          text-align: center;\n          color: " + (tabBarStyle['color'] || '#5a5a5a') + ";\n          font-size: " + (tabBarStyle['font-size'] || 14) + "px;\n          cursor: pointer;\n          user-select: none;\n          transition: all .3s ease-in;\n        }\n        /*\n          bar-item\n        */\n        .yyg-nav-item-icon {\n          flex: " + 0 + ";\n          font-size: 12px;\n        }\n        .yyg-nav-item-text {\n          flex: 1;\n        }\n        .yyg-nav-line-box {\n          width: " + (oNavItem.clientWidth / dataSource.length - tabBarGap) + "px;\n          height: " + (tabBarLineStyle['height'] || 3) + "px;\n          background-color: " + (tabBarLineStyle['background-color'] || '#1890ff') + ";\n          transition: all .3s ease-in;\n        }\n\n        /* \u5185\u5BB9\u6846 */\n        .yyg-tabs-main-bar {\n\n        }\n        .yyg-content-tabpane-container {\n          overflow: hidden;\n          box-sizing: border-box;\n          padding: 5px 0;\n        }\n        .yyg-tabpane-list {\n          width: " + dataSource.length * 100 + "%;\n        }\n        .yyg-tabpane-item {\n          float: left;\n          width: " + 100 / dataSource.length + "%;\n        }\n\n        /* type */\n        .yyg-nav-item-line {\n\n        }\n        .yyg-nav-item-card {\n          border: 1px solid #e8e8e8;\n          border-bottom: 0;\n          border-radius: 4px 4px 0 0;\n          background-color: " + (tabBarStyle['background-color'] || '#fafafa') + ";\n        }\n\n        /* \u6D3B\u52A8\u6837\u5F0F\u7C7B */\n        .yyg-nav-item-card-active {\n          background-color: " + (tabBarStyle['backgroundColorActive'] || '#fff') + ";\n          color: " + (tabBarStyle['colorActive'] || '#1890ff') + ";\n        }\n        .yyg-nav-item-line-active {\n          color: " + (tabBarStyle['colorActive'] || '#1890ff') + ";\n        }\n\n        /* animated */\n        .yyg-tabpane-list-animated {\n          transition: all .2s ease-in-out;\n        }\n      ";
        };
        Tab.prototype.handleMouse = function () {
            var mouse = Tabs.defaultSettings.mouse, tabBarGap = Tabs.defaultSettings.tabBarGap, type = Tabs.defaultSettings.type, defaultActiveKey = Tabs.defaultSettings.defaultActiveKey, animated = Tabs.defaultSettings.animated, onTabClick = Tabs.defaultSettings.onTabClick;
            var paneList = Utils
                .getEle('.yyg-tabpane-list');
            var barItems = Utils
                .getAllEle('.yyg-nav-item');
            var lineBox = Utils
                .getEle('.yyg-nav-line-box');
            // 判断不同type不同active样式
            var whichTypeActiveClass = type === 'line'
                ? 'yyg-nav-item-line-active'
                : 'yyg-nav-item-card-active';
            // 是否具有动画效果
            var whichAnimatedClass = animated
                ? 'yyg-tabpane-list-animated'
                : 'yyg-tabpane-list-noanimated';
            lineBox && Utils.setCss(lineBox, {
                transform: "translateX(" + (lineBox.clientWidth * (defaultActiveKey - 1) + tabBarGap * (defaultActiveKey - 1)) + "px)",
            });
            Utils
                .addClass(barItems[defaultActiveKey - 1], whichTypeActiveClass)
                .setCss(paneList, {
                transform: "translateX(" + -(defaultActiveKey - 1) * 500 + "px)",
            })
                .addClass(paneList, whichAnimatedClass);
            barItems.forEach(function (item, index) {
                item.addEventListener(mouse, function () {
                    // 钩子
                    onTabClick && onTabClick();
                    barItems.forEach(function (ite) {
                        Utils.removeClass(ite, whichTypeActiveClass);
                    });
                    lineBox && Utils.setCss(lineBox, {
                        transform: "translateX(" + (lineBox.clientWidth * index + tabBarGap * index) + "px)",
                    });
                    Utils
                        .addClass(item, whichTypeActiveClass)
                        .setCss(paneList, {
                        transform: "translateX(" + -index * 500 + "px)",
                    });
                });
            });
        };
        return Tab;
    }());
})(Tabs || (Tabs = {}));
var tabs = Tabs.render({
    dataSource: [{
            tabPaneTitle: {
                icon: '<i class="icon iconfont icon-hanbao"></i>',
                text: '标题一',
            },
            tabPaneContent: {
                text: "\n        <ol>\n          <li>todo1</li>\n          <li>todo2</li>\n          <li>todo3</li>\n        </ol>\n      ",
            },
        }, {
            tabPaneTitle: {
                icon: '<i class="icon iconfont icon-dianpu"></i>',
                text: '标题二',
            },
            tabPaneContent: {
                text: "\n        <h3>\u5185\u5BB9\u4E8C\u5185\u5BB9\u4E8C.</h3>\n      ",
            },
        }, {
            tabPaneTitle: {
                icon: '',
                text: '标题三',
            },
            tabPaneContent: {
                text: "\n        <h3>\u5185\u5BB9\u4E09\u5185\u5BB9\u4E09.</h3>\n      ",
            },
        }, {
            tabPaneTitle: {
                icon: '',
                text: '标题四',
            },
            tabPaneContent: {
                text: "\n        <h3>\u5185\u5BB9\u56DB\u5185\u5BB9\u56DB.</h3>\n      ",
            },
        }],
    ele: '#app',
    tabBarGap: 5,
    type: 'line',
    mouse: 'click',
    defaultActiveKey: 2,
    animated: true,
    tabBarStyle: {
        "background-color": '#190',
        backgroundColorActive: '#369',
        colorActive: '#fff',
        "font-family": 'Monaco',
    },
    tabBarLineStyle: {
        height: 10,
        'background-color': '#d50',
    },
    onTabClick: function () {
        console.log(2);
    },
});
