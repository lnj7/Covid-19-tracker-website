import React, { useEffect ,useState, useRef} from 'react'
import * as d3 from 'd3' 
import Axios from 'axios'
import MapNavigation from './MapNavigation'


// import DataSection from './DataSection'

import * as topojson from 'topojson'
import classes from './TestMap.module.css'
import Display from './Display'
// var stat= null
var Response = {}
function TestMap (props){
    var myref = useRef(null)
    // console.log("TEstMAp")
          const [ChangeCountry,SetChangeCountry] =useState({
            country_Name:'',
            flag:false
          })
          
          const [state_Name,SetState_Name] = useState({
            state_Name:'India',
            ActiveCases:'',
            Confrim:'',
            Death:'',
            Recoverd:''
          
          });
          useEffect(()=>{
            // console.log("ChangeCountry")
            if(ChangeCountry.country_Name==='world')
            map(ChangeCountry.country_Name)
            else
            map("india")
          },[ChangeCountry])

          const [Global,SetGlobal]= useState({
            country_Name:'',
            total_Active:'',
            total_confirm:'',
            total_death:'',
            total_recoverd:''

          })

          useEffect(()=>{
            // console.log("Global_Effect")
          },[Global])

          const [ToggleMap,SetToggleMap]=useState({
            ChangeMap:false
          })

          const [Region,SetRegion]=useState({
            Region_Name:'india',
            Region_Flag:true,//india,
            statewiseMap:false
          })
          
          useEffect(()=>{
            // console.log("2nd Effect")
            SetToggleMap({
              ChangeMap:true
            })
            if(Region.statewiseMap)
            map(Region.Region_Name)
          
                        
            
          },[Region])
         
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
            // console.log(ToggleMap.ChangeMap)
          },[ChangeRegion.ActiveCases])
            // useEffect(()=>{
            // },[state_Name])  

            // useEffect(()=>{
            //   console.log(ChangeRegion.Region)
            //   map(ChangeRegion.Region)
            // },[ChangeRegion])
          
                function map(region){
                          
                                // console.log(`WindowInner=${winWidth} and width ${widths} scalingFactor ${ScallingFactor} ==${mapHeight}}`)
                                // console.log(region)
                                var MapType = 'MapSection'
                                
                                if(region!=='india'){
                                  // console.log("toggle")
                                  // d3.selectAll(`#${MapType} > *`).remove()
                                d3.selectAll("svg").remove()
                                
                                MapType='MapSection'
                                  
                                }
                                else{
                                  d3.selectAll("svg").remove()
                                
                                MapType='MapSection'
                                }
                                
                                
                                var data = d3.map();
                                
                                if(region==='india')
                                Axios.get('https://api.covid19india.org/data.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                
                                else{
                                  Axios.get('https://api.covid19india.org/state_district_wise.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                }
                                //${region}
                                d3.json(`./Maps/${region}.geojson`).then(function(data){
                                    // console.log(data,"delhi")
                                    ready(data)
                                })
                                d3.json(`./Maps/india.json`).then(function(data){
                                  // console.log(data,"delhi")
                                  const topology = topojson.feature(
                                    data,
                                    data.objects["india-districts-2019-734"|| "india-states"]
                                  );
                                  // console.log(topology)
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
                                          if(region!=='india')
                                          var Stroke_Color_for_Map ='black'
                                          var projection = d3.geoMercator()
                                            .fitSize([280,360],todo)
                                          var path = d3.geoPath(projection)

                                          // console.log(todo)
                                          var svg = d3.select(`#Map_data`)
                                          .append('svg')
                                          // .attr('width','80%')
                                          // .attr('height','50%')
                                          .attr('viewBox',"0 0 400 700")
                                          .attr("margin-left","1px")
                                          .attr("id",`the_SVG_ID_${MapType}`)
                                          .attr("class",classes.SVG_FOR_MAP)
                                          .style("margin-top","10%")
                                          // .style('position','absolute')
                                          
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
                                          
                                                    // stat = d.properties.st_nm
                                                    if(region==='india')
                                                    {
                                                      // console.log(d)
                                                      // console.log(d.properties,"mouseOver")

                                                    var [state,active_india,confirm,deat,recoverd]=MapNavigation(d.properties,Response,region)
                                                    SetState_Name({
                                                      state_Name:state,
                                                      Confrim:confirm,
                                                      Recoverd:recoverd,
                                                      ActiveCases:active_india,
                                                      Death:deat
                                                    })
                                                  }
                                                  
                                                  else{
                                                    try{
                                                    var [districtName,active,Confirm,death,recovered] = MapNavigation(d.properties,Response,region)
                                                      SetChangeRegion({
                                                        DistrictName:districtName,
                                                        ActiveCases:active,
                                                        ConfirmCases:Confirm,
                                                        Deaths:death,
                                                        Region:region,
                                                        recovered:recovered,
                                                        ChangeMap:true
                                                        
                                                      })
                                                    }
                                                    catch{

                                                    }
                                                    }

                                                   

                                                    
                                                    if(region==='india'){
                                                      
                                                      

                                                      for(var key in Response.data.statewise)
                                                      {
                                                        if(d.properties.st_nm===Response.data.statewise[key].state)
                                                        {
                                                          var CheckKey =parseInt(key)
                                                          d3.select(`[id="${key}"]`)
                                                            .transition()
                                                            .duration(100)
                                                            .style("background-color","rgb(50, 71, 170)")
                                                         
                                                        }
                                                      }
                                                      

                                                      
                                                    }
                                                    
                                                  }
                                                  
                                                  let ChangeCountryMouseOver = function(d)
                                                  {
                                                    var country_Name,f
                                                    if(ChangeCountry.country_Name==='world')
                                                    {
                                                      country_Name='india'
                                                      f=false
                                                    }  
                                                    else{
                                                      country_Name='world'
                                                      f=true
                                                    }
                                                    SetChangeCountry({
                                                        country_Name:country_Name,
                                                        flag:f
                                                      })
                                                    SetChangeRegion({
                                                      ChangeMap:false
                                                    })
                                                      // if(ChangeCountry.flag){
                                                      // d3.select("#Change_Country_Button")
                                                      // .attr('disabled',true)
                                                      // }
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
                                                                      if(region==='world'){
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
                                                    
                                                                          else{
                                                                        for(var key in Response.data.statewise)
                                                                        {
                                                                          if(d.properties.st_nm===Response.data.statewise[key].state)
                                                                          {
                                                                            d3.select(`[id="${key}"]`)
                                                                              .transition()
                                                                              .duration(100)
                                                                              .style("background-color","transparent")
                                                                          }
                                                                        }
                                                                      
                                                                      }
                                                                    }
                                                  let onClick = function(d)
                                                                    {
                                                                      if(region==='india'){
                                                                      d3.selectAll('.State')
                                                                      .transition()
                                                                      .duration(200)
                                                                      .style("opacity", .8)
                                                                      d3.select(this)
                                                                      .transition()
                                                                      .duration(200)
                                                                      .style("stroke",'transparent')
                                                                      
                                                                      svg.selectAll("*").remove()
                                                                      SetRegion({
                                                                        Region_Name:(d.properties.st_nm).replace(" ","").toLowerCase(),
                                                                        statewiseMap:true
                                                                
                                                                      })
                                                                      // d3.select("#update")
                                                                      // .remove()
                                                                      // d3.select("#TableView")
                                                                      // .append("<div><TableData/></div>")
                                                                    }
                                                                    }
                                                    let onTouch= function(d){
                                                      d3.select('.State')
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity",.8)
                                                      d3.select(this)
                                                      .transition()
                                                      .duration(200)
                                                      .style('stroke','orange')
                                                    }
                                                  // Draw the map
                                                  svg.append("g")
                                                  .style('margin-left',10)
                                                    .selectAll("path")
                                                    .data(todo.features)
                                                    .enter()
                                                    .append("path")
                                                    
                                                      // draw each country
                                                      // .attr("d", d3.geoPath()
                                                      //   .projection(projection)
                                                      // )
                                                      .attr("d",path)
                                                  // set the color of each country
                                                  .attr("fill", function (d,i) {
                                                    
                                                    d.total = data.get(d.id) || 0;
                                                    // console.log(region)
                                                    if(region==='world')
                                                    return d3.interpolatePiYG((i)/1000)
                                                    
                                                    return d3.interpolatePiYG(d.properties.st_code/100)
                                                  })
                                                  
                                                  .style("stroke",Stroke_Color_for_Map)
                                                  .attr("class", function(d){ 
                                                  
                                                    if(region==='world')
                                                    return (d.properties.name).replace(" ","").toLowerCase()
                                                    else
                                                    return (d.properties.st_nm).replace(" ","").toLowerCase() } )
                                                  // .attr("id",function(d){
                                                  //   return d.properties.st_nm
                                                  // })
                                                  // .attr("class","world")
                                                  .style("opacity", .8)
                                                  .on("mouseover", mouseOver )
                                                  .on("mouseleave", mouseLeave )
                                                  .on("click",onClick)
                                                  .on('touchstart',onTouch)

                                                    d3.select('#Change_Country_Button')
                                                    .on('click',ChangeCountryMouseOver)

                                                    // d3.select('#ChangeCountryByButton_India')
                                                    // .on('click',ChangeCountryByButton_India)

                                        }
                        
                                     
                              }
  // console.log(this.state.stateName,"stafdcg")
  if((props.MapRegion==='india')&&(!ChangeCountry.flag)&&(!ChangeRegion.ChangeMap)){
  return(
    <div data={state_Name.Confrim}>
      {/* <h2 style={{color:'white'}}>{state_Name.state_Name}</h2> */}
     <Display state_Name={state_Name.state_Name} Confirm={state_Name.Confrim}
        ActiveCases={state_Name.ActiveCases} Recoverd={state_Name.Recoverd}
        Death={state_Name.Death}
        DarkMode={props.DarkMode}
     />
    
    </div>
  )}
  else if((ChangeCountry.country_Name==='world')&&(ChangeCountry.flag))
  {
    return (
    <div data={Global.total_confirm}>
    <Display state_Name={Global.country_Name} Confirm={Global.total_confirm}
        ActiveCases={Global.total_Active} Recoverd={Global.total_recoverd}
        Death={Global.total_death}
        DarkMode={props.DarkMode}
        />
                

        </div>
    )
  }
    else {
      return(
        <div>
          <Display state_Name={ChangeRegion.DistrictName} Confirm={ChangeRegion.ConfirmCases}
        ActiveCases={ChangeRegion.ActiveCases} Recoverd={ChangeRegion.recovered}
        Death={ChangeRegion.Deaths}
        DarkMode={props.DarkMode}

     />
      
      </div>
      )
    }


}
  


export default TestMap