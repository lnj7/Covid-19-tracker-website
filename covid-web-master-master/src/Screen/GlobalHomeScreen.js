import React, { useEffect ,useState, useRef} from 'react'
import * as d3 from 'd3' 
import Axios from 'axios'
import MapNavigation from '../MapPractice/DrawMap/MapNavigation'

// import DataSection from './DataSection'

import * as topojson from 'topojson'
import classes from '../MapPractice/DrawMap/TestMap.module.css'
import Display from '../MapPractice/DrawMap/Display'
// var stat= null
var Response = {}
const  GlobalHomeScreen =(props)=>{
    const [ChangeCountry,SetChangeCountry] =useState({
        country_Name:'',
        flag:false
      })   
      const [Global,SetGlobal]= useState({
        country_Name:'',
        total_Active:'',
        total_confirm:'',
        total_death:'',
        total_recoverd:''

      })
      useEffect(()=>{
        console.log("Global_Effect")
        
      },[Global])
      const [ChangeRegion,SetChangeRegion]=useState({
        Region:'indias',
        ChangeJsonData:'',
        DistrictName:'',
        ActiveCases:'',
        ConfirmCases:'',
        Deaths:'',
        ChangeMap:false,
        recovered:''
      }) 
        useEffect(()=>{
            Map()
        },[])

                          
        // console.log(`WindowInner=${winWidth} and width ${widths} scalingFactor ${ScallingFactor} ==${mapHeight}}`)
        // console.log(region)
        const Map=()=>{
        var MapType = 'MapSection'
        if(props.MapRegion!=='india')
        var Stroke_Color_for_Map ='black'
        
        
          d3.selectAll("svg").remove()
        
        MapType='MapSection'
        
        
        
        var data = d3.map();
        
        
        if(props.MapRegion==='world')
        {
          Axios.get('https://covid-19.dataflowkit.com/v1').then(function(res){
            // console.log(res,"world")
            Response={
              ...res
            }
          })
        }
       
        //${region}
        d3.json(`./Maps/${props.MapRegion}.geojson`).then(function(data){
            // console.log(data,"delhi")
            ready(data)
        })
        
                function ready(todo) 
                {
                  // console.log(Response)
                  var innerWidth = window.innerWidth
                  var innerHeight = window.innerHeight
                  if(innerWidth>1000)
                  {
                    innerWidth=360
                    innerHeight=380
                  }
                  else{
                    innerWidth=450
                    innerHeight=450
                  }
                 
                  var projection = d3.geoMercator()
                    .fitSize([280,360],todo)
                  var path = d3.geoPath(projection)

                  // console.log(todo)
                  d3.selectAll("svg")
                  .remove()
                  var svg = d3.select(`#Global_Map_data`)
                  .append('svg')
                  // .attr('width','80%')
                  // .attr('height','50%')
                  .attr('viewBox',"0 0 400 700")
                  .attr("margin-left","1px")
                  .attr("id",`the_SVG_ID_${MapType}`)
                  .attr("class",classes.SVG_FOR_MAP)
                  .style("margin-top","10%")
                  let mouseOver = function(d) {
                    d3.selectAll(".State")
                      .transition()
                      .duration(200)
                      .style("opacity", .5)
                    d3.select(this)
                      .transition()
                      .duration(200)
                      .style("opacity", 1)
                      .style("stroke", "black")
                    // console.log(d)
                    try{
                    d3.selectAll("#2")
                      .text("helllo")
                    }
                    catch{
                      // console.log("Selector")
                    }
                    if(props.MapRegion==='world')
                            {
                                try{  
                            var[country_Name,total_confirm,total_Active,tatal_recoverd,total_death]=MapNavigation(d.properties,Response,props.MapRegion)

                                SetGlobal({
                                country_Name:country_Name,
                                total_confirm:total_confirm,
                                total_Active:total_Active,
                                total_death:total_death,
                                total_recoverd:tatal_recoverd
                                })
                            }
                            catch{
                                SetGlobal({
                                country_Name:d.properties.name,
                                total_confirm:'0',
                                total_Active:'0',
                                total_death:'0',
                                total_recoverd:'0'
                                })
                            }
                            }
                }
                          
                let mouseLeave = function(d) 
                {
                  d3.selectAll(".State")
                    .transition()
                    .duration(100)
                    .style("opacity", 1)
                  d3.select(this)
                    .transition()
                    .duration(100)
                    .style("stroke", "transparent")
                  if(props.MapRegion==='world'){
                    for(var key in Response.data)
                            {
                                try{
                              if((Response.data[key].Country_text).replace(" ","").replace(" ","")===d.properties.name)
                              {
                                d3.select(`[id="${key}"]`)
                                  .transition()
                                  .duration(100)
                                  .style("background-color","transparent")
                                  
                              }
                              }
                              catch{
                                console.log(Response.data[key].Country_text,key,Response)
                              }
                            }
                      }
                    }
                         
                          
                          svg.append("g")
                          .style('margin-left',10)
                            .selectAll("path")
                            .data(todo.features)
                            .enter()
                            .append("path")
                            
                             
                              .attr("d",path)
                          .attr("fill", function (d,i) {
                            
                            d.total = data.get(d.id) || 0;
                            // console.log(region)
                            if(props.MapRegion==='world')
                            return d3.interpolatePiYG((i)/1000)
                            
                          })
                          
                          .style("stroke",Stroke_Color_for_Map)
                          .attr("class", function(d){ 
                          
                            if(props.MapRegion==='world')
                            return (d.properties.name).replace(" ","").toLowerCase()
                           } )
                         
                          .style("opacity", .8)
                        
                          .on("mouseover", mouseOver )
                          .on("mouseleave", mouseLeave )
                        }

                    }  
      
    
    return(
        <div data={Global.total_confirm}>
    <Display state_Name={Global.country_Name} Confirm={Global.total_confirm}
        ActiveCases={Global.total_Active} Recoverd={Global.total_recoverd}
        Death={Global.total_death}
        DarkMode={props.DarkMode}
        />
                

        </div>
    )
    }

export default GlobalHomeScreen