import React from 'react'
import * as d3 from 'd3'
import { svg, select } from 'd3'
import Axios from 'axios'
function BarPlot(){
    
    Axios.get("https://api.covid19india.org/data.json").then(function(data){
      var TopEffectedState = []
      var count =5
      var start = 0
      for(var key in data.data.statewise)
    {
        if(start<=count && start>=1){
        TopEffectedState.push({
            Name:data.data.statewise[key].state,
            Confirmed:data.data.statewise[key].confirmed
        })
        
        // console.log(TopEffectedState[0])
        start++
        }
        else{
            start++
        }
        
    }
    var bardata = [18322,27800,62087,62655,135796]
      console.log(TopEffectedState)
    var val=TopEffectedState.sort(function(b,a){
        return b.Confirmed-a.Confirmed
    })
    console.log(val)
    console.log(TopEffectedState)
      var svg = d3.select('#BarPlot')
                .append("svg")
                .attr("width","500px")
                .attr("height","300px")
                .attr("transform","translate(30,20)")

        var x_axis = d3.scaleBand()
            .range([0,200])
            .domain(val.map(function(d){
                return d.Name
            }))
            
        svg.append('g')
        .attr("transform","translate(40,150)")
        .call(d3.axisBottom(x_axis))
        .selectAll('text')
        .attr("transform","translate(-10,0)rotate(-45)")


    var y_axis= d3.scaleLinear()
            .range([150,0])
            .domain(val.map(function(d){
                
                return d.Confirmed
            }))
            // .domain([0,200000])
            
            svg.append('g')
            .call(d3.axisLeft(y_axis))
            .attr("transform","translate(50,5)")
            .attr("stroke","white")
            
            svg.selectAll("myBar")
            .data(val)
            .enter()
            .append("rect")
            .attr('x',function(d){ 
                console.log(d)

                return x_axis(d.Name)})
            .attr('y',function(d,i){return y_axis(d.Confirmed)})
            .attr("width",x_axis.bandwidth())
            .attr("height",function(d,i) { 
                console.log(y_axis(d.Confirmed)/50)
                return (((d.Confirmed)/100000)*100)
            })
            .attr("transform","translate(55,0)")
            .attr("fill",function(d,i){
                return d3.schemeCategory10[i]
            })
        d3.selectAll("path")
        .attr("stroke","white")
        d3.selectAll('line')
        .attr("stroke","white")
})
    return (
        <div id="BarPlot">

        </div>
    )
}
export default BarPlot