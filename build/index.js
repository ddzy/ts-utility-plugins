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
    YYG.yyg_cvsWidth = 500;
    YYG.yyg_cvsHeight = 500;
    YYG.yyg_cvsBgColor = '#000';
    YYG.yyg_ballNum = 50;
    YYG.yyg_allowMouse = true;
    YYG.yyg_lineColor = '#d50';
    YYG.yyg_lineWidth = 1;
    YYG.yyg_ballSpeed = 1;
    YYG.yyg_ballColor = '#fff';
    /**
     * 自定义配置
     * @param options 配置项
     */
    function config(options) {
        YYG.yyg_cvsWidth = options.cvsWidth || 500;
        YYG.yyg_cvsHeight = options.cvsHeight || 500;
        YYG.yyg_cvsBgColor = options.cvsBgColor || '#000';
        YYG.yyg_ballNum = options.ballNum || 50;
        YYG.yyg_allowMouse = options.allowMouse || true;
        YYG.yyg_lineColor = options.lineColor || '#d50';
        YYG.yyg_lineWidth = options.lineWidth || 1;
        YYG.yyg_ballSpeed = options.ballSpeed || 1;
        YYG.yyg_ballColor = options.ballColor || '#fff';
    }
    YYG.config = config;
    /**
     * 主渲染函数
     * @param el canvas元素
     */
    function render(el) {
        YYG.yyg_el = Utils.getEle(el);
        Render.create(YYG.yyg_ballNum);
        Render.move();
    }
    YYG.render = render;
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
    var InitCanvas;
    (function (InitCanvas) {
        InitCanvas.oCanvas = Utils
            .getEle('#stars-line');
        function initCanvas() {
            var oBody = Utils.getEle('body');
            var _a = Utils.getWinRange(), winHeight = _a.winHeight, winWidth = _a.winWidth;
            var pen = InitCanvas.oCanvas && InitCanvas.oCanvas.getContext('2d');
            Utils.setAttr(InitCanvas.oCanvas, {
                width: winWidth,
                height: winHeight,
            });
            Utils.setCss(InitCanvas.oCanvas, {
                display: 'block',
                'background-color': '#000',
            });
            Utils.setCss(oBody, {
                margin: 0,
                overflow: 'hidden',
            });
            return {
                pen: pen,
                cvsWidth: Number(Utils.getAttr(InitCanvas.oCanvas, 'width')),
                cvsHeight: Number(Utils.getAttr(InitCanvas.oCanvas, 'height')),
            };
        }
        InitCanvas.initCanvas = initCanvas;
        function resizeCanvas() {
            window.addEventListener('resize', function () {
                var _a = Utils.getWinRange(), winWidth = _a.winWidth, winHeight = _a.winHeight;
                Utils.setAttr(InitCanvas.oCanvas, {
                    width: winWidth,
                    height: winHeight,
                });
            }, false);
        }
        InitCanvas.resizeCanvas = resizeCanvas;
    })(InitCanvas || (InitCanvas = {}));
    var _a = InitCanvas.initCanvas(), pen = _a.pen, cvsWidth = _a.cvsWidth, cvsHeight = _a.cvsHeight;
    InitCanvas.resizeCanvas();
    var ballArr = [];
    var flag = false;
    var MOUSE_POINT = { centerPoint: { x: 0, y: 0 } };
    var StarsLine;
    (function (StarsLine) {
        /**
         * 星空线
         */
        var Line = /** @class */ (function () {
            function Line(props) {
                this.startPoint = props.startPoint;
                this.endPoint = props.endPoint;
                this.color = props.color;
                this.draw();
            }
            Line.prototype.draw = function () {
                pen.save();
                pen.beginPath();
                pen.moveTo(this.startPoint.x, this.startPoint.y);
                pen.lineTo(this.endPoint.x, this.endPoint.y);
                pen.lineCup = 'round';
                pen.strokeStyle = this.color;
                pen.stroke();
                pen.closePath();
                pen.restore();
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
                    x: Utils.getRandom(0, cvsWidth),
                    y: Utils.getRandom(0, cvsHeight),
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
                pen.save();
                pen.beginPath();
                pen.fillStyle = this.color;
                pen.arc(this.centerPoint.x, this.centerPoint.y, this.radius, 0, Utils.getRadian(360));
                pen.fill();
                pen.closePath();
                pen.restore();
            };
            Ball.prototype.move = function () {
                this.centerPoint.x += this.distance.x;
                this.centerPoint.y += this.distance.y;
                // 碰撞检测
                this.distance.x = (this.centerPoint.x > cvsWidth
                    || this.centerPoint.x < 0)
                    ? -this.distance.x
                    : this.distance.x;
                this.distance.y = (this.centerPoint.y > cvsHeight
                    || this.centerPoint.y < 0)
                    ? -this.distance.y
                    : this.distance.y;
            };
            // 连线
            Ball.prototype.drawLine = function (outerItem) {
                for (var _i = 0, ballArr_1 = ballArr; _i < ballArr_1.length; _i++) {
                    var innerItem = ballArr_1[_i];
                    if (outerItem !== innerItem && Math.sqrt(Math.pow((outerItem.centerPoint.x - innerItem.centerPoint.x), 2) + Math.pow((outerItem.centerPoint.y - innerItem.centerPoint.y), 2)) < Utils.LINE_MIN_DISTANCE) {
                        new Line({
                            color: '#d50',
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
    var Render;
    (function (Render) {
        /**
         * 创建点工厂
         */
        function createBallFactory() {
            var ball = new StarsLine.Ball({
                color: '#fff',
                radius: Utils.getRandom(1, 3),
            });
            ballArr.push(ball);
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
            pen.clearRect(0, 0, cvsWidth, cvsHeight);
            InitCanvas
                .oCanvas
                .addEventListener('mousemove', function (e) {
                flag = true;
                MOUSE_POINT.centerPoint.x = e.clientX;
                MOUSE_POINT.centerPoint.y = e.clientY;
            }, false);
            for (var _i = 0, ballArr_2 = ballArr; _i < ballArr_2.length; _i++) {
                var item = ballArr_2[_i];
                item.move();
                item.draw();
                item.drawLine(!flag ? item : MOUSE_POINT);
            }
            flag = false;
            window.requestAnimationFrame(move);
        }
        Render.move = move;
    })(Render || (Render = {}));
})(YYG || (YYG = {}));
YYG.render('#stars-line');
console.log(YYG);
