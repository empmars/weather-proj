import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs, { tabsClasses }  from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Current from './parts/current'
import Daily from './parts/daily'
import Hourly from './parts/hourly'



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


 
export const NameContext = React.createContext()

const TabsMain = ({customLoc}) => {

    
     const [value, setValue] = React.useState(0);




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    

    return (
      <>
      <NameContext.Provider value={customLoc}>
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
          </Tabs>
        </Box>
   

          <TabPanel value={value} index={0}>
              <Current />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Hourly  />
          </TabPanel>
          <TabPanel value={value} index={2}>
              <Daily  />
          </TabPanel>

      </NameContext.Provider>
      </>



    );
}

export default TabsMain