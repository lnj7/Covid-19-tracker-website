import React, { Component, Suspense } from 'react'
import classes from './MapStates.module.css'
import SpinnerClass from './Spinner.module.css'
// import Chart from '../../FinaleChart/Chart'
// import TotalData from './TotalData'
// import BarChart from '../../FinaleChart/BarChart'
// import TableData from './TableData'
const Chart = React.lazy(()=>import("../../FinaleChart/Chart"))
const BarChart = React.lazy(()=>import("../../FinaleChart/BarChart"))
const TableData = React.lazy(()=>import('./TableData'))
const TestMap = React.lazy(()=>import('./ma'))
const TotalData = React.lazy(()=>import('./TotalData'))
var size =0
var SwitchMap ="World"
var link ="https://api.covid19india.org/data.json"
class MapStates extends Component{
    
    state = {
        done:false,
        totalconfirmed:0,
        totalrecovered:0,
        totaldeceased:0,
        totalactive:0,
        Country:'india',
        Link:"https://api.covid19india.org/data.json",
        Change_Map_Name:'world'

    }
    
    
    ChangeCountryByButton=(Country,Link)=>{
        // var response =Swr()
        // if(response)
        // console.log(response)
        if(Country==='india')
        {
            Country='world'
            Link="https://covid-19.dataflowkit.com/v1"
            SwitchMap='india'
        }
        else{
            Country='india'
            Link="https://api.covid19india.org/data.json"
            SwitchMap='world'
        }
        this.setState({
            Country:Country,
            Link:Link
            
        })
        
        

    }
   
    render()
    {
        // console.log("MapStates")
        return(
            <div id="MapStates" className={classes.main}>
                <div id='DataSection' className={classes.DataSection} >
                <button 
                        style={{width:"100px",height:"50px"}}
                        onClick={()=>this.ChangeCountryByButton(this.state.Country,this.state.Link)} 
                        id="Change_Country_Button" 
                         className='Change_Country_Button'>
                             {SwitchMap}(Click To Switch)
                    </button>
                    <Suspense>
                    <TotalData 
                        ResponseData={this.props.ResponseData} 
                        Country={this.state.Country}
                        Link={this.state.Link}
                        WorldResponse = {this.props.WorldData}
                        IndiaResponse = {this.props.ResponseData}
                    />
                    </Suspense>
                    <div id="TableView" className={classes.TableView} > 
                        <div className={classes.Table_Row_Heading}>
                            <div className={classes.Cell_Heading} style={{width:'50%'}}>State</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}} >Confirm</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}}>Active</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}}>Recover</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}}>Deaths</div>
                        </div>
                
                            <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                                    <TableData 
                                    Link={this.state.Link}

                                    data={this.props.ResponseData} 
                                    MapRegion={this.state.Country}
                                    WorldResponse = {this.props.WorldData}
                                    IndiaResponse = {this.props.ResponseData}
                                    />
                            </Suspense>
                    </div>

                </div>
                <div id="MapSection" className={classes.MapSection} >
                <div style={{display:'flex',flexDirection:"column",marginTop:"5%",height:"100%"}}>
                <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                    <TestMap 
                        MapRegion={this.state.Country}
                        WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                        />
                    </Suspense>
                    <div id="Map_data" className={classes.Map_data}>
                    
                        
                     
                    </div>
                    
                    
                </div>
                    <div style={{width:'100%',height:'410px',marginTop:'50%',marginLeft:"2%"}} id="BarCharts">
                    <Suspense fallback={<div className={SpinnerClass.loader}></div>}> 
                     <BarChart 
                            
                            Link={this.state.Link}
                            MapRegion={this.state.Country}
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                        /> 
                        
                    </Suspense>
                    
                    </div>
                    <div style={{width:'100%',height:'400',marginTop:'2%',marginLeft:"2%"}} id="DailyConfirmChart">
                    
                    <Suspense fallback={<div className={SpinnerClass.loader}></div>}> 

                        <Chart 
                            Link={this.state.Link}
                            MapRegion={this.state.Country}    
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                            Type={"dailyconfirmed"}
                            TypeID={"DailyConfirmChart"}
                            background={"rgb(245, 74, 42,.5)"}
                        />
                        </Suspense>
                    </div>
                    <div style={{width:'100%',height:'400',marginTop:'2%',marginLeft:"2%"}} id="DailyRecoverdChart">
                    <Suspense fallback={<div className={SpinnerClass.loader}></div>}> 

                        <Chart 
                            Link={this.state.Link}
                            MapRegion={this.state.Country}    
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                            Type={"dailyrecovered"}
                            TypeID={"DailyRecoverdChart"}
                            background={"rgb(120, 209, 109,.5)"}
                        />
                    </Suspense>

                    </div>
                    <div style={{width:'100%',height:'400',marginTop:'2%',marginLeft:"2%"}} id="DailydeceasedChart">
                    <Suspense fallback={<div className={SpinnerClass.loader}></div>}> 

                        <Chart 
                            Link={this.state.Link}
                            MapRegion={this.state.Country}    
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                            Type={"dailydeceased"}
                            TypeID={"DailydeceasedChart"}
                            background={"rgb(106, 192, 198,.5)"}
                        />
                     </Suspense>

                    </div>
                </div>
               
            </div>
        )
    }
}
export default MapStates