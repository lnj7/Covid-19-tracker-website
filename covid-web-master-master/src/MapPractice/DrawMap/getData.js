import Axios from 'axios'
function getData(link)
{
    Axios.get(link).then(res=>{
        return res
    })
}
export default getData