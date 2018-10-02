"use strict";
/**
 * create_time: 18-9-30
 * author: yyg
 */
/**
 * config {
 *   cvsWidth: 画布宽
 *   cvsHeight: 画布高
 *   cvsBgColor: 画布背景颜色
 *   ballNum: 星空点数量
 *   allowMouse: 是否允许鼠标交互
 *   lineColor: 连线颜色
 *   lineWidth: 连线宽度
 *   ballSpeed: 星空点移动速度 default: 1
 *   ballColor: 星空点颜色
 * }
 */
var YYG;
(function (YYG) {
    YYG.yyg_el = null;
    var yyg_cvsWidth = 500;
    var yyg_cvsHeight = 500;
    var yyg_cvsBgColor = '#000';
    var yyg_ballNum = 100;
    var yyg_allowMouse = true;
    var yyg_lineColor = '#d50';
    var yyg_lineWidth = 1;
    var yyg_ballSpeed = 1;
    var yyg_ballColor = '#fff';
    var yyg_pen = null;
    var yyg_ballArr = [];
    var yyg_flag = false;
    var yyg_MOUSE_POINT = {
        centerPoint: { x: 0, y: 0 },
    };
    /**
     * 自定义配置
     * @param options 配置项
     */
    function config(options) {
        yyg_cvsWidth = options
            .cvsWidth || Utils.getWinRange().winWidth;
        yyg_cvsHeight = options
            .cvsHeight || Utils.getWinRange().winHeight;
        yyg_cvsBgColor = options.cvsBgColor || '#000';
        yyg_ballNum = options.ballNum || 50;
        yyg_allowMouse = options.allowMouse || true;
        yyg_lineColor = options.lineColor || '#d50';
        yyg_lineWidth = options.lineWidth || 1;
        yyg_ballSpeed = options.ballSpeed || 1;
        yyg_ballColor = options.ballColor || '#fff';
        return YYG;
    }
    YYG.config = config;
    /**
     * 主渲染函数
     * @param el canvas元素
     */
    function render(el) {
        Init.initCanvas(el);
        Init.reseizeCanvas();
        Render.create(yyg_ballNum);
        Render.move();
        return YYG;
    }
    YYG.render = render;
    /**
     * 初始化函数
     */
    var Init;
    (function (Init) {
        function initCanvas(el) {
            YYG.yyg_el = Utils.getEle(el);
            yyg_pen = YYG.yyg_el.getContext('2d');
            var oBody = Utils.getEle('body');
            var _a = Utils.getWinRange(), winHeight = _a.winHeight, winWidth = _a.winWidth;
            Utils.setAttr(YYG.yyg_el, {
                width: winWidth,
                height: winHeight,
            });
            Utils.setCss(YYG.yyg_el, {
                display: 'block',
                overflow: 'hidden',
                'background-color': yyg_cvsBgColor,
            });
            Utils.setCss(oBody, {
                margin: 0,
                overflow: 'hidden',
            });
        }
        Init.initCanvas = initCanvas;
        function reseizeCanvas() {
            window.addEventListener('resize', function () {
                var _a = Utils.getWinRange(), winWidth = _a.winWidth, winHeight = _a.winHeight;
                yyg_cvsWidth = winWidth;
                yyg_cvsHeight = winHeight;
                Utils.setAttr(YYG.yyg_el, {
                    width: winWidth,
                    height: winHeight,
                });
            }, false);
        }
        Init.reseizeCanvas = reseizeCanvas;
    })(Init || (Init = {}));
    /**
     * 工具函数
     */
    var Utils;
    (function (Utils) {
        /**
         * 连线安全距离
         */
        Utils.LINE_MIN_DISTANCE = 90;
        /**
         * 获取元素
         * @param id 元素id
         */
        function getEle(sign) {
            return document.querySelector(sign) || null;
        }
        Utils.getEle = getEle;
        /**
         * 获取窗口宽高
         */
        function getWinRange() {
            return {
                winWidth: window.innerWidth,
                winHeight: window.innerHeight,
            };
        }
        Utils.getWinRange = getWinRange;
        /**
         * 设置元素属性
         * @param ele 元素
         * @param options 属性配置
         */
        function setAttr(ele, options) {
            for (var key in options) {
                ele.setAttribute(key, options[key]);
            }
            return ele;
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
            return ele;
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
    /**
     * 实体类
     */
    var StarsLine;
    (function (StarsLine) {
        /**
         * 星空线
         */
        var Line = /** @class */ (function () {
            function Line(props) {
                this.startPoint = props.startPoint;
                this.endPoint = props.endPoint;
                this.lineColor = props.lineColor || '#d50';
                this.lineWidth = props.lineWidth || 1;
                this.draw();
            }
            Line.prototype.draw = function () {
                yyg_pen.save();
                yyg_pen.beginPath();
                yyg_pen.moveTo(this.startPoint.x, this.startPoint.y);
                yyg_pen.lineTo(this.endPoint.x, this.endPoint.y);
                yyg_pen.lineCup = 'round';
                yyg_pen.lineWidth = this.lineWidth;
                yyg_pen.strokeStyle = this.lineColor;
                yyg_pen.stroke();
                yyg_pen.closePath();
                yyg_pen.restore();
            };
            return Line;
        }());
        StarsLine.Line = Line;
        /**
         * 星空点
         */
        var Ball = /** @class */ (function () {
            function Ball(props) {
                this.centerPoint = props.centerPoint || {
                    x: Utils.getRandom(0, yyg_cvsWidth),
                    y: Utils.getRandom(0, yyg_cvsHeight),
                };
                this.radius = props.radius;
                this.color = props.color;
                this.speed = props.speed || 10;
                this.distance = {
                    x: Utils.getRandom(-.5, .5),
                    y: Utils.getRandom(-.5, .5),
                };
            }
            Ball.prototype.draw = function () {
                yyg_pen.save();
                yyg_pen.beginPath();
                yyg_pen.fillStyle = this.color;
                yyg_pen.arc(this.centerPoint.x, this.centerPoint.y, this.radius, 0, Utils.getRadian(360));
                yyg_pen.fill();
                yyg_pen.closePath();
                yyg_pen.restore();
            };
            Ball.prototype.move = function () {
                this.centerPoint.x += this.distance.x;
                this.centerPoint.y += this.distance.y;
                // 碰撞检测
                this.distance.x = (this.centerPoint.x > yyg_cvsWidth
                    || this.centerPoint.x < 0)
                    ? -this.distance.x
                    : this.distance.x;
                this.distance.y = (this.centerPoint.y > yyg_cvsHeight
                    || this.centerPoint.y < 0)
                    ? -this.distance.y
                    : this.distance.y;
            };
            // 连线
            Ball.prototype.drawLine = function (outerItem) {
                for (var _i = 0, yyg_ballArr_1 = yyg_ballArr; _i < yyg_ballArr_1.length; _i++) {
                    var innerItem = yyg_ballArr_1[_i];
                    if (outerItem !== innerItem && Math.sqrt(Math.pow((outerItem.centerPoint.x - innerItem.centerPoint.x), 2) + Math.pow((outerItem.centerPoint.y - innerItem.centerPoint.y), 2)) < Utils.LINE_MIN_DISTANCE) {
                        new Line({
                            lineColor: yyg_lineColor,
                            lineWidth: yyg_lineWidth,
                            startPoint: {
                                x: outerItem.centerPoint.x,
                                y: outerItem.centerPoint.y,
                            },
                            endPoint: {
                                x: innerItem.centerPoint.x,
                                y: innerItem.centerPoint.y,
                            },
                        });
                    }
                }
            };
            return Ball;
        }());
        StarsLine.Ball = Ball;
    })(StarsLine || (StarsLine = {}));
    /**
     * 内容渲染
     */
    var Render;
    (function (Render) {
        /**
         * 创建点工厂
         */
        function createBallFactory() {
            var ball = new StarsLine.Ball({
                color: yyg_ballColor,
                radius: Utils.getRandom(1, 3),
            });
            yyg_ballArr.push(ball);
            ball.draw();
        }
        /**
         * 星空点
         * @param num 点数量
         */
        function create(num) {
            for (var i = 0; i < num; i++) {
                createBallFactory();
            }
        }
        Render.create = create;
        /**
         * 星空点移动
         */
        function move() {
            yyg_pen.clearRect(0, 0, yyg_cvsWidth, yyg_cvsHeight);
            YYG.yyg_el
                .addEventListener('mousemove', function (e) {
                yyg_flag = true;
                yyg_MOUSE_POINT.centerPoint.x = e.clientX;
                yyg_MOUSE_POINT.centerPoint.y = e.clientY;
            }, false);
            for (var _i = 0, yyg_ballArr_2 = yyg_ballArr; _i < yyg_ballArr_2.length; _i++) {
                var item = yyg_ballArr_2[_i];
                item.move();
                item.draw();
                item.drawLine(!yyg_flag ? item : yyg_MOUSE_POINT);
            }
            yyg_flag = false;
            window.requestAnimationFrame(move);
        }
        Render.move = move;
    })(Render || (Render = {}));
})(YYG || (YYG = {}));
/**
 * 测试
 */
YYG.config({
    cvsBgColor: '#000',
    cvsWidth: 500,
    cvsHeight: 500,
    ballNum: 100,
    ballColor: 'rgba(255, 255, 255, .5)',
    lineWidth: 10,
    lineColor: 'red',
}).render('#stars-line');
