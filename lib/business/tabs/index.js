"use strict";
/**
 * @name: business-tabs
 * @description 业务插件,tabs标签页
 * @author: yyg
 * @version 1.0.1
 */
/**
 * @param ele 渲染区间
 * @param dataSource 数据来源
 * @param type 页签基本样式 line|card
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
        defaultActiveKey: 1,
        tabBarGap: 5,
        tabBarStyle: {},
        tabBarLineStyle: {},
        animated: true,
        onChange: null,
        onTabClick: null,
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
    var Tab = /** @class */ (function () {
        function Tab() {
            this.init();
        }
        Tab.prototype.init = function () {
            var ele = Tabs.defaultSettings.ele;
            if (ele) {
                var el = ele;
                el.innerHTML = this.handleCreateDOMTree();
            }
        };
        Tab.prototype.handleCreateDOMTree = function () {
            var html = "\n        <div class=\"yyg-tabs-wrapper\">\n          <div class=\"yyg-tabs-main\">\n            <!-- \u5BFC\u822A\u5BB9\u5668 -->\n            <div class=\"yyg-tabs-main-bar\">\n              <div class=\"yyg-bar-nav-container\">\n                <ul class=\"yyg-nav-list-box\">\n                  <li class=\"yyg-nav-item yyg-nav-item-active\">\n                    \u7B2C\u4E00\u9879,\u9ED8\u8BA4\u9009\u4E2D\n                  </li>\n                  <li class=\"yyg-nav-list-item\">\n                    \u7B2C\u4E8C\u9879\n                  </li>\n                </ul>\n                <div class=\"yyg-nav-line-box\">\n                  <span class=\"yyg-nav-line\"></span>\n                </div>\n              </div>\n            </div>\n            <!-- \u5185\u5BB9\u5BB9\u5668 -->\n            <div class=\"yyg-tabs-main-content\">\n              <div class=\"yyg-content-tabpane-container\">\n                <ul class=\"yyg-tabpane-list\">\n                  <li class=\"yyg-tabpane-item yyg-tabpane-item-active\">\n                    \u5185\u5BB9\u7B2C\u4E00\u9879, \u9ED8\u8BA4\u663E\u793A\n                  </li>\n                  <li class=\"yyg-tabpane-item\">\n                    \u5185\u5BB9\u7B2C\u4E8C\u9879\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      ";
            return html;
        };
        return Tab;
    }());
})(Tabs || (Tabs = {}));
var tabs = Tabs.render({
    dataSource: [{
            tabPaneTitle: {
                icon: '',
                text: '标题一',
            },
            tabPaneContent: "\n      <h3>\u5185\u5BB9\u4E00\u5185\u5BB9\u4E00.</h3>\n    ",
        }, {
            tabPaneTitle: {
                icon: '',
                text: '标题二',
            },
            tabPaneContent: "\n      <h3>\u5185\u5BB9\u4E8C\u5185\u5BB9\u4E8C.</h3>\n    ",
        }, {
            tabPaneTitle: {
                icon: '',
                text: '标题一',
            },
            tabPaneContent: "\n      <h3>\u5185\u5BB9\u4E09\u5185\u5BB9\u4E09.</h3>\n    ",
        }],
    ele: '#app',
});
