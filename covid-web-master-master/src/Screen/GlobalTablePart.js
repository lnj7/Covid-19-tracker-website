import React, { Component, Suspense } from 'react'
import classes from '../MapPractice/DrawMap/MapStates.module.css'
import SpinnerClass from '../MapPractice/DrawMap/Spinner.module.css'
import { makeStyles, Table, TableRow ,TableContainer,TableHead,TableCell} from '@material-ui/core'
// import Chart from '../../FinaleChart/Chart'
// import TotalData from './TotalData'
// import BarChart from '../../FinaleChart/BarChart'
// import TableData from './TableData'

const TableData = React.lazy(()=>import('../MapPractice/DrawMap/TableData'))
const TotalData = React.lazy(()=>import('../MapPractice/DrawMap/TotalData'))
var size =0
var SwitchMap ="World"
var link ="https://api.covid19india.org/data.json"
const ColumnsHeader = [
    {id:'StateName',label:'Country',minWidth:170,fontWeight:'bold'},
    {id:'ConfirmCases',label:'Confirmed',minWidth:100,fontWeight:'bold'},
    {id:'ActiveCases',label:'Active',minWidth:100,fontWeight:'bold'},
    {id:'RecoverCases',label:'Recover',minWidth:100,fontWeight:'bold'},
    {id:'DeathCases',label:'Death',minWidth:100,fontWeight:'bold'},
]
const UseStyles = makeStyles({
    root:{
        width:'100%'
    },
    container:{
        maxWidth:440,
    }
})
class GlobalTablePart extends Component{
    
    state = {
        done:false,
        totalconfirmed:0,
        totalrecovered:0,
        totaldeceased:0,
        totalactive:0,
        Country:'world',
        Link:"https://covid-19.dataflowkit.com/v1",
        Change_Map_Name:'world'

    }
    
    
    
    
   
    render(){
        
        var cell =[]
        ColumnsHeader.map((column)=>{
          cell.push(  <TableCell
            key={column.id}
            style={{minWidth:column.minWidth,fontWeight:column.fontWeight}}
            >
                {column.label}
            </TableCell>
          )
        })
        return(
            <div id='DataSection'  >
                
                    <div style={{flexDirection:"column"}}>
                    <Suspense>
                    <TotalData 
                         
                        Country={this.state.Country}
                        Link={this.state.Link}
                        WorldResponse = {this.props.WorldData}
                    />
                    </Suspense>
                     </div>
                
                        <TableContainer style={{maxHeight:800}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        
                                        {cell}
                                    </TableRow>
                                </TableHead>
                            

                        
                
                            <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                                    <TableData 
                                    Link={this.state.Link}

                                    data={this.props.ResponseData} 
                                    MapRegion={this.state.Country}
                                    WorldResponse = {this.props.WorldData}
                                    IndiaResponse = {this.props.ResponseData}
                                    />
                            </Suspense>
                            </Table>

                        </TableContainer>
                    

                </div>
        )
    }
}
export default GlobalTablePart