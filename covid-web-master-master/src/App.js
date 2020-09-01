import React, { Suspense, useState } from 'react';
import './App.css';
import DataSection from './MapPractice/DrawMap/DataSection';
import SpinnerClass from './MapPractice/DrawMap/Spinner.module.css'
import Grid from '../src/MaterialUi/grid'
import {Paper, ThemeProvider,createMuiTheme} from '@material-ui/core'
import theme from './MaterialUi/theme';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import GlobalScreenMainScreen from './Screen/GlobalScreen';
import IndiaMainPart from './Screen/IndiaMainScreen';
function App(props) {
  

  return [
    // <BrowserRouter>
    <div>
        
        {/* <Switch>
          <Route path="/" component={Grid} exact/>
          <Route path="/world" component={GlobalScreenMainScreen} />
          <Route path="india" component={IndiaMainPart}/>
        </Switch> */}
        <Grid/>
       
    </div>
    // </BrowserRouter>
    ]
  
}

export default App;
