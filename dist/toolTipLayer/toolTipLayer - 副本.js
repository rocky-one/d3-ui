(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "d3", './toolTipLayerStyle.scss'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("d3"), require('./toolTipLayerStyle.scss'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.d3, global.toolTipLayerStyle);
        global.toolTipLayer = mod.exports;
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

    var toolTipLayer = function () {
        function toolTipLayer() {
            _classCallCheck(this, toolTipLayer);

            this.creatLayer();
        }

        _createClass(toolTipLayer, [{
            key: 'creatLayer',
            value: function creatLayer() {
                this.tipLayer = d3.select('body').append('div').attr('class', 'tooltip').style('width', 'auto').style('position', 'absolute');

                this.tipLayer.append('div').attr('class', 'tooltip-box');
            }
        }]);

        return toolTipLayer;
    }();

    exports.default = toolTipLayer;
});