import React from 'react'
import * as d3 from 'd3'
import { svg } from 'd3'
import Axios from 'axios'
function LoliPopChart(){
    
    Axios.get("https://api.covid19india.org/data.json").then(function(data){
      var TopEffectedState = []
      var count =5
      var start = 0
      console.log(data.data)
    for(var key in data.data.statewise)
    {
        if(start<=count && start>=1){
        TopEffectedState.push({
            Name:data.data.statewise[key].state,
            Confirmed:data.data.statewise[key].confirmed
        })
        
        console.log(TopEffectedState[start])
        start++
        }
        else{
            start++
        }
        
    }
    d3.select("#LolliPopChart").remove()
    var svg=d3.select('#LoliPopChart_div')
        .append('svg')
        .attr("id","LolliPopChart")
        .attr('width','100%')
        .attr('height','100%')
        .style("background-color","rgb(137,58,57,.5)")
        .style("border-radius","8px")
        .style("margin-left","2%")
        
        .append('g')
        .attr("transform","translate(50,35)")
        .style("background-color","red")
    // d3.csv("./Maps/convertcsv.csv", function(data) {
        console.log(TopEffectedState)
    var x_axis = d3.scaleBand()
        .range([0,320])
        // .domain(["United States","Russia","Germany (FRG)","France","United Kingdom","China","Spain","Netherlands","Italy","Israel"])
        .domain(TopEffectedState.map(function(d){
            return d.Name
        }))
        .padding(1)

        svg.append('g')
        
        .attr("transform","translate(0,131)")
        .attr('stroke-width','2px')
        .call(d3.axisBottom(x_axis))
        .selectAll("text")
        .attr("transform","translate(-10,0)rotate(-45)")
        .style("text-anchor","end")

    var y_axis = d3.scaleLinear()
        .domain([0,200000])
        .range([130,0])

        svg.append('g')
        
        .call(d3.axisLeft(y_axis))
        .attr("transform","translate(20,5)")
        .attr('stroke-width','3px')


        var l=svg.selectAll("myline")
        .data(TopEffectedState)
        l
        .enter()
        .append("line")
        .merge(l)
        .transition()
        .duration(1000)
        .attr('stroke-width','6px')
        // .attr("transform","translate(60,0)")
        .attr("x1",function(d){
            return x_axis(d.Name)
        })
        .attr("x2",function(d){return x_axis(d.Name)})
        .attr("y1",function(d){
            // console.log(d.Confirmed)
            return y_axis(d.Confirmed)})
        .attr("y2",y_axis(0))
        .attr("stroke","rgb(137,58,57)")
        .transition()
        .duration(1000)

        let c=svg.selectAll("mycircle")
        .data(TopEffectedState)
        c
        .enter()
        .append('circle')
        .merge(c)
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            return x_axis(d.Name); })
        .attr("cy", function(d) { return y_axis(d.Confirmed); })
        .attr('r',6)
        .style("fill", "red")
    .attr("stroke", "black")
    
    // svg.append('rect')
    // .attr('fill','rgb(137,44,57)')
    // .attr('opacity',.5)
    // .attr('width','280px')
    // .attr('height','150px')
})

    return(
        <div id="dataSec">
            
        </div>
    )
}

export default LoliPopChart