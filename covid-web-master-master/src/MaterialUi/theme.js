import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    
  secondary:{
      main:'#30e3ca',
    //   light:'#f9ff21',
      dark:'#f9ff21',
      
  },
  
    
  },
  status:{
      danger:'orange'
  }
})

export default theme