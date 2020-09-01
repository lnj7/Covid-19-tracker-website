import React, { useState, Suspense } from 'react'
// import Display from "./Display"
import SpinnerClass from './Spinner.module.css'
const Display = React.lazy(()=>import("./Display"))
function Events(props){
    
    const [A,B]= useState({
        ad:''
    })
    // SetState({
    //     State_Id:event.target.id
    // })
    return(
        <div>      
            {/* <Suspense fallback={<div className={SpinnerClass.loader}></div>}>  
            <Display state_Name={props.state} 
            Confirm={props.confirmed}
        
            ActiveCases={props.active} Recoverd={props.recovered}
        Death={props.deaths}
     />
     </Suspense> */}
     </div>

    )
}
export default Events