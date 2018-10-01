"use strict";
/**
 * create_time: 18-9-30
 * author: yyg
 */
var Utils;
(function (Utils) {
    /**
     * 连线最小距离
     */
    Utils.LINE_MIN_DISTANCE = 100;
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
    function initCanvas() {
        var oBody = Utils.getEle('body');
        var oCanvas = Utils.getEle('#stars-line');
        var _a = Utils.getWinRange(), winHeight = _a.winHeight, winWidth = _a.winWidth;
        var pen = oCanvas && oCanvas.getContext('2d');
        Utils.setAttr(oCanvas, {
            width: winWidth,
            height: winHeight,
        });
        Utils.setCss(oCanvas, {
            display: 'block',
            'background-color': '#000',
        });
        Utils.setCss(oBody, {
            margin: 0,
            overflow: 'hidden',
        });
        return {
            pen: pen,
            cvsWidth: Number(Utils.getAttr(oCanvas, 'width')),
            cvsHeight: Number(Utils.getAttr(oCanvas, 'height')),
        };
    }
    InitCanvas.initCanvas = initCanvas;
})(InitCanvas || (InitCanvas = {}));
var _a = InitCanvas.initCanvas(), pen = _a.pen, cvsWidth = _a.cvsWidth, cvsHeight = _a.cvsHeight;
var ballArr = [];
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
/**
 * 测试
 */
function create() {
    var ball = new StarsLine.Ball({
        color: '#fff',
        radius: Utils.getRandom(2, 5),
    });
    ballArr.push(ball);
    ball.draw();
}
for (var i = 0; i < 20; i++) {
    create();
}
(function move() {
    pen.clearRect(0, 0, cvsWidth, cvsHeight);
    for (var _i = 0, ballArr_2 = ballArr; _i < ballArr_2.length; _i++) {
        var item = ballArr_2[_i];
        item.move();
        item.draw();
        item.drawLine(item);
    }
    window.requestAnimationFrame(move);
})();
