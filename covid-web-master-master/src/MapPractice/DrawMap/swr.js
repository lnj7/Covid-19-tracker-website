import React from 'react'
import Axios from 'axios'
import SpinnerClass from './Spinner.module.css'
import useSWR from 'swr'
function Swr(){
    Axios.get('https://covid-19.dataflowkit.com/v1').then(function(res){
        // console.log(res,"world")
        return res
      })
    
    
}

export default Swr