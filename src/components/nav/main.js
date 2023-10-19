import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
var emojiStrip = require('emoji-strip')

const Search = styled('div')(({ theme }) => ({

  borderRadius: '7px',
  position: 'relative',
  backgroundColor: 'white',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),

  },
}));









class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue : ''
    } 
  }


  render() {
    

      console.log(this.state)
      var self = this
      
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{justifyContent: { xs: 'center' , sm: 'space-between' }, flexDirection: {xs: 'column' , sm: 'row'} , paddingBottom: {xs: '10px' , sm: '0px'}}}>
              <Box sx={{display: 'flex' , alignItems: 'center'}}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{paddingRight: 0}}
                >
                  <ThermostatIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: {sm: 'block' } }}
                  >
                  The Weather App
                </Typography>
              </Box>
              <Box sx={{display: 'flex' , width: {xs: '100%' , sm : '40%'} , alignItems: 'center'}}>
                <Search>
                    <Autocomplete
                      disablePortal
                      freeSolo
                      id="combo-box-demo"
                      options={this.props.matchedName}
                      renderInput={(params) => 
                      <TextField {...params} size="small" placeholder="Enter Location" onChange={(e)=>{this.props.searchField(e)}}
                      onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            var name = emojiStrip(e.target.value)
                            console.log(name)
                            this.props.selectedName(name)
                          } 
                        }} />
                      }

                    />
                </Search>
                <Box>
                     <SearchIcon sx={{backgroundColor: 'white' , color: '#1976d2' , padding:'4px', borderRadius: '100px', cursor: 'pointer' , ml: 2,
                      '&:hover' : {
                        backgroundColor: '#e3e1e1'
                      }
                     }}/>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      );

  }

}

export default Nav;