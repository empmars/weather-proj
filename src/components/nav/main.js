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
              <Box sx={{display: 'flex'  , alignItems: 'center' , width: {xs: '100%' , sm : '40%'}}}>
                <Search>
                    <Autocomplete
                      disablePortal
                      freeSolo
                      id="CustomLocationSearch"
                      options={this.props.matchedName[0]}
                      renderInput={(params) => 
                      <TextField {...params} size="small" placeholder="Enter Location" onChange={(e)=>{this.props.searchField(e)}}
                     />
                      }

                    />
                </Search>
              <Box>
                     <SearchIcon sx={{backgroundColor: 'white' , color: '#1976d2' , padding:'4px', borderRadius: '100px', cursor: 'pointer' , ml: 2,
                      '&:hover' : {
                        backgroundColor: '#e3e1e1'
                      },
                      display: 'flex',
                      alignItems: 'center'
                     }}
                     onClick={()=>{
                        var searchBox = document.getElementById('CustomLocationSearch')
                        var val = searchBox.value
                          var name = emojiStrip(val)
                           
                            var length = name.length
                            var i = name.indexOf('(') + 1
                            name = name.slice(i , length)
                            var length2 = name.length
                            var i2 = name.indexOf(',')
                           
                            var p1 = name.slice(0 , i2 - 1)
                            var p2 = name.slice(i2+2 , length2 - 1)
                           var cordObj = {
                              'latitude': p1,
                              'longitude': p2
                           }
                            this.props.selectedCords(cordObj)
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