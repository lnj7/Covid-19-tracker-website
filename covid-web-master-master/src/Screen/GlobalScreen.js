import React, { Component, Suspense } from 'react'
import classes from '../MapPractice/DrawMap/MapStates.module.css'
import SpinnerClass from '../MapPractice/DrawMap/Spinner.module.css'
import { Container } from '@material-ui/core'
import GlobalHomeScreen from './GlobalHomeScreen'
import GlobalMapPartResponse from '../ScreenResponse/GlobalMapPart'
import {Grid} from '@material-ui/core'
import GlobalTablePartResponse from '../ScreenResponse/GlobalTablePartResponse'
const Chart = React.lazy(()=>import("../FinaleChart/Chart"))
const BarChart = React.lazy(()=>import("../FinaleChart/BarChart"))
const TestMap = React.lazy(()=>import('../MapPractice/DrawMap/ma'))
const TotalData = React.lazy(()=>import('../MapPractice/DrawMap/TotalData'))
var innerWidth=  window.innerWidth
var size =0
var SwitchMap ="World"
var link ="https://api.covid19india.org/data.json"
class GlobalScreenMainScreen extends Component{
   
    render()
    {
        
        return(
            
                <Grid item direction="row" lg={12} container wrap="wrap" style={{marginTop:innerWidth<=600?"15%":"0%"}}>
                <Grid item xs={12} lg={6} xl={6} style={{marginTop:'5%'}}>
                <GlobalTablePartResponse/>

                </Grid>
                <Grid item xs={12} lg={6} xl={6} style={{marginTop:'5%'}}>
                <GlobalMapPartResponse DarkMode={this.props.DarkMode}/>
                </Grid>
            </Grid>
        )
    }
}
export default GlobalScreenMainScreen