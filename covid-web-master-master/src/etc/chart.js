import React, { Component } from 'react'
import * as d3 from 'd3'

class chart extends Component
{
    componentDidMount(){
        const data = [10,20,1,4,100]
        const graph = d3.select('div')
                .append('svg')
                .attr('width',500)
                .attr('height',20*4)

        var bar = graph.selectAll('g')
                    .data(data)
                    .enter()
                .append('g')
                
                .attr('transform',function(d,i){
                    return "translate(0,"+i * 20 +")"
                })
            bar.append('rect')
            .attr('width',function(d){
                return d *10
            })
            .attr('height',19)
            .attr('fill','orange')

            bar.append('text')
            .attr('x',function(d){ return d*10})
            .attr('y',10)
            .attr('dy',".35em")
            .text(function(d){return d})
    }
    
    render(){
        return(
            <div>
                chart.js
            </div>
        )
    }
}

export default chart