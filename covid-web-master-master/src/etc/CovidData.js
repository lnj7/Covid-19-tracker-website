import React, { Component } from 'react'
import Axios from 'axios'
import * as d3 from 'd3'
import { json } from 'd3'
import Axis from './Axex'
var daily ={}
class CovidData extends Component
{
    constructor(props)
    {
        super(props)
        this.myref = React.createRef()
    }
    getdata=()=>{
        Axios.get("https://api.covid19india.org/data.json").then(function(data){
            console.log(data.data.cases_time_series)
        })
        console.log(daily.tested.cases_time_series[0])

    }
    componentDidMount(){
        Axios.get("https://api.covid19india.org/data.json").then(function(res){
           for(let data in res.data)
            {
                daily={
                 [data]:res.data
                }
            }
            console.log(daily)
            
        })
        
    }
    
    
    
    render(){
        return(
            <div>
                <button onClick={this.getdata}>get</button>
                {/* <div ref={this.myref}>Test</div>
                <p ref={this.myref}>hello </p>
        <p>heoooooo</p>*/}
                <button onClick={this.chart}>chart</button>
                
            </div>
        )
    }
}

export default CovidData