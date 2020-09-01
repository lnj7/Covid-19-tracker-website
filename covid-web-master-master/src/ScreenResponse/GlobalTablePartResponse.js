import React, { Suspense, Component } from 'react'
import SpinnerClass from '../MapPractice/DrawMap/Spinner.module.css'
// import MapStates from './MapStates'
import GlobalTablePart from '../Screen/GlobalTablePart'
import useSWR from 'swr'
import {Button} from '@material-ui/core'
import axios from 'axios'
import TablePart from '../Screen/TablePart'
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

const GlobalTablePartResponse= ({Ayush})=>
{
    // console.log("DataSection")
    
    
    
    const {data} = useSWR(World_Url,fetcher)

    

    if(!data){
        return <div className={SpinnerClass.loader} >Loading</div>
    }
    
    return(
        <div>
            <Suspense fallback={<div className={SpinnerClass.loader}></div>}>
        <GlobalTablePart WorldData={data} Ayush={Ayush}/>
        </Suspense>
        </div>
    )
}

export default GlobalTablePartResponse