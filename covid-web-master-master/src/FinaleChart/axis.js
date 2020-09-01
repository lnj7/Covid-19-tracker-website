// import React, { Component } from 'react'
import * as d3 from 'd3'
import {curveMonotoneX} from 'd3-shape'
import {select} from 'd3'
var TimeConv = d3.timeParse('%d %B %Y')
function AxisMain(data,x_scale,y_scale){
    /*-------------------------LINE GENERATOR-------------------------- */
        const lineGenerator =d3.line()
            .x(function(d,i){return x_scale(TimeConv(d.name))})
            .y(function(d,i){return y_scale(d.value)})  
            .curve(curveMonotoneX)
    /*-------------------------INITIAL DATA ----------------------------*/
        const initialData = data.map(d => ({
                name: d.name,
                value: 0
              }));
        
    select('g')
    .append('path')
    .datum(initialData)
    .attr('id', 'line')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', lineGenerator);
     /*---------------------------UPDATE CHART ACCORDING TO DATA------------------------ */   
            updateChart(lineGenerator,data)
    
}
function updateChart(lineGenerator,data) {
    // const {
    //       lineGenerator, xScale, yScale, data,
    //     } = this.props;

    const t = d3.transition().duration(1000);

    const line = d3.select('#line');
    const dot = d3.selectAll('.circle');

    line
      .datum(data)
      .transition(t)
      .attr('d', lineGenerator);
    }
export default AxisMain