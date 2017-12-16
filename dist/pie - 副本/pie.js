(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../utils/utilsMethod', '../toolTipLayer/toolTipLayer', '../toolTipLayer/toolTipList', '../legend/legend', "d3", './pieStyle.scss'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../utils/utilsMethod'), require('../toolTipLayer/toolTipLayer'), require('../toolTipLayer/toolTipList'), require('../legend/legend'), require("d3"), require('./pieStyle.scss'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.utilsMethod, global.toolTipLayer, global.toolTipList, global.legend, global.d3, global.pieStyle);
        global.pie = mod.exports;
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

    var Pie = function () {
        //参数说明
        //option {}
        // width,height,ele,
        function Pie(option) {
            _classCallCheck(this, Pie);

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
            this.margin = 250;
            this.gHeight = this.height - this.margin;
            this.gWidth = this.width - this.margin;
            this.radius = Math.min(this.gHeight, this.gWidth) / 2;
            var toolTipLayers = _toolTipLayer2.default;
            this.toolTip = toolTipLayers.tipLayer;
            this.creatSvg();
            this.creatG();
            this.creatRact();
            _legend2.default.call(this, _utilsMethod.chartColor);
        }

        _createClass(Pie, [{
            key: 'creatSvg',
            value: function creatSvg() {

                this.svg = d3.select(this.ele).append('svg').attr("width", this.width).attr("height", this.height);
                // 外层 g
                this.layerg = this.svg.append('g').attr('transform', 'translate(' + (this.gHeight / 2 + this.margin / 2) + ',' + (this.gHeight / 2 + this.margin / 2) + ')');
            }
        }, {
            key: 'creatG',
            value: function creatG() {
                var outerRadius = this.gHeight / 2 - 20,
                    innerRadius = outerRadius / 3,
                    cornerRadius = 10;
                var pie = d3.pie().value(function (d) {
                    return d.value;
                });

                var arc = d3.arc().outerRadius(outerRadius).innerRadius(0);
                var outerArc = d3.arc().outerRadius(outerRadius * 2.4).innerRadius(0);
                var _this = this;
                function arcTween(outerRadius, delay) {
                    d3.select(this).transition().delay(delay).attrTween("d", function (d) {
                        var fff = d3.interpolate(d.outerRadius, outerRadius);
                        var arcs = d3.arc();
                        return function (t) {
                            d.outerRadius = fff(t);return arcs(d);
                        };
                    });
                }
                // 主图区域 
                this.g = this.layerg.selectAll(".arc").data(pie(_this.series[0].data)).enter().append("g").attr("class", "arc");

                this.g.append("polyline").transition().duration(400).attr("points", function (d) {
                    var pos = arc.centroid(d);
                    var outPos = outerArc.centroid(d);
                    var endPos = JSON.parse(JSON.stringify(outPos));
                    var end = [endPos[0] > 0 ? endPos[0] + 40 : endPos[0] - 40, endPos[1]];
                    return [pos, outPos, end];
                }).style('stroke', function (d, i) {
                    return _utilsMethod.chartColor[i];
                });

                this.g.append("path").each(function (d) {
                    d.outerRadius = outerRadius;d.innerRadius = 0;
                }).attr("d", arc).style("fill", function (d, i) {
                    return _utilsMethod.chartColor[i];
                }).on('mouseover', function (d, i) {
                    _this.toolTip.style('display', 'block').html((0, _toolTipList2.default)(d.data)).style('top', function () {
                        var boundarys = (0, _utilsMethod.boundary)(d3.event.layerX, d3.event.layerY, document.getElementsByClassName('tooltip-cont')[0]);
                        return boundarys.y + 'px';
                    }).style('left', function () {
                        var boundarys = (0, _utilsMethod.boundary)(d3.event.layerX, d3.event.layerY, document.getElementsByClassName('tooltip-cont')[0]);
                        return boundarys.x + 'px';
                    });
                    arcTween.call(this, outerRadius + 10, 0);
                    // d3.select(this).transition().duration(750).attrTween("d", function() {
                    //     var f = d3.interpolate(outerRadius, outerRadius+20);
                    //     var arcs = d3.arc();
                    //     return function(t) { 
                    //         d.outerRadius = f(t);
                    //         console.log(arc(d))
                    //         return arcs(d); 
                    //     };
                    // });
                }).on('mousemove', function (d, i) {
                    var boundarys = (0, _utilsMethod.boundary)(d3.event.layerX, d3.event.layerY, document.getElementsByClassName('tooltip-cont')[0]);
                    _this.toolTip.transition().duration(50).style('top', boundarys.y + 'px').style('left', boundarys.x + 'px');
                }).on('mouseout', function (d) {
                    _this.toolTip.style('display', 'none');
                    arcTween.call(this, outerRadius, 0);
                });

                this.g.append("text").attr("text-anchor", "middle").attr("transform", function (d) {
                    var outPos = outerArc.centroid(d);
                    var end = [outPos[0] > 0 ? outPos[0] + 60 : outPos[0] - 60, outPos[1]];
                    return 'translate(' + end[0] + ',' + end[1] + ')';
                }).text(function (d) {
                    return d.value;
                }).style('stroke', function (d, i) {
                    return _utilsMethod.chartColor[i];
                });
            }
        }, {
            key: 'creatRact',
            value: function creatRact() {
                var height = this.gHeight;
                var _this = this;
                var rectWidth = 30;
                this.rects = this.g.selectAll("rect").data(function (d) {
                    return d;
                }).enter().append("rect");
            }
        }]);

        return Pie;
    }();

    var Pies = new Pie({
        ele: document.getElementById('pie'),
        width: 500,
        height: 500,
        legend: {
            data: ["一月", "二月", "三月", "四月", "五月"]
        },
        series: [{
            data: [{ value: 335, name: '一月' }, { value: 310, name: '二月' }, { value: 234, name: '三月' }, { value: 135, name: '四月' }, { value: 1548, name: '五月' }]
        }]
    });
    exports.default = Pie;
});