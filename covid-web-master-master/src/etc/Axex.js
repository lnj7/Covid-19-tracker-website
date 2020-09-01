import React, { Component } from 'react'
import Axios from 'axios'

import * as d3 from 'd3'
const timeConv = d3.timeParse('%d %B %Y')
console.log(timeConv("30 June 2020"),"test")
var daily ={}
class Axis extends Component
{
    // componentDidMount(){
    //     Axios.get("https://api.covid19india.org/data.json").then(function(res){
    //        for(let data in res.data)
    //         {
    //             daily={
    //              [data]:res.data
    //             }
    //         }
    //         console.log(typeof(parseInt(daily.tested.cases_time_series[0].dailyconfirmed)))
            
    //     })
        
    // }
    
    chart(){
        var dailyData = daily.tested.cases_time_series
        console.log(dailyData,"dailyData")
        var data =[5,10,20,25,530]
        var data2 = [100,200,300,400]
        var svg = d3.select('div')
                .append('svg')
                .attr('width',800)
                .attr('height',400)

        // var x_scale = d3.scaleLinear()
        //         .domain([d3.min(data), d3.max(data)])
        //         .range([0,400])

        var x_scale= d3.scaleTime()
                .range([0,800])
        x_scale.domain(d3.extent(dailyData,function(d,i){
            // console.log(timeConv(dailyData[i].date+'2020'),"date")
            return timeConv(dailyData[i].date+'2020')
        }))
        var x_axis = d3.axisBottom()
            .ticks(d3.timeDay.every(50))
            .tickFormat(d3.timeFormat('%b %d'))
            .scale(x_scale)
        var y_scale = d3.scaleLinear()
            .range([300,0])
        y_scale.domain([(0),d3.max(dailyData,function(d,i){
            // console.log(typeof(dailyData[i].totalconfirmed),"=",i,"max")
            return parseInt(dailyData[i].dailyconfirmed)
        })])
        var y_axix = d3.axisLeft()
        .scale(y_scale)
        
        svg.append('g')
        .attr('transform',"translate(50,"+300+")")
        .call(x_axis)

        
        svg.append('g')
        .attr("transform", "translate(50, 10)")
        .call(y_axix)
        svg.append('path')
        .data(data)
        .attr('fill','none')
        .attr("stroke","steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        console.log(daily,"dateeee")

        const line = d3.line()
        .x(function(d,i){return x_scale(dailyData[i].date)})
        .y(function(d,i){return y_scale(dailyData[i].dailyconfirmed)})

        let id = 0;
const ids = function () {
    return "line-"+id++;

    
}  
        const lines = svg.selectAll('lines')
            
            .enter()
            .append('g')

            lines.append("path")
            .attr("class", ids)

            .attr("d",function(d){return line(d.values)})

            .datum(function(d) {
                return {
                    id: d.id,
                    value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) {
                    return "translate(" + (x_scale(d.value.date) + 10)  
                    + "," + (y_scale(d.value.measurement) + 5 ) + ")"; })
            .attr("x", 5)
            .text(function(d) { return ("Serie ") + d.id; });
        }
    render(){
        return(
            <div>
                Axix.js
                <button onClick={this.chart}>create chart</button>
            </div>
        )
    }
}

export default Axis