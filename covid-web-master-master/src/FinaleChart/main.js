import React, { Component } from 'react'
import * as d3 from 'd3'
import {line,curveMonotoneX} from 'd3-shape'
import AxisMain from './axis'
import { select } from 'd3'
import Axios from 'axios'
var TimeConv = d3.timeParse('%d %B %Y')
var daily = {}
var FinalData = {}
var datas = []
class Main extends Component
{
    state= {
        data: [
            { name: 'Jan', value: 30 },
            { name: 'Feb', value: 10 },
            { name: 'Mar', value: 50 },
            { name: 'Apr', value: 20 },
            { name: 'May', value: 80 },
            { name: 'Jun', value: 30 },
            { name: 'July', value: 0 },
            { name: 'Aug', value: 70 },
            { name: 'Sep', value: 10 },
            { name: 'Oct', value: 55 },
            { name: 'Nov', value: 60 },
            { name: 'Dec', value: 80 },
          ]
    }
    
    chart=()=>{
        const data = datas
        const parentwidth = 500
        const margin = {top:20,left:20,bottom:20,right:20}
        const width = parentwidth -margin.left-margin.right
        const height = 200 -margin.top-margin.bottom
        /*-----------------------------CREATE SVG------------------------------*/
        var svg  = d3.select('div')
                    .append('svg')
                    .attr('width',width+50)
                    .attr('height',height+50)

        /*-----------------------------SCALEING FOR X AND Y AXIS---------------- */
        var x_scale = d3.scaleBand()
                    .domain(data.map(d=>TimeConv(d.name)))
                    // .domain([new Date("2020-01-01"), new Date("2020-03-05")])
                    // .domain(d3.extent(data,function(d,i){
                    //     return TimeConv(d.date)
                    // }))
                    // .domain([new Date(2020,0,1),new Date(2020,3,11)])        

                    .range([0,width])

        var y_scale = d3.scaleLinear()
        .range([height,0])            
        .domain([(0),d3.max(data,function(d,i){
            return d.value
        })])
        .nice()

        /*-----------------------------AXISES-------------------------------------- */
        var X_AXIS = d3.axisBottom()
            .ticks(d3.timeDay.every(10))
            .tickFormat(d3.timeFormat('%b %d'))
            .scale(x_scale)

        var pre = d3.format(".2s")

        console.log(d3)
        var Y_AXIS = d3.axisLeft()
            .scale(y_scale)
            .tickFormat(function(d){return pre(d)})
            
        /*-----------------------------APPEND IN GROUP-------------------------------*/
        svg.append('g')
        .attr("transform",`translate(150, 10)`)
        .call(Y_AXIS)
        .attr('fill','none')
        .attr('stroke','red')
        
        svg.append('g')
        .attr("transform",`translate(150,${height})`)
        .call(X_AXIS)
        .attr('fill','none')
        .attr('stroke','purple')
        /*-----------------------------BACKGROUND SET USING 'rect'------------------- */
        svg.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('fill','red')
        .attr('opacity',.3)
        .attr('transform',`translate(150,10)`)
        /*--------------------------------LINE DRAWAING---------------------------------- */
        AxisMain(data,x_scale,y_scale)
    
    }
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
        
        for(let key in FinalData.date)
        {
            datas.push({
                
                name:FinalData.date[key].date+'2020',
                value:FinalData.date[key].totalconfirmed

            })
        }
        var pre = d3.format(".2s")
        
        console.log(pre(20000))
    }
    render(){
        console.log(this.state.data,"[DATA]-MAin.js")
        return(
            <div>
                Click on button to Generate SingleLine Chart with Date
                
                <button onClick={this.chart}>button</button>
                <button onClick={this.CreateData}>Data</button>
            </div>
        )
    }
}

export default Main