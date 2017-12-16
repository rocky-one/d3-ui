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


    // class toolTipLayers {
    //     constructor() {
    //         this.creatLayer();
    //     }
    //     creatLayer() {
    //         this.tipLayer = d3.select('body')
    //             .append('div')
    //             .attr('class','tooltip')
    //             .style('width','auto')
    //             .style('position','absolute')

    //         this.tipLayer.append('div')
    //             .attr('class','tooltip-box');

    //     }
    // }


    var toolTipLayer = function () {
        function creatToolTipLayer() {
            this.tipLayer = d3.select('body').append('div').attr('class', 'tooltip').style('width', 'auto').style('position', 'absolute');

            this.tipLayer.append('div').attr('class', 'tooltip-box');
        }

        var toolTopInstance;

        if (toolTopInstance === undefined) {
            toolTopInstance = new creatToolTipLayer();
        }
        return toolTopInstance;
    }();

    exports.default = toolTipLayer;
});