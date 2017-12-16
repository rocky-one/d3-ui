
import { boundary, getBoundingClientRects, chartColor} from '../utils/utilsMethod';
import toolTipLayer from '../toolTipLayer/toolTipLayer';
import toolTipList from '../toolTipLayer/toolTipList';
import legend from '../legend/legend';
var d3 = require("d3");
import './lineStyle.scss';

class Line {
    //参数说明
    //option {}
    // width,height,ele,
    constructor(option) {
        for (let [key, value] of Object.entries(option)) {
            this[key] = value;
        }
        this.svg = null;
        this.layerg = null;
        this.margin=60;
        this.gHeight=this.height-this.margin;
        this.gWidth=this.width-this.margin;
        const toolTipLayers = toolTipLayer;
        this.toolTip = toolTipLayers.tipLayer;
        this.creatSvg();
        this.creatG();
        this.creatLine();
        legend.call(this,chartColor)
    }
    creatSvg() {
        this.svg = d3.select(this.ele)
            .append('svg')
            .attr("width", this.width)
            .attr("height", this.height);
         // 外层 g
        this.layerg=this.svg.append('g')
            .attr('transform', `translate(${this.margin/2},${this.margin/2})`);
    }
    
    creatG() {
        let _this=this;

        // y轴 
        let max = d3.max(this.series, function(series) { 
            return d3.max(series.data, function(d) { return d.value; });
        });
        let min = d3.min(this.series, function(series) { 
            return d3.min(series.data, function(d) { return d.value; });
        });
        this.y = d3.scaleLinear()
        .domain([ 0, max ])
        .range([this.gHeight, 0]);
        
        var yAxis = d3.axisLeft()
            .scale(this.y);
        this.layerg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);
        // x轴
        this.x = d3.scaleBand()
        .range([0, this.gWidth]);
        
        this.x.domain(this.categories.map(function(d) { return d.name; }));
        this.x1 = d3.scaleBand()
            .range([0, this.x.bandwidth()])
        this.x1.domain(d3.range(this.series.length));

        var xAxis = d3.axisBottom()
            .scale(this.x);
        this.layerg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${this.gHeight})`)
            .call(xAxis);
    }    
                
    creatLine() {

        let _this=this;
        let line = d3.line()
            // .curve(d3.curveBasis)
            .x(function(d) {return _this.x(d.name); })
            .y(function(d) { return  _this.y(d.value); });
        let lineLayers = this.layerg.selectAll(".layers")
        .data(this.series)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {return "translate(" + _this.x1(1) + ",0)"; });

        lineLayers.append("path")
            .attr("class", "line").attr('fill','none')
            .attr("d", function(d) { return line(d.data); })
            .style("stroke", function(d, i) { return chartColor[i]; });
        let label = lineLayers.selectAll(".text")
                .data(function(d,i) {return d.data; })
                .enter().append("text")
                .attr("dy", ".35em")
                .text(function(d) { return d.value; })
                .attr("class", "text")
                .attr("text-anchor", "start")
                // .attr("fill", function(d, i) { return chartColor[i]; })
                .attr("transform", function(d, i) { let transY=_this.y(d.value)-10;return "translate(" + _this.x(d.name) + "," + transY + ")"; });

        // let lineLayer = this.layerg.selectAll(".line-g")
        //     .data(this.series)
        //     .enter()
        //     .append("path")
        //     .attr("class", "line")
        //     .attr("d", function(d) { return line(d.data); })
        //     .style("stroke", function(d, i) { return chartColor[i]; });
            
    }
   
}

let Lines = new Line({
    ele: document.getElementById('line'),
    width: 400,
    height: 400,
    legend:{
        data:["北京", "上海"]
    },
    categories:[{"name":"一月"},
                {"name":"二月"},
                {"name":"三月"},
                {"name":"四月"},
                {"name":"五月"},
              ],
    series: [
               {
                    name:'北京',
                    data:[
                            {value:110,"name":"一月"},
                            {value:130,"name":"二月"},
                            {value:310,"name":"三月"},
                            {value:330,"name":"四月"},
                            {value:350,"name":"五月"}
                            
                            
                    ]
                },
                {
                    name:'上海',
                    data:[
                            {value:0,"name":"一月"},
                            {value:530,"name":"二月"},
                            {value:240,"name":"三月"},
                            {value:450,"name":"四月"},
                            {value:250,"name":"五月"}
                            
                        ]
                }
        ]
});
export default Line;