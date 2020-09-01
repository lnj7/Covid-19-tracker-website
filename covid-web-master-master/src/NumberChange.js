export default (amount)=>{
    if(Math.abs(Number(amount))>=1.0e+6)
    {
        
        return parseFloat(Math.abs(Number(amount))/ 1.0e+6).toFixed(1) + "M"
    }
    else{
        
        return parseFloat(Math.abs(Number(amount))/ 1.0e+3).toFixed(1) + "K"
    }
}