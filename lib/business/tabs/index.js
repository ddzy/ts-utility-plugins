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
})(Tabs || (Tabs = {}));
var tabs = Tabs.render({
    dataSource: [],
    ele: '#app',
});
console.log(tabs);
