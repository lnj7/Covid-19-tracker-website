import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography, ThemeProvider, Paper } from '@material-ui/core'
import MenuIcon from '@material-ui/core/Menu'
import theme from '../MaterialUi/theme'
const Header = ()=>{
    return(
        <div>
                      
                
            
            <AppBar color="primary">
                <Toolbar >
                    <IconButton edge="start" color="primary" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography>
                        Covid-19 Tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        
        

        </div>
    )
}
export default Header