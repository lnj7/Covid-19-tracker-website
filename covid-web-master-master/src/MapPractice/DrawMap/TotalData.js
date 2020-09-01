import React, { useState } from 'react'
import useSWR from 'swr'
import classes from './MapStates.module.css'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import {Grid} from '@material-ui/core'
import SpinnerClass from './Spinner.module.css'
import { CardContent, Typography } from '@material-ui/core'
import NumberChange from '../../NumberChange'
const useStyles = makeStyles({
    root:{
        flexGrow:1,
        maxWidth:180,
        
        minWidth:150,
        marginBottom:5
    },
    Cardroot:{
        marginTop:'10%'
    },
    bullet:{
        display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
    },
    title:{
        fontSize: 22,

    },
    pos: {
        marginBottom: 12,
      },
})
function TotalData(props){
    // console.log("TatalDATA")
    const CLasses = useStyles()
    const {data} =useSWR(props.Link,url=>{
        fetch(url)
        .then(res=>{
            return res.json()
        })
    })
    var totalDataArray=[]

    if(data)
    {
        if(props.Country==='india')
        totalDataArray.push({
            totalconfirmed:data.statewise[0].confirmed,
            totalrecovered:data.statewise[0].recovered,
            totaldeceased:data.statewise[0].deaths,
            totalactive:data.statewise[0].active,
            Country:props.Country
        }) 
        else if(props.Country==='world')
        {
            totalDataArray.push({
                totalconfirmed:data[0]['Total Cases_text'],
            totalrecovered:data[0]['Total Recovered_text'],
            totaldeceased:data[0]['Total Deaths_text'],
            totalactive:data[0]['Active Cases_text'],
            Country:props.Country
            })
        }
    }
    
    // if(!data)
    // return <div className={SpinnerClass.loader}>loading</div>
    return(
        
        
                <Grid item container className={CLasses.Cardroot} style={{margin:20}} >
                    
                
                    <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" className={CLasses.title} color="secondary" gutterBottom>
                            {props.Country==='india'? NumberChange(totalDataArray.map(function(d){return d.totalconfirmed})):totalDataArray.map(function(d){return d.totalconfirmed})}
                            </Typography>
                            <Typography variant="h5" component="h2" color="secondary">
                                    Confirmed
                            </Typography>
                        </CardContent>

                    </Card>
                    
                            <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography className={CLasses.title} style={{color:'#2f89fc'}} gutterBottom>
                            {props.Country==='india'?NumberChange(totalDataArray.map(function(d){return d.totalactive})):totalDataArray.map(function(d){return d.totalactive})}
                            </Typography>
                            <Typography variant="h5" component="h2" style={{color:'#2f89fc'}}>
                                    Active
                            </Typography>
                        </CardContent>

                    </Card>
                    
                    
                   
                            <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography className={CLasses.title} style={{color:'green'}} gutterBottom>
                            {props.Country==='india'?NumberChange(totalDataArray.map(function(d){return d.totalrecovered})):totalDataArray.map(function(d){return d.totalrecovered})}
                            </Typography>
                            <Typography variant="h5" component="h2" style={{color:'green'}}>
                                    Recoverd
                            </Typography>
                        </CardContent>

                    </Card>

                
                        
                        
                            <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography className={CLasses.title} style={{color:'gray'}} gutterBottom>
                            {props.Country==='india'?NumberChange(totalDataArray.map(function(d){return d.totaldeceased})):totalDataArray.map(function(d){return d.totaldeceased})}
                            </Typography>
                            <Typography variant="h5" component="h2" style={{color:'gray'}}>
                                    Deceased
                            </Typography>
                        </CardContent>

                    </Card>
                    
             
                    </Grid>
                          

                    
    )
}
export default TotalData