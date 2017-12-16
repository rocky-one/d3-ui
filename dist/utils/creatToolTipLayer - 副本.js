(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "d3"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("d3"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.d3);
        global.creatToolTipLayer = mod.exports;
    }
})(this, function (exports, d3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var creatToolTipLayer = function () {
        function creatToolTipLayer() {
            _classCallCheck(this, creatToolTipLayer);

            this.creatLayer();
        }

        _createClass(creatToolTipLayer, [{
            key: 'creatLayer',
            value: function creatLayer() {
                this.toolTipLayer = d3.select('body').append('div').attr('class', 'tooltip').style('width', 'auto').style('position', 'absolute');

                this.toolTipLayer.append('div').attr('class', 'tooltip-box');
            }
        }]);

        return creatToolTipLayer;
    }();

    exports.default = creatToolTipLayer;
});