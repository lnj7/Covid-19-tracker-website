import Axios from 'axios'

async function DistrictData(props,id)
{
    
    await Axios.get("https://api.covid19india.org/state_district_wise.json").then(data=>{
    
        for(var key in data.data)
        {
            if(props.data.statewise[id].state===key)
            {
               return data.data[key]
            }
        }
    
    })
    
    
}

export default DistrictData