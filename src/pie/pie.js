
import { boundary, getBoundingClientRects, chartColor} from '../utils/utilsMethod';
import toolTipLayer from '../toolTipLayer/toolTipLayer';
import toolTipList from '../toolTipLayer/toolTipList';
import legend from '../legend/legend';
var d3 = require("d3");
import './pieStyle.scss';

class Pie {
    //参数说明
    //option {}
    // width,height,ele,
    constructor(option) {
        for (let [key, value] of Object.entries(option)) {
            this[key] = value;
        }
        this.svg = null;
        this.layerg = null;
        this.margin=250;
        this.gHeight=this.height-this.margin;
        this.gWidth=this.width-this.margin;
        this.radius = Math.min(this.gHeight, this.gWidth) / 2;
        const toolTipLayers = toolTipLayer;
        this.toolTip = toolTipLayers.tipLayer;
        this.creatSvg();
        this.creatG();
        this.creatRact();
        legend.call(this,chartColor)
    }
    creatSvg() {
        
        this.svg = d3.select(this.ele)
            .append('svg')
            .attr("width", this.width)
            .attr("height", this.height);
         // 外层 g
        this.layerg=this.svg.append('g')
            .attr('transform', `translate(${this.gHeight/2+this.margin/2},${this.gHeight/2+this.margin/2})`);
    }
    
    creatG() {
        var outerRadius = this.gHeight / 2 - 20,
            innerRadius = outerRadius / 3,
            cornerRadius = 10;
        let pie = d3.pie()
            .value(function(d) { return d.value; });
            
        let arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(0);
        let outerArc = d3.arc()
            .outerRadius(outerRadius * 2.4).innerRadius(0);
        let _this=this;
        function arcTween(outerRadius, delay) {
                d3.select(this).transition().delay(delay).attrTween("d", function(d) {
                    var fff = d3.interpolate(d.outerRadius, outerRadius);
                    var arcs = d3.arc();
                    return function(t) { d.outerRadius = fff(t); return arcs(d); };
                });
        }
        // 主图区域 
        this.g = this.layerg.selectAll(".arc")
                .data(pie(_this.series[0].data))
                .enter()
                .append("g")
                .attr("class", "arc");
                
        this.g.append("polyline")
        .transition().duration(400)
        .attr("points", function(d){
            let pos = arc.centroid(d);
            let outPos = outerArc.centroid(d);
            let endPos = JSON.parse(JSON.stringify(outPos));
            let end = [( endPos[0] > 0 ? endPos[0]+40 : endPos[0]-40 ), endPos[1]];
            return [pos,outPos,end]
        })
        .style('stroke',function(d,i){
            return chartColor[i];
        });


        this.g.append("path")
            .each(function(d) { d.outerRadius = outerRadius;d.innerRadius=0; })
            .attr("d", arc)
            .style("fill", function(d,i) { return chartColor[i]; })
            .on('mouseover',function(d,i){
                    _this.toolTip
                    .style('display', 'block')
                    .html(toolTipList(d.data))
                    .style('top',function(){
                        let boundarys = boundary(d3.event.layerX ,d3.event.layerY,document.getElementsByClassName('tooltip-cont')[0]);
                        return (boundarys.y) + 'px';
                    })
                    .style('left',function(){
                        let boundarys = boundary(d3.event.layerX ,d3.event.layerY,document.getElementsByClassName('tooltip-cont')[0]);
                        return (boundarys.x) + 'px';
                    });
                    arcTween.call(this,outerRadius+10, 0);
                    // d3.select(this).transition().duration(750).attrTween("d", function() {
                    //     var f = d3.interpolate(outerRadius, outerRadius+20);
                    //     var arcs = d3.arc();
                    //     return function(t) { 
                    //         d.outerRadius = f(t);
                    //         console.log(arc(d))
                    //         return arcs(d); 
                    //     };
                    // });
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
                    arcTween.call(this,outerRadius, 0);
                    
                });


        this.g.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                var outPos = outerArc.centroid(d);
                let end = [( outPos[0] > 0 ? outPos[0]+60 : outPos[0]-60 ), outPos[1]];
                 return `translate(${end[0]},${end[1]})`;
             })
            .text(function(d) { return d.value; })
            .style('stroke',function(d,i){
                return chartColor[i];
            });
            
        
		
    }    
                
    creatRact() {
       let height =this.gHeight;
       let _this=this;
       let rectWidth = 30;
       this.rects = this.g.selectAll("rect")
            .data(function(d){
                return d;
            })
            .enter()
            .append("rect")
            
    }
   
}

let Pies = new Pie({
    ele: document.getElementById('pie'),
    width: 500,
    height: 500,
    legend:{
        data:["一月", "二月","三月", "四月", "五月"]
    },
    series: [
                {
                    data:[
                        {value:335, name:'一月'},
                        {value:310, name:'二月'},
                        {value:234, name:'三月'},
                        {value:135, name:'四月'},
                        {value:1548, name:'五月'}
                    ]
                }
        ]
});
export default Pie;