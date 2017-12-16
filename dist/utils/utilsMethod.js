(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.utilsMethod = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var windowClient = function windowClient() {
        return {
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight
        };
    };
    var getBoundingClientRects = function getBoundingClientRects(ele) {
        return ele.getBoundingClientRect();
    };
    var windowScroll = function windowScroll() {
        return {
            scrollLeft: document.body.scrollLeft,
            scrollTop: document.body.scrollTop
        };
    };
    var boundary = function boundary(x, y, ele) {
        var client = windowClient();
        var clientRect = getBoundingClientRects(ele);
        var scroll = windowScroll();
        var xs = clientRect.left;
        var ys = clientRect.top;
        var noScrollX = x - scroll.scrollLeft;
        var noScrollY = y - scroll.scrollTop;
        y = y - clientRect.height - 30;

        var rightBs = noScrollX + clientRect.width; // 当前可视区域的坐标X + 当前元素的宽度 
        var rightBpx = rightBs - client.clientWidth; // 当前元素右下角坐标到可视区域左上角的水平距离 - 当前可视区域的宽度   
        if (rightBpx > 0) {
            // rightBpx>0 说明超过右侧的边界
            x = x - clientRect.width;
        }
        return {
            x: x,
            y: y
        };
    };

    var chartColor = ['#1C86EE', '#B3EE3A', '#CD00CD', '#EE6A50', '#EEC900', '#A0522D'];

    exports.boundary = boundary;
    exports.windowClient = windowClient;
    exports.getBoundingClientRects = getBoundingClientRects;
    exports.chartColor = chartColor;
    exports.windowScroll = windowScroll;
});