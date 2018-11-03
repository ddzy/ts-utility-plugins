"use strict";
/**
 * @name: business-simple-lodash 类lodash库
 * @author: yyg
 * @version 1.0.0
 */
var lodash;
(function (lodash) {
    var _Utils;
    (function (_Utils) {
        function _isArray(obj) {
            return Array.isArray(obj);
        }
        _Utils._isArray = _isArray;
    })(_Utils = lodash._Utils || (lodash._Utils = {}));
    var _Array;
    (function (_Array) {
        /**
         * 创建一个元素数组，将元素分成大小的长度。如果数组无法均匀分割，
         * 则最终的块将是剩余的元素。
         * @param arr 数组
         * @param size 分成的块
         * @returns 新的数组
         */
        function chunk(arr, size) {
            if (size === void 0) { size = 1; }
            if (!_Utils._isArray(arr) || arr.length === 0) {
                return [];
            }
            var newArr = [];
            var i = -1;
            while (++i < arr.length) {
                i % size === 0
                    && newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }
        _Array.chunk = chunk;
    })(_Array = lodash._Array || (lodash._Array = {}));
})(lodash || (lodash = {}));
console.log(lodash._Array.chunk([1, 2, 3, 4], 1));
