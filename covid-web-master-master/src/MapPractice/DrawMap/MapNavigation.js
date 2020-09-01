import React, { useRef } from 'react'
import * as d3 from 'd3'
function MapNavigation(Region,response,MapName){
    // console.log(response.data[2]["Total Cases_text"])
   
    // console.log(response)
    var data= {
        ...response.data.statewise
    }
    var country_response={
        ...response.data
    }
    // var svg = useRef(null)
    //     console.log(svg)
    
    // console.log(response)
    if(MapName==='india'){
    for(var key in data)
    {
        if(Region.st_nm===response.data.statewise[key].state)
        {
            // console.log("Active Cases in-> ",response.data.statewise[key].state,"is-> ",response.data.statewise[key].deaths)
            return  [response.data.statewise[key].state,
            response.data.statewise[key].active,
            response.data.statewise[key].confirmed,
            response.data.statewise[key].deaths,
            response.data.statewise[key].recovered
            ]
        }
    }
    }
    else if(MapName==='world')
    {
        for(var key in country_response)
        {
            
            if(response.data[key].Country_text===Region.name)
            {
                return [response.data[key].Country_text,
                        response.data[key]['Total Cases_text'],
                        response.data[key]['Active Cases_text'],
                        response.data[key]['Total Recovered_text'],
                        response.data[key]['Total Deaths_text']

                ]
            }
        }
        
    }
    else{
        try{
        console.log("MapNaviGation District",response.data[Region.st_nm].districtData[Region.district].confirmed)
        var state_name_response = Region.st_nm 
        var district_name_response = Region.district
        
        
        // console.log(DistrictData)

        
        // console.log(response.data[state_name_response].districtData[district_name_response])
        return[
            district_name_response,
            response.data[state_name_response].districtData[district_name_response].active,
            response.data[state_name_response].districtData[district_name_response].confirmed,
            response.data[state_name_response].districtData[district_name_response].deceased,
            response.data[state_name_response].districtData[district_name_response].recovered
        ]
        }
        catch{
            console.log("distict fetching error")
        }
    }
    
}

export default MapNavigation