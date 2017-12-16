(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../toolTipLayer/toolTipLayer', '../toolTipLayer/toolTipList', '../utils/utilsMethod', '../legend/legend', "d3", './barStyle.scss'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../toolTipLayer/toolTipLayer'), require('../toolTipLayer/toolTipList'), require('../utils/utilsMethod'), require('../legend/legend'), require("d3"), require('./barStyle.scss'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.toolTipLayer, global.toolTipList, global.utilsMethod, global.legend, global.d3, global.barStyle);
        global.bars = mod.exports;
    }
})(this, function (exports, _toolTipLayer, _toolTipList, _utilsMethod, _legend, d3) {
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

    var Bar = function () {
        //参数说明
        //option {}
        // width,height,ele,
        function Bar(option) {
            _classCallCheck(this, Bar);

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
            this.rects = null;
            this.x = null;
            this.margin = 60;
            this.gHeight = this.height - this.margin;
            this.gWidth = this.width - this.margin;
            var toolTipLayers = _toolTipLayer2.default;
            this.toolTip = toolTipLayers.tipLayer;
            this.creatSvg();
            this.creatG();
            this.creatRact();
        }

        _createClass(Bar, [{
            key: 'creatSvg',
            value: function creatSvg() {
                this.svg = d3.select(this.ele).append('svg').attr("width", this.width).attr("height", this.height);
                // 外层 g
                this.layerg = this.svg.append('g').attr('transform', 'translate(' + this.margin / 2 + ',' + this.margin / 2 + ')');
            }
        }, {
            key: 'creatG',
            value: function creatG() {

                var _this = this;

                // y轴 
                var max = d3.max(this.series, function (series) {
                    return d3.max(series.data, function (d) {
                        return d.y;
                    });
                });
                var min = d3.min(this.series, function (series) {
                    return d3.min(series.data, function (d) {
                        return d.y;
                    });
                });
                this.y = d3.scaleLinear().domain([0, max]).range([this.gHeight, 0]);

                var yAxis = d3.axisLeft().scale(this.y);
                this.layerg.append("g").attr("class", "y axis").attr("transform", "translate(0,0)").call(yAxis);
                // x轴
                this.x = d3.scaleBand().range([0, this.gWidth]).padding(0.1);
                this.x.domain(this.categories.map(function (d) {
                    return d.name;
                }));

                this.x1 = d3.scaleBand().range([0, this.x.bandwidth()]).padding(0.1);
                this.x1.domain(d3.range(this.series.length));

                var xAxis = d3.axisBottom().scale(this.x);
                this.layerg.append("g").attr("class", "x axis").attr("transform", 'translate(0,' + this.gHeight + ')').call(xAxis);

                // 主图区域 
                this.g = this.layerg.selectAll(".layer").data(this.series).enter().append("g").style("fill", function (d, i) {
                    return _utilsMethod.chartColor[i];
                }).attr("transform", function (d, i) {
                    return "translate(" + _this.x1(i) + ",0)";
                }).attr("class", "layer");

                _legend2.default.call(this, _utilsMethod.chartColor);
            }
        }, {
            key: 'creatRact',
            value: function creatRact() {
                var height = this.gHeight;
                var _this = this;
                var rectWidth = 30;
                this.rects = this.g.selectAll("rect")
                // .data(function(d,i){
                //     d.map(function(b){
                //         return b.y;
                //     });
                //     return d;
                // })
                .data(function (d) {
                    return d.data;
                }).enter().append("rect").attr("width", _this.x1.bandwidth()).attr("x", function (d) {
                    return _this.x(d.name);
                }).attr("y", function (d) {
                    return _this.y(d.y);
                }).attr('height', function (d) {
                    return height - _this.y(d.y);
                }).on('mouseover', function (d, i) {
                    _this.toolTip.style('display', 'block').html((0, _toolTipList2.default)(d)).style('top', function () {
                        var boundarys = (0, _utilsMethod.boundary)(d3.event.layerX, d3.event.layerY, document.getElementsByClassName('tooltip-cont')[0]);
                        return boundarys.y + 'px';
                    }).style('left', function () {
                        var boundarys = (0, _utilsMethod.boundary)(d3.event.layerX, d3.event.layerY, document.getElementsByClassName('tooltip-cont')[0]);
                        return boundarys.x + 'px';
                    });
                }).on('mousemove', function (d, i) {
                    var boundarys = (0, _utilsMethod.boundary)(d3.event.layerX, d3.event.layerY, document.getElementsByClassName('tooltip-cont')[0]);
                    _this.toolTip.transition().duration(50).style('top', boundarys.y + 'px').style('left', boundarys.x + 'px');
                }).on('mouseout', function (d) {
                    _this.toolTip.style('display', 'none');
                });
            }
        }]);

        return Bar;
    }();

    var Bars = new Bar({
        ele: document.getElementById('bar'),
        width: 400,
        height: 400,
        legend: {
            data: ["北京", "上海"]
        },
        categories: [{ "name": "一月" }, { "name": "二月" }, { "name": "三月" }, { "name": "四月" }, { "name": "五月" }, { "name": "六月" }, { "name": "七月" }],
        series: [{
            name: '北京',
            data: [{ y: 110, "name": "一月" }, { y: 130, "name": "二月" }, { y: 310, "name": "三月" }, { y: 330, "name": "四月" }, { y: 350, "name": "五月" }, { y: 140, "name": "六月" }, { y: 110, "name": "七月" }]
        }, {
            name: '上海',
            data: [{ y: 10, "name": "一月" }, { y: 330, "name": "二月" }, { y: 640, "name": "三月" }, { y: 230, "name": "四月" }, { y: 150, "name": "五月" }, { y: 160, "name": "六月" }, { y: 210, "name": "七月" }]
        }]
    });
    exports.default = Bar;
});