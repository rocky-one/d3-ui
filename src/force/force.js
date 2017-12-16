
import { chartColor} from '../utils/utilsMethod';
var d3 = require("d3");
import './forceStyle.scss';

class Force {
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
        this.creatSvg();
        this.creatG();
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
        function dragstarted(d) {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

            
        var force = d3.forceSimulation()
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.gWidth / 2, this.gWidth / 2))
            .force("link",d3.forceLink().id(function(d) { return d.id; }));

        var link = this.layerg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.series.links)
            .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
           

        var color = d3.schemeCategory20;
        var node = this.layerg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(this.series.nodes)
                .enter().append("circle")
                .attr("r", 5)
                .attr("fill", function(d,i) { return color[i]; })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));


        var radius = d3.scaleSqrt()
                .range([0, 6]);

          node.append("title")
            .text(function(d) { return d.id; });
        
         force
            .nodes(this.series.nodes)
            .on("tick", tick);

         force.force("link")
            .links(this.series.links);


        function tick() {
            link
                .attr("x1", function(d) {return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node  
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        };
    }    
                
   
   
}

let Forces = new Force({
    ele: document.getElementById('force'),
    width: 600,
    height: 600,
    series: {
  "nodes": [
    {"id": "Myriel", "group": 1},
    {"id": "Napoleon", "group": 1},
    {"id": "Mlle.Baptistine", "group": 1},
    {"id": "Mme.Magloire", "group": 1},
    {"id": "CountessdeLo", "group": 1},
    {"id": "Geborand", "group": 1},
    {"id": "Champtercier", "group": 1},
    {"id": "Cravatte", "group": 1},
    {"id": "Count", "group": 1},
    {"id": "OldMan", "group": 1},
    {"id": "Labarre", "group": 2},
    {"id": "Valjean", "group": 2},
    {"id": "Marguerite", "group": 3},
    {"id": "Mme.deR", "group": 2},
    {"id": "Isabeau", "group": 2},
    {"id": "Gervais", "group": 2},
    {"id": "Tholomyes", "group": 3},
    {"id": "Listolier", "group": 3},
    {"id": "Fameuil", "group": 3},
 
  ],
  "links": [
    {"source": "Napoleon", "target": "Myriel", "value": 1},
    {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
    {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
    {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
    {"source": "CountessdeLo", "target": "Myriel", "value": 1},
    {"source": "Geborand", "target": "Myriel", "value": 1},
    {"source": "Champtercier", "target": "Myriel", "value": 1},
    {"source": "Cravatte", "target": "Myriel", "value": 1},
    {"source": "Count", "target": "Myriel", "value": 2},
    {"source": "OldMan", "target": "Myriel", "value": 1},
    {"source": "Valjean", "target": "Labarre", "value": 1},
    {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
    {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
    {"source": "Valjean", "target": "Myriel", "value": 5},
    {"source": "Marguerite", "target": "Valjean", "value": 1},
    {"source": "Mme.deR", "target": "Valjean", "value": 1},
    {"source": "Isabeau", "target": "Valjean", "value": 1},
    {"source": "Gervais", "target": "Valjean", "value": 1},
    {"source": "Listolier", "target": "Tholomyes", "value": 4},
    {"source": "Fameuil", "target": "Tholomyes", "value": 4},

  
  ]
}
});
export default Force;