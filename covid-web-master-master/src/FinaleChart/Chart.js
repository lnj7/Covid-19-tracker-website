import React from 'react'
import * as d3 from 'd3'
import useSWR from 'swr'
import { select } from 'd3'
var TimeConv = d3.timeParse('%d %B %Y')
var WTimeConv = d3.timeParse("%Y-%m-%d")
function Chart(props)
{
    var innerWidth =window.innerWidth
    if(innerWidth<600)
    {
        innerWidth=innerWidth-80
    }
    else
    {
        innerWidth=460
    }
    var t =props.Type
    var DataForChart =[]

    const  {data} =useSWR("https://api.covid19india.org/data.json",url=>
    fetch(url)
    .then(res=>{
        res.json()
    }))
    // var data=true
    if(props.MapRegion==='india'){
    if(props.Type==="dailyconfirmed")
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailyconfirmed
            })
        }
    else if(props.Type==="dailyrecovered")  
    {
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailyrecovered
            })
        }
    }
    else if(props.Type==="dailydeceased")
    {
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailydeceased
            })
        }
    }
    }
    else if(props.MapRegion==='world' && data)
    {
        if(props.Type==="dailyconfirmed")
        {
        // console.log(parseInt((props.WorldResponse[2]["Total Cases_text"]).replace(",","").replace(",","")))
        console.log(props.WorldResponse)
        for(var key in props.WorldResponse)
        {
            try{
                if((props.WorldResponse[key]["Last Update"]===undefined )&&(key!=="216")&&(key!=='0'))
                {
                    DataForChart.push({
                        Date:"2020-06-29 12:15",
                        // Confirm:parseInt((props.WorldResponse[key]["Total Cases_text"]).replace(",","").replace(",",""))
                        Confirm:props.WorldResponse[key]["Total Cases_text"]
                    })
                }
                else if((key!=="216")&&(key!=='0')){
                    DataForChart.push({
                        Date:props.WorldResponse[key]["Last Update"],
                        // Confirm:parseInt((props.WorldResponse[key]["Total Cases_text"]).replace(",","").replace(",",""))
                        Confirm:props.WorldResponse[key]["Total Cases_text"]
                    })
                }
                // if(props.WorldResponse[key]["Total Cases_text"]===undefined)
                // {
                //     console.log("unddsfbsh=",key)
                // }
            }
            catch{
                console.log(props.WorldResponse[key]["Last Update"])
            }
        }
        }

    }
    function mouseover(d)
    {
        // console.log(d)
        d3.select(`.January${props.TypeID}`)
        .attr("stroke","green")
        d3.select(this)
        .attr("stroke",function(d,i){
            console.log(d[i].Confirm)
            return ["orange","green","red"]
        })
    }
        // d3.select("#ChartS")
        // .select("svg")
        // .remove()
    
        d3.select(`#${props.TypeID}`)
            .select("svg").remove()
        var svg =d3.select(`#${props.TypeID}`)
        .append("svg")
        .attr("height","250px")
        .attr("width","100%")
        .style("background-color",props.background)
        .style("border-radius","5px")
    var X_AXIS = d3.scaleUtc()
                .range([0,innerWidth])
                .domain(d3.extent(DataForChart,function(d){
                    var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
                    if(props.MapRegion==='india'){
                    var date = TimeConv(d.Date+"2020")
                        // console.log(d.Date)
                    }
                    else{
                        try{
                        var spilt = d.Date.split(" ")
                        var date =  WTimeConv(spilt[0])

                        
                        
                        }
                        catch{
                            console.log(date,"---",spilt)
                            date= "Sat Jun 20 2020 00:00:00 GMT+0530 (India Standard Time)"
                        }
                    }
                    // var fulldate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
                    return date}))
              
    var scale = d3.axisBottom(X_AXIS)
                // .tickFormat(d3.timeFormat('%m'))
                .scale(X_AXIS)               
        
        svg.append("g")
        .call(scale)
        .attr("transform","translate(30,200)")
           
    if(props.MapRegion==='india'){
    var Y_AXIS = d3.scaleLinear()
                .range([200,0])
                .domain([0,d3.max(DataForChart,function(d){
                
                    return parseInt((d.Confirm).replace(",","").replace(",",""))
                })])
            }
    else{
        var Y_AXIS = d3.scaleLinear()
        .range([200,0])
        // .domain([0,10000000])
        .domain([0,d3.max(DataForChart,function(d){
            try{
            return parseInt((d.Confirm).replace(",","").replace(",",""))
            }
            catch{
                console.log("bfhsjbdfjhs")
                return parseInt("0")
            }
        })])
    }
        svg.append("g")
            .call(d3.axisLeft(Y_AXIS).ticks(10,"~s"))
            .attr("transform","translate(40,0)")
            
        svg.append("path")
            .datum(DataForChart)
            .attr("fill","rgb(209,141,128,.5)")
            .attr("stroke","black")
            .attr("stroke-width","1.5")
            .attr("transform","translate(40,0)")
            .attr("width","50%")
            .attr("d",d3.area()
        

            .x(function(d){
                 
                var date
                if(props.MapRegion==='india'){
                date = TimeConv(d.Date+"2020")
            
                }
                else{
                    try{
                        var spilt = d.Date.split(" ")
                        date =  WTimeConv(spilt[0])

                        // console.log(typeof(spilt[0]))
                        
                        }
                        catch{
                            console.log("qweyrwioqi")
                            date="Sat Jun 20 2020 00:00:00 GMT+0530 (India Standard Time)"
                        }
                    }
                
                return X_AXIS(date)
                
            })
            .y0(Y_AXIS(0))
            .y1(function(d){
                if(props.MapRegion==='india'){
                    // console.log((d.Confirm).replace(",","").replace(",",""))
                return Y_AXIS((d.Confirm).replace(",","").replace(",",""))
                }
                else{
                    try{
                    var con =(d.Confirm).toString()
                    // console.log((d.Confirm).replace(",","").replace(",",""))
                    Y_AXIS(parseInt((d.Confirm).replace(",","").replace(",","")))}
                    catch{
                        console.log("pooiuy")
                        Y_AXIS("0")
                    }
                }
            })
                
                // else{
                // return Y_AXIS(d.Confirm)
                // }
            )
    
            .attr("class",function(d,i){
                var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

                // console.log(month[i])
                return month[i]+props.TypeID
            })
            .on("mouseover",mouseover)
    if(!data)
    return <div></div>
    return(
        <div id={"ChartS"}>

        </div>
    )
}

export default Chart