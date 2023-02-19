import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs, { tabsClasses }  from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Current from './parts/current'



function TabPanel(props) {


const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsMain = () => {

    
     const [value, setValue] = React.useState(0);
     const [cords , setCords] = React.useState(['' , ''])
     const [data , setData] = React.useState([])
     const [loc , setLoc ] = React.useState([])



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };


    function success(pos) {
      var crd = pos.coords;
      console.log(pos)

      var newArr = [crd.latitude , crd.longitude , crd.accuracy]

      setCords(newArr)
    
                                  /////////////////////////
                                  //                     // 
                                  //    //  API CALLS    //
                                  //                     //
                                  /////////////////////////

      var key = 'ee6f8dd45e1dcbf7168462eed8e430ff'


      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}`)
      .then(res=>res.json())
      .then(result=>{
        console.log(result)
        setData(result)

      })
      fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}`)
      .then(res=>res.json())
      .then(result=>{
        setLoc(result)
      })
    }
    
    function errors(err) {
      console.warn(`err`);
    }



    React.useEffect((()=>{
      if(navigator.geolocation) {


        navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {

              console.log(navigator)
            navigator.geolocation.getCurrentPosition(success);

          } else if (result.state === "prompt") {
            console.log(navigator)
            navigator.geolocation.getCurrentPosition(success , errors , options);
            
          } 
         
        });  
        
      
      } else {
        console.log('Error')
      }
    })
    
     , [])

    return (

      <>
        <Box sx={{ width:'100%' , bgcolor: 'background.paper' , display: 'flex' , justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            aria-label="scrollable auto tabs example"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              width: 'fit-content',
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: {xs: '0.3' , sm: '0'} },
              },
            }}
          >
            <Tab label="Today" {...a11yProps(0)} sx={{fontWeight: 600}} />
            <Tab label="Hourly" {...a11yProps(1)} sx={{fontWeight: 600}} />
            <Tab label="Daily" {...a11yProps(2)} sx={{fontWeight: 600}} />
            <Tab label="Monthly" {...a11yProps(3)} sx={{fontWeight: 600}} />
            <Tab label="Yearly" {...a11yProps(4)} sx={{fontWeight: 600}} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
            <Current data={data} locs={loc}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Hourly
        </TabPanel>
        <TabPanel value={value} index={2}>
          Daily
        </TabPanel>
        <TabPanel value={value} index={3}>
          Monthly
        </TabPanel>
        <TabPanel value={value} index={4}>
          Yearly
        </TabPanel>
    
      </>



    );
}

export default TabsMain