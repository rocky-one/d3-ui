var d3 = require("d3");
class creatToolTipLayer {
    constructor() {
        this.creatLayer();
    }
    creatLayer() {
        this.toolTipLayer = d3.select('body')
            .append('div')
            .attr('class','tooltip')
            .style('width','auto')
            .style('position','absolute')

        this.toolTipLayer.append('div')
            .attr('class','tooltip-box');

    }
}

export default creatToolTipLayer;
