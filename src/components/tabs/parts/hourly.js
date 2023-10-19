import React from 'react';
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { WiDayCloudy, WiDaySunny  , WiDaySnow , WiSnowWind , WiNightAltThunderstorm , WiDayThunderstorm} from "weather-icons-react";
import { WiCloud } from "weather-icons-react";
import { WiCloudy } from "weather-icons-react";
import { WiDayFog } from "weather-icons-react";
import { WiDayRainMix } from "weather-icons-react";
import { WiDayRain } from "weather-icons-react";
import { WiDayRainWind } from "weather-icons-react";
import { WiDayHail } from "weather-icons-react";
import { WiShowers } from "weather-icons-react";


class Hourly extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date : new Date().toUTCString().slice(0 , 16),
            hours: [] , 
        }
    }




    // console.log(data)

    componentDidMount() {

            var self = this
            

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
                
                };

                
            function success(pos) {
            

                    var crd = pos.coords;

                    var key = 'd6b5f518d490caf492baeddece6a688a'


                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&forcast_days=1&hourly=temperature_2m,cloudcover,precipitation,precipitation_probability,weathercode&timezone=auto`)
                    .then(res=>res.json())
                    .then(result=>{
      
                            var hours = []

                            var timeNow = new Date().toUTCString()
                            timeNow = Number(timeNow.slice(16, 19))
                     

                            var timeTill = Number(timeNow) + 13

                                        
         
                                
                    for ( var i = timeNow ; i < timeTill ; i++ ) {
                                
                                

                                var timezone = result.timezone
                                var time = new Date(result.hourly.time[i]).toLocaleString('en-US', {
                                        timezone
                                    })
                                var weatherCode = result.hourly.weathercode[i]

                                
                                if( weatherCode === 0 ) {
                                    var weatherName = 'Clear Sky'
                                    var icon        = () => { <WiDaySunny /> }
                                } else if (weatherCode = 1) {
                                    var weatherName = 'Mainly Clear'
                                } else if (weatherCode = 2) {
                                    var weatherName = 'Partly Clear'
                                } else if (weatherCode = 3) {
                                    var weatherName = 'Overcast'
                                } else if (weatherCode = 45) {
                                    var weatherName = 'Fog'
                                } else if (weatherCode = 48) {
                                    var weatherName = 'Depositing Fog'
                                } else if (weatherCode = 51) {
                                    var weatherName = 'Drizzle'
                                } else if (weatherCode = 53) {
                                    var weatherName = 'Moderate Drizzle'
                                } else if (weatherCode = 55) {
                                    var weatherName = 'Dense Drizzle'
                                } else if (weatherCode = 61) {
                                    var weatherName = 'Slight Rain'
                                } else if (weatherCode = 63) {
                                    var weatherName = 'Moderate Rain'
                                } else if (weatherCode = 65) {
                                    var weatherName = 'Dense Rain'
                                } else if (weatherCode = 66) {
                                    var weatherName = 'Freezing Rain'
                                } else if (weatherCode = 67) {
                                    var weatherName = 'Heavy Freezing Rain'
                                } else if (weatherCode = 71) {
                                    var weatherName = 'Slight Snow'
                                } else if (weatherCode = 73) {
                                    var weatherName = 'Moderate Snow'
                                } else if (weatherCode = 75) {
                                    var weatherName = 'Heavy Snow'
                                } else if (weatherCode = 77) {
                                    var weatherName = 'Snow Grains'
                                } else if (weatherCode = 80) {
                                    var weatherName = 'Rain Showers'
                                } else if (weatherCode = 81) {
                                    var weatherName = 'Rain Showers'
                                } else if (weatherCode = 82) {
                                    var weatherName = 'Voilent Showers'
                                } else if (weatherCode = 85) {
                                    var weatherName = 'Snow Showers'
                                } else if (weatherCode = 86) {
                                    var weatherName = 'Hvy. Snow Showers'
                                } else if (weatherCode = 95) {
                                    var weatherName = 'Thuderstorm'
                                } else if (weatherCode = 96) {
                                    var weatherName = 'Thunderstorm with hail'
                                } else if (weatherCode = 99) {
                                    var weatherName = 'T.storm with heavy hail'
                                }
                                
                           

                                var hoursPart = {
                                        time : time,
                                        temp:  result.hourly.temperature_2m[i],
                                        Clouds: result.hourly.cloudcover[i],
                                        rainTod: result.hourly.precipitation[i],
                                        rainChan: result.hourly.precipitation_probability[i],
                                        weatherName: weatherName,
                                        code: weatherCode

                                }

                                hours.push(hoursPart)
                            }
                             
                           
                                self.setState({hours: hours})

         
                    })

    
        





            }

            function errors(err) {
            console.log(err);
            }

            if(navigator.geolocation) {


                navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {

                    
                        if (result.state === "granted") {

                        navigator.geolocation.getCurrentPosition(success);

                        } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success , errors , options);
                            
                        } 
                    
                });  
                
            
            } else {
                console.log('Error')
            }

          
    
    }

    iconReturn = (code) => {

                        if( code === 0 ) {
                            return (
                                <WiDaySunny size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 1) {
                            
                             return (
                                <WiDaySunny size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 2) {
                            
                             return (
                                <WiDayCloudy size = {35} color={'#1976d2'}/>
                            )

                        } else if (code = 3) {
                             return (
                                <WiDayCloudy size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 45) {
                           
                             return (
                                <WiDayFog size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 48) {
                           
                             return (
                                <WiDayFog size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 51) {
                    
                             return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 53) {
                            
                            return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 55) {
                       
                            return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 61) {
                            
                            return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 63) {
                            
                            return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 65) {
                            
                            return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 66) {
                        
                            return (
                                <WiDayRain size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 67) {
                            
                            return (
                                <WiDayRainWind size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 71) {
                           return (
                                <WiDaySnow size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 73) {
                             return (
                                <WiDaySnow size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 75) {
                             return (
                                <WiDaySnow size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 77) {
                             return (
                                <WiDayRainWind size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 80) {
                             return (
                                <WiShowers size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 81) {
                            return (
                                <WiShowers size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 82) {
                             return (
                                <WiShowers size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 85) {
                            return (
                                <WiSnowWind size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 86) {
                             return (
                                <WiSnowWind size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 95) {
                             return (
                                <WiDayThunderstorm size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 96) {
                            return (
                                <WiDayThunderstorm size = {35} color={'#1976d2'}/>
                            )
                        } else if (code = 99) {
                           return (
                                <WiDayThunderstorm size = {35} color={'#1976d2'}/>
                            )
                        }
            



    }

   

    render() {


        var {hours} = this.state
        
        
        if(hours.length === 0)  {

                return (
                        <>
                            <Box>
                                <Container fullWidth={false}>

                                    <Card sx={{ width: '100%' }}>

                                        <CardContent>

                                            
                                            <Grid container sx={{justifyContent: 'center' , mt: 1}}>

                                                <Grid item xs={1} sx={{fontWeight: 600}}>
                                                            <CircularProgress  />
                                                </Grid>
                                                
                                            </Grid>


                                            
                                        </CardContent>
                                    </Card>

                                </Container>
                            </Box>

                        
                        </>
                    )
        

        } else  {

        return (
                <Box>
                    <Container fullWidth={false}>



                        {
                            hours.map((cur , i) => {

            
            

                return (
                            <>
    

                                        <Card sx={{ width: '100%' , mb: 3}}>

                                            <CardContent>


                                                <Grid container sx={{ justifyContent: 'center' }}>

                                                    <Grid item xs={12} sx={{ fontWeight: 600 }}>

                                                        <Typography variant="h5">{cur.time}</Typography>


                                                    </Grid>

                                                </Grid>

                                                <Grid container sx={{ justifyContent: 'center', mt: 1, my: 2 }} spacing={1}>
                                                    <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: "end" } }}>
                                                        <Typography variant="h4" >{cur.temp}{'\u00b0C'}</Typography>
                                                    </Grid>
                                                    <Grid item sm={2} md={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                                                        <Divider orientation="vertical" flexItem />
                                                    </Grid>
                                                    <Grid item xs={12} md={5} sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'start' } }}>
                                                        { this.iconReturn(cur.code) } 
                                                    <Typography variant="h5" sx={{ml: 1}}> {cur.weatherName}</Typography> 
                                                    </Grid>
                                                
                                                </Grid>

                                                <Grid container sx={{justifyContent: 'center' , mt: 3}}>
                                                    <Grid item md='3' sx={{display : 'flex' , justifyContent: 'space-between'}}>
                                                        <Typography variant='h6'>Clouds:</Typography>
                                                        <Typography variant="h6">{`${cur.Clouds}%`}</Typography>
                                                    </Grid>
                                                    <Grid item md='1' sx={{display: 'flex' , justifyContent: 'center'}}>
                                                        <Divider orientation='vertical' />
                                                    </Grid>

                                                    <Grid item md='3' sx={{display : 'flex' , justifyContent: 'space-between'}}>
                                                        <Typography variant='h6'>Rain Todays:</Typography>
                                                        <Typography variant="h6">{`${cur.rainTod}mm`}</Typography>
                                                    </Grid>
                                                    <Grid item md='1' sx={{display: 'flex' , justifyContent: 'center'}}>
                                                        <Divider orientation='vertical' />
                                                    </Grid>
                                                    <Grid item md='3' sx={{display : 'flex' , justifyContent: 'space-between'}}>
                                                        <Typography variant='h6'>Rain Chances:</Typography>
                                                        <Typography variant="h6">{`${cur.rainChan}%`}</Typography>
                                                    </Grid>
                                                </Grid>


                                                
                                            </CardContent>
                                        </Card>

                        

                            
                            </>
                        )


                                })

                        }

                    </Container>
                </Box>
            ) 

        }                           


    }

}

export default Hourly