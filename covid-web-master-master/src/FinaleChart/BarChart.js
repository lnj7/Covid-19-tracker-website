import React, { useState } from 'react'
import * as d3 from 'd3'

function BarChart(props){
    // console.log("BarChart")
    const [TopEffectedState,SetTopEffectedState] = useState({
        EffectedState:[]
    })
    var innerWidth =window.innerWidth
    if(innerWidth<600)
    {
        innerWidth=innerWidth-80
    }
    else
    {
        innerWidth=460
    }
    var TopEffectedStateArray = []
    // const  {data} =useSWR(`${props.Link}`,url=>
    // fetch(url)
    // .then(res=>{
    //     res.json()
    // }))
    
    // var data =await getData(props.Link)
    var data=true
    if(data){
        console.log(data)
        if(props.MapRegion==='india'){
        var count = 0
        for(var key in props.IndiaResponse.statewise)
        {
            if((key!=='0')&&(count!==4) &&(key!=='5') )
            {
                TopEffectedStateArray.push({
                    State_Name:props.IndiaResponse.statewise[key].state,
                    ConfimrCases:props.IndiaResponse.statewise[key].confirmed,
                    ActiveCases:props.IndiaResponse.statewise[key].active,
                    RecoverCases:props.IndiaResponse.statewise[key].recovered,
                    DeathCases:props.IndiaResponse.statewise[key].deaths,
                    UpdatedTime:props.IndiaResponse.statewise[key].lastupdatedtime
                })
                count++
            }       
        }
    }
    else if(props.MapRegion==='world')
    {
        var count=0
        for(var key in props.WorldResponse)
        {
            if((key!=='0')&&(count!=5) )
            {
                TopEffectedStateArray.push({
                    State_Name:props.WorldResponse[key].Country_text,
                    ConfimrCases:props.WorldResponse[key]['Total Cases_text'],
                    ActiveCases:props.WorldResponse[key]['Active Cases_text'],
                    RecoverCases:props.WorldResponse[key]['Total Recovered_text'],
                    DeathCases:props.WorldResponse[key]['Total Deaths_text'],
                    UpdatedTime:props.WorldResponse[key]['Last Update']
                })
                count++
            }
        }
       
        
    }
        if(props.MapRegion==='india'){
        TopEffectedStateArray.sort(function(a,b){
            return a.ConfimrCases - b.ConfimrCases
        })
        }
        else{       
             TopEffectedStateArray.sort(function(a,b){
                 return parseInt(a.ConfimrCases.replace(",","").replace(",","")) -parseInt(b.ConfimrCases.replace(",","").replace(",",""))
             })
        }
    d3.select("#BarChart")
        .select('svg').remove()
    var svg = d3.select("#BarChart")
        .append('svg')
        .attr("width","100%")
        .attr("height","400px")
    console.log(svg)
    var X_AXIS = d3.scaleBand()
            .range([0,innerWidth])
            .domain(TopEffectedStateArray.map(function(d){
                
                return d.State_Name
            }))
    svg.append("g")
    .call(d3.axisBottom(X_AXIS))
    .attr("transform",'translate(30,350)')
    .selectAll("text")
    .attr("transform","translate(-23,-47)rotate(-90)")
    .style("color",props.DarkMode?'white':'black')
    .style("font-weight","bold")
    .style("font-size","13px")
    
    if(props.MapRegion==='india'){
    var Y_AXIS =d3.scaleLinear()
            .range([230,0])
            // .domain(TopEffectedStateArray.map(function(d){
            //     console.log(d.ConfimrCases)
            //     return d.ConfimrCases
            // }))
            .domain([0,350000])
            // .domain([0,d3.max(TopEffectedStateArray,function(d){
            //     // console.log(d.ConfimrCases)
            //     return parseInt(d.ConfimrCases)
            // })])
    }
    else{
        var Y_AXIS =d3.scaleLinear()
            .range([230,0])
            // .domain([0,3000000])
            .domain([0,d3.max(TopEffectedStateArray,function(d){
                // console.log(d.ConfimrCases)
                return parseInt(d.ConfimrCases.replace(",","").replace(",",""))
            })])
    }      

    svg.append('g')
    .call(d3.axisLeft(Y_AXIS).ticks(10,"~s"))
    .attr("transform","translate(30,120)")

    svg.selectAll("mybar")
        .data(TopEffectedStateArray)
        .enter()
        .append("rect")
        .attr("x",function(d){
            return X_AXIS(d.State_Name)
        })
        .attr("y",function(d){
            // console.log(Y_AXIS(d.ConfimrCases))
            return Y_AXIS(parseInt(d.ConfimrCases.replace(",","").replace(",","")))
        })
        .attr("width",X_AXIS.bandwidth()-10)
        .attr("height",function(d){
            return 230 -Y_AXIS(d.ConfimrCases.replace(",","").replace(",",""))
        })
        .attr("transform",'translate(40,120)')
        .attr('fill','red')
        .style("opacity",".5")
        
    }

    
    // if(!data)
    // return <div className={SpinnerClass.loader} >Loading</div>
    if(!data)
    return <div></div>
    return(
        <div id="BarChart" style={{height:"410px",width:"100%"}}>
            
        </div>
    )
}

export default BarChart