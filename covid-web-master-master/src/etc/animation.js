import React, { Component } from 'react'
import * as d3 from 'd3'

class animation extends Component
{
    componentDidMount(){
        const svg = d3.select('div')
                .append('svg')
                .attr('width',500)
                .attr('height',300)
        const bar =  svg.append('rect')
            .attr('fill','red')
            .attr('x',150)
            .attr('y',30)
            .attr('height',10)
            .attr('width',40)
        
        function update(){
            bar.transition()
            .ease(d3.easeLinear)
            .duration(4000)
            .attr('height','250')
        }
        svg.append('line')
        .attr('x1',100)
        .attr('x2',500)
        .attr('y1',50)
        .attr('y2',250)
        .attr('stroke','black')

        svg.append('circle')
        .attr('cx',250)
        .attr('cy',30)
        .attr('r',100)
    }
   
   
    render(){
        return(
            <div>
                Animation
            </div>
        )
    }
}
export default animation