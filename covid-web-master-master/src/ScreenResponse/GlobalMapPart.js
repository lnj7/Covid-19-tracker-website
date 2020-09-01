import React, { Suspense, Component } from 'react'
import SpinnerClass from '../MapPractice/DrawMap/Spinner.module.css'
// import MapStates from './MapStates'
import classes from '../MapPractice/DrawMap/MapStates.module.css'
import GlobalHomeScreen from '../Screen/GlobalHomeScreen'
import useSWR from 'swr'
import {Button,Container} from '@material-ui/core'
import axios from 'axios'
import TablePart from '../Screen/TablePart'
import MapPart from '../Screen/MapPart'
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

const GlobalMapPartResponse= ({DarkMode})=>
{
   
    
    return(
        <div>
          <Container maxWidth="sm" >

            <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
    <GlobalHomeScreen
        MapRegion={"world"}
        DarkMode={DarkMode}
    />
    </Suspense>
    

    <div id="Global_Map_data" className={classes.Map_data}>
    </div>
    </Container>
        </div>
    )
}

export default GlobalMapPartResponse