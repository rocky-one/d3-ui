(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./css/main.scss', './bar/bars', './pie/pie', './line/line'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./css/main.scss'), require('./bar/bars'), require('./pie/pie'), require('./line/line'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.main, global.bars, global.pie, global.line);
    global.main = mod.exports;
  }
})(this, function () {
  'use strict';
});