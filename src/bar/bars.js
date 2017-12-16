import toolTipLayer from '../toolTipLayer/toolTipLayer';
import toolTipList from '../toolTipLayer/toolTipList';
import { boundary, getBoundingClientRects, chartColor} from '../utils/utilsMethod';
import legend from '../legend/legend';
var d3 = require("d3");
import './barStyle.scss';

class Bar {
    //参数说明
    //option {}
    // width,height,ele,
    constructor(option) {
        for (let [key, value] of Object.entries(option)) {
            this[key] = value;
        }
        this.svg = null;
        this.layerg = null;
        this.rects =null;
        this.x = null;
        this.margin=60;
        this.gHeight=this.height-this.margin;
        this.gWidth=this.width-this.margin;
        const toolTipLayers = toolTipLayer;
        this.toolTip = toolTipLayers.tipLayer;
        this.creatSvg();
        this.creatG();
        this.creatRact();
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
            return d3.max(series.data, function(d) { return d.y; });
        });
        let min = d3.min(this.series, function(series) { 
            return d3.min(series.data, function(d) { return d.y; });
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
        .range([0, this.gWidth])
        .padding(0.1);
        this.x.domain(this.categories.map(function(d) { return d.name; }));
        
        this.x1 = d3.scaleBand()
            .range([0, this.x.bandwidth()])
            .padding(0.1);
        this.x1.domain(d3.range(this.series.length))

        var xAxis = d3.axisBottom()
            .scale(this.x);
        this.layerg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${this.gHeight})`)
            .call(xAxis);

        // 主图区域 
        this.g = this.layerg.selectAll(".layer")
        .data(this.series)
        .enter()
        .append("g")
        .style("fill", function(d, i) { return chartColor[i]; })
        .attr("transform", function(d, i) {return "translate(" + _this.x1(i) + ",0)"; })
        .attr("class", "layer");

        legend.call(this,chartColor)
    }    
                
    creatRact() {
       let height =this.gHeight;
       let _this=this;
       let rectWidth = 30;
       this.rects = this.g.selectAll("rect")
            // .data(function(d,i){
            //     d.map(function(b){
            //         return b.y;
            //     });
            //     return d;
            // })
            .data(function(d){
                return d.data;
            })
            .enter()
            .append("rect")
            .attr("width", _this.x1.bandwidth())
            .attr("x", function(d) { return _this.x(d.name);})
            .attr("y",  function(d) { return _this.y(d.y); })
            .attr('height',function(d) { return height - _this.y(d.y); })
            .on('mouseover',function(d,i){
                _this.toolTip
                .style('display', 'block')
                .html(toolTipList(d))
                .style('top',function(){
                    let boundarys = boundary(d3.event.layerX ,d3.event.layerY,document.getElementsByClassName('tooltip-cont')[0]);
                    return (boundarys.y) + 'px';
                })
                .style('left',function(){
                    let boundarys = boundary(d3.event.layerX ,d3.event.layerY,document.getElementsByClassName('tooltip-cont')[0]);
                    return (boundarys.x) + 'px';
                })
                
            })
            .on('mousemove', function(d,i) {
                let boundarys = boundary(d3.event.layerX ,d3.event.layerY,document.getElementsByClassName('tooltip-cont')[0]);
                _this.toolTip
                .transition()
				.duration(50)
                .style('top', boundarys.y + 'px')
                .style('left', boundarys.x + 'px');
            })
            .on('mouseout', function(d) {
                _this.toolTip
                .style('display', 'none');
            });
    }
   
}

let Bars = new Bar({
    ele: document.getElementById('bar'),
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
                {"name":"六月"},
                {"name":"七月"}],
    series: [
                {
                    name:'北京',
                    data:[
                            {y:110,"name":"一月"},
                            {y:130,"name":"二月"},
                            {y:310,"name":"三月"},
                            {y:330,"name":"四月"},
                            {y:350,"name":"五月"},
                            {y:140,"name":"六月"},
                            {y:110,"name":"七月"},
                            
                    ]
                },
                {
                    name:'上海',
                    data:[
                            {y:10,"name":"一月"},
                            {y:330,"name":"二月"},
                            {y:640,"name":"三月"},
                            {y:230,"name":"四月"},
                            {y:150,"name":"五月"},
                            {y:160,"name":"六月"},
                            {y:210,"name":"七月"}
                        ]
                }
        ]
});
export default Bar;