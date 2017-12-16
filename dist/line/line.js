(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../utils/utilsMethod', '../toolTipLayer/toolTipLayer', '../toolTipLayer/toolTipList', '../legend/legend', "d3", './lineStyle.scss'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../utils/utilsMethod'), require('../toolTipLayer/toolTipLayer'), require('../toolTipLayer/toolTipList'), require('../legend/legend'), require("d3"), require('./lineStyle.scss'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.utilsMethod, global.toolTipLayer, global.toolTipList, global.legend, global.d3, global.lineStyle);
        global.line = mod.exports;
    }
})(this, function (exports, _utilsMethod, _toolTipLayer, _toolTipList, _legend, d3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _toolTipLayer2 = _interopRequireDefault(_toolTipLayer);

    var _toolTipList2 = _interopRequireDefault(_toolTipList);

    var _legend2 = _interopRequireDefault(_legend);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Line = function () {
        //参数说明
        //option {}
        // width,height,ele,
        function Line(option) {
            _classCallCheck(this, Line);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(option)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    this[key] = value;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.svg = null;
            this.layerg = null;
            this.margin = 30;
            this.gHeight = this.height - this.margin;
            this.gWidth = this.width - this.margin;
            var toolTipLayers = _toolTipLayer2.default;
            this.toolTip = toolTipLayers.tipLayer;
            this.creatSvg();
            this.creatG();
            this.creatRact();
            _legend2.default.call(this, _utilsMethod.chartColor);
        }

        _createClass(Line, [{
            key: 'creatSvg',
            value: function creatSvg() {

                this.svg = d3.select(this.ele).append('svg').attr("width", this.width).attr("height", this.height);
                // 外层 g
                this.layerg = this.svg.append('g').attr('transform', 'translate(' + (this.gHeight / 2 + this.margin / 2) + ',' + (this.gHeight / 2 + this.margin / 2) + ')');
            }
        }, {
            key: 'creatG',
            value: function creatG() {}
        }, {
            key: 'creatRact',
            value: function creatRact() {}
        }]);

        return Line;
    }();

    var Lines = new Line({
        ele: document.getElementById('line'),
        width: 500,
        height: 500,
        legend: {
            data: ["一月", "二月", "三月", "四月", "五月"]
        },
        series: [{
            name: '北京',
            data: [{ value: 110, "name": "一月" }, { value: 130, "name": "二月" }, { value: 310, "name": "三月" }, { value: 330, "name": "四月" }, { value: 350, "name": "五月" }, { value: 140, "name": "六月" }, { value: 110, "name": "七月" }]
        }, {
            name: '上海',
            data: [{ value: 10, "name": "一月" }, { value: 330, "name": "二月" }, { value: 640, "name": "三月" }, { value: 230, "name": "四月" }, { value: 150, "name": "五月" }, { value: 160, "name": "六月" }, { value: 210, "name": "七月" }]
        }]
    });
    exports.default = Line;
});