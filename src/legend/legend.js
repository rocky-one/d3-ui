import './legendStyle.scss';
    
const legend = function(z) {
    let legend =this.layerg.append("g")
    .attr("class", "legend")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(this.legend.data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", this.gWidth - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", function(d, i) { return z[i]; });

    legend.append("text")
    .attr("x", this.gWidth - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });
}

export default legend;
