var d3 = require("d3");
import './toolTipLayerStyle.scss';

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


var toolTipLayer = (function () {
    function creatToolTipLayer() {
        this.tipLayer = d3.select('body')
            .append('div')
            .attr('class','tooltip')
            .style('width','auto')
            .style('position','absolute')

        this.tipLayer.append('div')
            .attr('class','tooltip-box');

    }

    var toolTopInstance;
    
    if (toolTopInstance === undefined) {
        toolTopInstance = new creatToolTipLayer();
    }
    return toolTopInstance;
        
})();

export default toolTipLayer;
