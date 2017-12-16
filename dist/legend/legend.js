(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./legendStyle.scss"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./legendStyle.scss"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.legendStyle);
        global.legend = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var legend = function legend(z) {
        var legend = this.layerg.append("g").attr("class", "legend").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end").selectAll("g").data(this.legend.data).enter().append("g").attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

        legend.append("rect").attr("x", this.gWidth - 19).attr("width", 19).attr("height", 19).attr("fill", function (d, i) {
            return z[i];
        });

        legend.append("text").attr("x", this.gWidth - 24).attr("y", 9.5).attr("dy", "0.32em").text(function (d) {
            return d;
        });
    };

    exports.default = legend;
});