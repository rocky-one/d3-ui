(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.bar = mod.exports;
    }
})(this, function () {
    "use strict";

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
            this.g = null;
            this.rects = null;
            this.x = null;
            this.margin = 60;
            this.gHeight = this.height - this.margin;
            this.gWidth = this.width - this.margin;
            this.creatSvg();
            this.creatG();
            this.creatRact();
        }

        _createClass(Bar, [{
            key: "creatSvg",
            value: function creatSvg() {
                this.svg = d3.select(this.ele).append('svg').attr("width", this.width).attr("height", this.height).attr('transform', 'translate(340,50)');
            }
        }, {
            key: "creatG",
            value: function creatG() {

                // 主
                this.g = this.svg.append('g').attr('transform', "translate(" + this.margin / 2 + "," + this.margin / 2 + ")");
                // y轴
                this.y = d3.scaleLinear().domain([0, d3.max(this.data, function (d) {
                    return d.y;
                })]).range([this.gHeight, 0]);

                var yAxis = d3.axisLeft().scale(this.y);
                this.g.append("g").attr("class", "y axis").attr("transform", "translate(0,0)").call(yAxis);
                // x轴
                this.x = d3.scaleBand().range([0, this.gWidth]).padding(0.3);
                this.x.domain(this.data.map(function (d) {
                    return d.name;
                })); //this.data.map(function(d) { return d.name; })

                var xAxis = d3.axisBottom().scale(this.x);
                this.g.append("g").attr("class", "axis").attr("transform", "translate(0," + this.gHeight + ")").call(xAxis);

                // 主图区域   

                this.g = this.g.append('g').attr('transform', 'translate(0,0)');
            }
        }, {
            key: "creatRact",
            value: function creatRact() {
                var height = this.gHeight;
                var _this = this;
                var rectWidth = 30;
                this.rects = this.g.selectAll("rect").data(this.data).enter().append("rect").attr("width", _this.x.bandwidth()).attr("x", function (d) {
                    return _this.x(d.name);
                }).attr("y", function (d) {
                    return _this.y(d.y);
                }).attr('height', function (d) {
                    return height - _this.y(d.y);
                }).style("fill", 'rgb(52, 152, 219)');
            }
        }]);

        return Bar;
    }();

    var data = [{ y: 110, "name": "Jan" }, { y: 130, "name": "Feb" }, { y: 310, "name": "Mar" }, { y: 330, "name": "Apr" }, { y: 350, "name": "May" }, { y: 140, "name": "Jun" }, { y: 110, "name": "Jul" }];
    var Bars = new Bar({
        ele: document.getElementById('bar'),
        width: 400,
        height: 400,
        data: data
    });
});