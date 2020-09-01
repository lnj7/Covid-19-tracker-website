import React from 'react'
import Classes from './TestMap.module.css'
import {Button, ThemeProvider, Typography,Card,CardContent,makeStyles, Paper} from '@material-ui/core'
import theme from '../../MaterialUi/theme'
const useStyles = makeStyles({
  root:{
      flexGrow:1,
      maxWidth:180,
      marginLeft:2,
      minWidth:20,
      marginBottom:5,
      backgroundImage:'linear-gradient(toright, rgb(235, 100, 100),rgb(235, 100, 130))'

  },
  Cardroot:{
      maxWidth:150
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
function Display(props){
   const CLasses = useStyles()
   
    // console.log(props)
    return(
        <div>
        <h2 style={{color:props.DarkMode?'white':'black'}} id="state_data">{props.state_Name}</h2>
        <div className={Classes.Map_Visual_Data} data={"ayush"} id="ayush">
          
     
      <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" className={CLasses.title} color="secondary" gutterBottom>
                            {props.Confirm}
                            </Typography>
                            <Typography variant="h5" component="h2" color="secondary">
                                    Confirmed
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" className={CLasses.title} style={{color:"#2f89fc"}} gutterBottom>
                            {props.ActiveCases}
                            </Typography>
                            <Typography variant="h5" component="h2" color="s" style={{color:"#2f89fc"}}>
                            Active
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card className={CLasses.root} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" className={CLasses.title} style={{color:"green"}} gutterBottom>
                            {props.Recoverd}
                            </Typography>
                            <Typography variant="h5" component="h2" style={{color:"green"}}>
                            Recoverd
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card className={CLasses.root} variant="outlined" >
                        <CardContent>
                            <Typography variant="h5" component="h2" className={CLasses.title} style={{color:"gray"}} gutterBottom>
                            {props.Death}
                            </Typography>
                            <Typography variant="h5" component="h2" style={{color:"gray"}}>
                            Deceased
                            </Typography>
                        </CardContent>

                    </Card>
                    
        </div>
        </div>
    )
}

export default Display