import React from 'react'
import MapPartResponse from "../ScreenResponse/MapPartResponse";
import TablePartResponse from '../ScreenResponse/TablePartResponse'
import { Grid, ThemeProvider ,Paper} from '@material-ui/core';
import theme from '../MaterialUi/theme'
var innerWidth = window.innerWidth

const IndiaMainPart = ({DarkMode})=>{
    console.log(innerWidth,"&&&&&&&&&&")
    return(
                
            <Grid item direction="row" lg={12} xs={12} container wrap="wrap" style={{marginTop:innerWidth<=600?"15%":"0%"}}>
            
            <Grid item xs={12} lg={5.5} xl={6} style={{marginTop:'5%'}}>
                <TablePartResponse DarkMode={DarkMode}/>
            </Grid>
            <Grid item xs={12} lg={6} xl={6} style={{marginTop:'5%'}}>
                <MapPartResponse DarkMode={DarkMode}/>
            </Grid>
        </Grid>
       
    )
}
export default IndiaMainPart