import React, { Suspense, Component } from 'react'
import SpinnerClass from './Spinner.module.css'
// import MapStates from './MapStates'
import useSWR from 'swr'
import {Button} from '@material-ui/core'
import axios from 'axios'
const MapStates = React.lazy(()=>import('./MapStates'))
var count =0
var India_URl ="https://api.covid19india.org/data.json"
var World_Url ="https://covid-19.dataflowkit.com/v1"
var Test_URL ="https://thevirustracker.com/free-api?global=stats"
const DEFAULT_QUERY = 'redux';

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
var l =true

function DataSection(props)
{
    // console.log("DataSection")
    var ResponseData=''
    
    const {data:cases_time_series} = useSWR(India_URl,fetcher)
    
    const {data} = useSWR(World_Url,fetcher)

    

    if((!cases_time_series)&&(!data)){
        return <div className={SpinnerClass.loader} >Loading</div>
    }
    
    return(
        <div>
            <Suspense fallback={<div className={SpinnerClass.loader}></div>}>
        <MapStates ResponseData={cases_time_series} WorldData={data}/>
        </Suspense>
        {/* {ResponseData} */}
        </div>
    )
}

export default DataSection