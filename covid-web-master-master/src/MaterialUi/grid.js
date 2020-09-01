import React,{useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Header from '../Header/Header'
import SvgIcon from '@material-ui/core/SvgIcon' 
import {ThemeProvider,Paper,createMuiTheme,} from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import history from 'history/browser'
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom'
import SwithButton from '@material-ui/core/Switch'
import DataSection from '../MapPractice/DrawMap/DataSection'
import {AppBar,Toolbar,IconButton,Typography,Button} from '@material-ui/core'
import MenuIcon from '@material-ui/core/Menu'
import IndiaMainPart from '../Screen/IndiaMainScreen'
import GlobalScreenMainScreen from '../Screen/GlobalScreen'
import theme from './theme'
const useStyles = makeStyles((theme) => ({
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
    },
  }));
  
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
const Griding=()=>{
    const [DarkMode,SetDarkMode] = useState(false)
    const [alignment, setAlignment] = React.useState('left');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
      };
    const DarkModeTheme =  createMuiTheme({
        palette:{
            type:DarkMode?"dark":"light",
            primary:{
                main:'#2f89fc',
                dark:'#40514e'
            }
        },

    })
   const ChangeTheme=(val)=>{
        SetDarkMode(!val)
    }
    useEffect(()=>{
        // theme.palette.type=DarkMode?'dark':"light"

    },[DarkMode])
    return(
    
        <BrowserRouter>
        <ThemeProvider theme={DarkModeTheme}>
            <Paper>
        <div  style={{flexGrow:1}}>
        <Grid container spaceing={3} >
            <Grid item xs={12} container >
                    {/* <Header/> */}
                    <div >
                       <AppBar style={{backgroundColor:DarkMode?'#40514e':'#2f89fc'}} position="fixed"  >
                <Toolbar variant="regular" style={{justifyContent:"space-between"}}>
                
                <SwithButton color="default" style={{marginRight:"-2%"}} checked={DarkMode} onChange={()=>SetDarkMode(!DarkMode)}/>
                <Typography variant="h6">
                        Covid-19 Tracker
                    </Typography>
                    <ToggleButtonGroup
                value={alignment}
                exclusive
                aria-label="text alignment"
                onChange={handleAlignment}
                
                >
                <ToggleButton value="left" aria-label="left aligned" >
                        
                                      
                             <Link to={{pathname:"/"}}style={{textDecoration:'none',color:"white"}}>India</Link>
                    
                </ToggleButton>
                <ToggleButton value="justify" aria-label="justified">
                    <Link to={{pathname:"/world"}} style={{textDecoration:'none',color:"white"}}>world</Link>
                
                </ToggleButton>
                </ToggleButtonGroup>
                  
                
                
                </Toolbar>
                
            </AppBar>
            </div>
                    
            </Grid>
            {/* <HomeIcon fontSize="small" /> */}

            {/* <IndiaMainPart DarkMode={DarkMode}/> */}
            <Switch >
                <Route path="/" component={()=><IndiaMainPart DarkMode={DarkMode}/>} exact/>
                <Route path="/world" component={()=><GlobalScreenMainScreen DarkMode={DarkMode}/>}/>
            </Switch>

        </Grid>


        </div>
        </Paper>
        </ThemeProvider>
        </BrowserRouter>
    
       
    )
}
export default Griding