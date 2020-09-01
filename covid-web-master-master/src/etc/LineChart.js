import React, { Component } from 'react'
import * as d3 from 'd3'
import Axios from 'axios'
const timeConv = d3.timeParse('%d %B %Y')
var daily = {}
var FinalData = {}
class LineChart extends Component
{
    componentDidMount(){
        Axios.get("https://api.covid19india.org/data.json").then(function(res){
           for(let data in res.data)
            {
                daily={
                 [data]:res.data
                }
            }
            // console.log(typeof(parseInt(daily.tested.cases_time_series[0].dailyconfirmed)))
            console.log(daily,"[DATA]-LineChart.js")    
        })
        
    }
    CreateData(){
        FinalData = {
            date:{
                ...daily.tested.cases_time_series
            }
        }
        var datas = []
        for(let key in FinalData.date)
        {
            datas.push({
                
                date:FinalData.date[key].date+'2020',
                dailyconfirmed:FinalData.date[key].dailyconfirmed

            })
        }
        console.log(datas)
    }
    chart(){
        var dailyData =daily.tested.cases_time_series
        /*Step 1 margin conventions */
        var margin ={
            top:50,
            left:50,
            right:50,
            bottom:50
        }
        var width = window.innerWidth -margin.left -margin.right
        var height = window.innerHeight -margin.top - margin.bottom


        /*Step 2 Add SVG  */
        var svg = d3.select('div')
        .append('svg')
        .attr('width',width+50)
        .attr('height',height+200)
    /*-----------------------SCALES---------------------------------- */
        /*Step 3 Add X_SCALE */
        var X_SCALE = d3.scaleTime()
                    .range([0,width])
                    .domain(d3.extent(dailyData,function(d,i){
                        return timeConv(dailyData[i].date+'2020')
                    }))

        /* Step 4 Add Y_SCALE */
        var Y_SCALE = d3.scaleLinear()
                    .range([height,0])
                    .domain([(0),d3.max(dailyData,function(d,i){
                        return parseInt(dailyData[i].dailyconfirmed)
                    })])
    
    /*-----------------------AXIS-------------------------------------- */
    var Y_AXIS = d3.axisRight()
                // .ticks(dailyData.length)
                .scale(Y_SCALE)

    var X_AXIS = d3.axisBottom()
            .ticks(d3.timeDay.every(50))
            .tickFormat(d3.timeFormat('%b %d'))
            .scale(X_SCALE)
    
    /*-----------------------LINES-------------------------------------- */
    const line = d3.line()
           .x(function(d,i){return X_SCALE(dailyData[i].date)})
           .y(function(d,i){return Y_SCALE(dailyData[i].dailyconfirmed)})    
           
    let id = 0;
    const ids = function () {
               return "line-"+id++;
            } 
            
    /*-----------------------DRAWING_____________________________________*/
    /*------------------------AXES---------------------------------------- */
    svg.append('g')
    .attr("transform","translate(0,"+height+")")
    .call(X_AXIS)
    

    svg.append('g')
    .attr("transform","translate(870, 5)")
    .call(Y_AXIS)


    /*-------------------------LINES--------------------------------------*/
    // const lines = svg.selectAll('lines')
    //         .data(dailyData)
    //         .enter()
    //         .append('g')
    //         lines.append('path')
    //         .attr("class",ids)
    //         .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 1.5)
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-linecap", "round")
    //         .attr('d',line)
    //         lines.append('text')
            
    //         .datum(function(d,i){
    //             return{
    //                 id:d.dailyconfirmed,
    //                 value:d.dailyconfirmed[d.length]
    //             }
    //         })
    //         .attr("transform",function(d,i){
    //             console.log(i)
    //             return "translate("+(X_SCALE(timeConv(dailyData[i].date+'2020') )+10)
    //             + "," +(Y_SCALE(dailyData[i].dailyconfirmed)+5) + ")"
    //         })
    //         .attr('x',5)
    //         .text(function(d){ return ("seri")+d.id})


    //         d3.selectAll('path')
    //         .attr('fill','none')
    //         .attr('stroke','#ed3700')
    }      
    
    
    render(){
        return(
            <div>
                LineChart.js "Step by step"
                <button onClick={this.chart}>Chart</button>
                <button onClick={this.CreateData}>Data</button>
            </div>
        )
    }
}

export default LineChart