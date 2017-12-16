class Bar {
    //参数说明
    //option {}
    // width,height,ele,
    constructor(option) {
        for (let [key, value] of Object.entries(option)) {
            this[key] = value;
        }
        this.svg = null;
        this.g = null;
        this.rects =null;
        this.x = null;
        this.margin=60;
        this.gHeight=this.height-this.margin;
        this.gWidth=this.width-this.margin;
        this.creatSvg();
        this.creatG();
        this.creatRact();
    }
    creatSvg() {
        this.svg = d3.select(this.ele)
            .append('svg')
            .attr("width", this.width)
            .attr("height", this.height)
            .attr('transform', 'translate(340,50)')
    }
    creatG() {
        
        // 主
        this.g=this.svg.append('g')
            .attr('transform', `translate(${this.margin/2},${this.margin/2})`);
        // y轴
        this.y = d3.scaleLinear()
        .domain([0, d3.max(this.data, function(d) { return d.y; })])
        .range([this.gHeight, 0]);
        
        var yAxis = d3.axisLeft()
            .scale(this.y);
        this.g.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);
        // x轴
        this.x = d3.scaleBand()
        .range([0, this.gWidth] )
        .padding(0.3);
        this.x.domain(this.data.map(function(d) { return d.name; }))//this.data.map(function(d) { return d.name; })
        
        var xAxis = d3.axisBottom()
            .scale(this.x);
        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${this.gHeight})`)
            .call(xAxis);

        // 主图区域   
       
        this.g=this.g.append('g')
            .attr('transform', 'translate(0,0)');

    }    
    creatRact() {
       let height =this.gHeight;
       let _this=this;
       let rectWidth = 30;
        this.rects = this.g.selectAll("rect")
				.data(this.data)
				.enter()
				.append("rect")
				.attr("width", _this.x.bandwidth())
                .attr("x", function(d) { return _this.x(d.name);})
                .attr("y",  function(d) { return _this.y(d.y); })
                .attr('height',function(d) { return height - _this.y(d.y); })
                .style("fill",'rgb(52, 152, 219)')
    }
}

let data = [
                {y:110,"name":"Jan"},
                {y:130,"name":"Feb"},
                {y:310,"name":"Mar"},
                {y:330,"name":"Apr"},
                {y:350,"name":"May"},
                {y:140,"name":"Jun"},
                {y:110,"name":"Jul"},
                
            ]
let Bars = new Bar({
    ele: document.getElementById('bar'),
    width: 400,
    height: 400,
    data: data
});
