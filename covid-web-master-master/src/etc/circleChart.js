import React, { Component } from 'react'
import * as d3 from 'd3'
import { select } from 'd3'

class circleChart extends Component
{
    componentDidMount(){
        const data = [10,22,30]
        var colors = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];

        var graph = d3.select('div')
                .append('svg')
                .attr('width',500)
                .attr('height',300)

        var circle = graph.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform',function(d,i){
                    return 'translate(0,0)'
                })
        circle.append('circle')
        .attr('cx',function(d,i){
            return i *100 +50
        })
        .attr('cy',function(d,i){
            return 100
        })
        .attr('r',function(d){
            return d*1.5
        })
        .attr('fill',function(d,i){
            return colors[i]
        })
        .attr('border','3px solid blue')

        circle.append('text')
        .attr()
    }   
    
    render(){
        return(
            <div>
                CircleChart.js
            </div>
        )
    }
}

export default circleChart