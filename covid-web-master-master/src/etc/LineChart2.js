import React, { Component } from 'react'
import * as d3 from 'd3'
import Axios from 'axios'
import { timeParse } from 'd3'
const timeConv = d3.timeParse('%d %B %Y')
var daily = {}
var FinalData = {}
var datas = []
class LineChart2 extends Component
{
    componentDidMount(){
        Axios.get("https://api.covid19india.org/data.json").then(function(res){
           for(let data in res.data)
            {
                daily={
                 [data]:res.data
                }
            }
            console.log(typeof(parseInt(daily.tested.cases_time_series[0].dailyconfirmed)))
            
        })
        
    }
    CreateData(){
        FinalData = {
            date:{
                ...daily.tested.cases_time_series
            }
        }
        
        for(let key in FinalData.date)
        {
            datas.push({
                id:key,
                date:FinalData.date[key].date+'2020',
                dailyconfirmed:FinalData.date[key].dailyconfirmed

            })
        }
        console.log(datas)
    }
    
    chart(){
        var vdata = {
            0:{
            date:'2007-04-23',
            value: 93.24
            },
            1:{
                date:'2007-04-23',
                value: 93.24
                },
                2:{
                    date:'2007-04-23',
                    value: 93.24
                    },
                    3:{
                        date:'2007-04-23',
                        value: 93.24
                        },
                        4:{
                            date:'2007-04-23',
                            value: 93.24
                            }
        }
        console.log(vdata,"vdata")
        var data =vdata
        console.log(data.date)
        var margin = ({top: 20, right: 30, bottom: 30, left: 40})
        var height = 500
        var width = 500
        
        const line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y(d => y(d.value))

           const x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

   const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

   const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    // .call(g => g.select(".domain").remove())
    // .call(g => g.select(".tick:last-of-type text").clone()
    //     .attr("x", 3)
    //     .attr("text-anchor", "start")
    //     .attr("font-weight", "bold")
    //     .text(data.y))


        const svg = d3.select('div')
        .append('svg')
        .attr('width',width)
        .attr('height',height)

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);
        
           

        }
    


    
    render(){
        return(
            <div>
                LineChart2.js
                <button onClick={this.CreateData}>Data</button>
                <button onClick={this.chart}>Chart</button>

            </div>
        )
    }
}

export default LineChart2