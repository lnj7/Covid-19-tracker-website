import React from 'react'
import Axios from 'axios'

function SuspenseData (){
    var a ={}
    Axios.get("https://api.covid19india.org/data.json").then(function(d){
        console.log(d,"[SuspenseData.js]")
        a=d
    })
    
    return (
        <h1>{a.data}</h1>
    )
}

export default SuspenseData