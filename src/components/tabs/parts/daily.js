import React from 'react';
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';


class Daily extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date : new Date().toUTCString().slice(0 , 16),
            days: [],
            weatherCode1: '',
            weatherCode2: '',
            weatherCode3: ''
        }
    }





    componentDidMount() {

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
                
                };

            var self = this
                
            function success(pos) {
            

                    var crd = pos.coords;



                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,uv_index_max,uv_index_clear_sky_max,windgusts_10m_max,precipitation_probability_max,weathercode&hourly=surface_pressure&timezone=auto&forecast_days=4`)
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result)

                        var values = Object.values(result.daily)
                        var keys = Object.keys(result.daily)
                  
          

                        var day1 = values.map((cur , i) => {
                                var name = ''
                                keys.forEach((curr , index) =>{
                                    if (i === index) {
                                        name = curr
                                    }
                                })
                                var result = [name , cur[1]]
                                return result

                        }) 

                        var day2 = values.map((cur , i) => {
                                var name = ''
                                keys.forEach((curr , index) =>{
                                    if (i === index) {
                                        name = curr
                                    }
                                })
                                var result = [name , cur[2]]
                                return result

                        })  

                        var day3 = values.map((cur , i) => {
                                var name = ''
                                keys.forEach((curr , index) =>{
                                    if (i === index) {
                                        name = curr
                                    }
                                })
                                var result = [name , cur[3]]
                                return result

                        })  



                        var days = [ day1 , day2 , day3]
                        self.setState({days: days})

                        // WEATHERCODE DETERMINATION
                        var weatherCode1 =(day1) => {
                        

                        var weatherCode = day1[14][1]
                        if (weatherCode === 0) {
                            self.setState({ weatherCode: 'Clear Sky' })
                        } else if (weatherCode = 1) {
                            self.setState({ weatherCode1: 'Mainly Clear' })
                        } else if (weatherCode = 2) {
                            self.setState({ weatherCode1: 'Partly Clear' })
                        } else if (weatherCode = 3) {
                            self.setState({ weatherCode1: 'Overcast' })
                        } else if (weatherCode = 45) {
                            self.setState({ weatherCode1: 'Fog' })
                        } else if (weatherCode = 48) {
                            self.setState({ weatherCode1: 'Depositing Fog' })
                        } else if (weatherCode = 51) {
                            self.setState({ weatherCode1: 'Drizzle' })
                        } else if (weatherCode = 53) {
                            self.setState({ weatherCode1: 'Moderate Drizzle' })
                        } else if (weatherCode = 55) {
                            self.setState({ weatherCode1: 'Dense Drizzle' })
                        } else if (weatherCode = 61) {
                            self.setState({ weatherCode1: 'Slight Rain' })
                        } else if (weatherCode = 63) {
                            self.setState({ weatherCode1: 'Moderate Rain' })
                        } else if (weatherCode = 65) {
                            self.setState({ weatherCode1: 'Dense Rain' })
                        } else if (weatherCode = 66) {
                            self.setState({ weatherCode1: 'Freezing Rain' })
                        } else if (weatherCode = 67) {
                            self.setState({ weatherCode1: 'Heavy Freezing Rain' })
                        } else if (weatherCode = 71) {
                            self.setState({ weatherCode1: 'Slight Snow' })
                        } else if (weatherCode = 73) {
                            self.setState({ weatherCode1: 'Moderate Snow' })
                        } else if (weatherCode = 75) {
                            self.setState({ weatherCode1: 'Heavy Snow' })
                        } else if (weatherCode = 77) {
                            self.setState({ weatherCode1: 'Snow Grains' })
                        } else if (weatherCode = 80) {
                            self.setState({ weatherCode1: 'Rain Showers' })
                        } else if (weatherCode = 81) {
                            self.setState({ weatherCode1: 'Rain Showers' })
                        } else if (weatherCode = 82) {
                            self.setState({ weatherCode1: 'Voilent Showers' })
                        } else if (weatherCode = 85) {
                            self.setState({ weatherCode1: 'Snow Showers' })
                        } else if (weatherCode = 86) {
                            self.setState({ weatherCode1: 'Hvy. Snow Showers' })
                        } else if (weatherCode = 95) {
                            self.setState({ weatherCode1: 'Thuderstorm' })
                        } else if (weatherCode = 96) {
                            self.setState({ weatherCode1: 'Thunderstorm with hail' })
                        } else if (weatherCode = 99) {
                            self.setState({ weatherCode1: 'T.storm with heavy hail' })
                        }



                            

            
                        }
                        weatherCode1(day1)

                        var weatherCode2 =(day2) => {

                        var weatherCode = day2[14][1]

                        if (weatherCode === 0) {
                            self.setState({ weatherCode2: 'Clear Sky' })
                        } else if (weatherCode = 1) {
                            self.setState({ weatherCode2: 'Mainly Clear' })
                        } else if (weatherCode = 2) {
                            self.setState({ weatherCode2: 'Partly Clear' })
                        } else if (weatherCode = 3) {
                            self.setState({ weatherCode2: 'Overcast' })
                        } else if (weatherCode = 45) {
                            self.setState({ weatherCode2: 'Fog' })
                        } else if (weatherCode = 48) {
                            self.setState({ weatherCode2: 'Depositing Fog' })
                        } else if (weatherCode = 51) {
                            self.setState({ weatherCode2: 'Drizzle' })
                        } else if (weatherCode = 53) {
                            self.setState({ weatherCode2: 'Moderate Drizzle' })
                        } else if (weatherCode = 55) {
                            self.setState({ weatherCode2: 'Dense Drizzle' })
                        } else if (weatherCode = 61) {
                            self.setState({ weatherCode2: 'Slight Rain' })
                        } else if (weatherCode = 63) {
                            self.setState({ weatherCode2: 'Moderate Rain' })
                        } else if (weatherCode = 65) {
                            self.setState({ weatherCode2: 'Dense Rain' })
                        } else if (weatherCode = 66) {
                            self.setState({ weatherCode2: 'Freezing Rain' })
                        } else if (weatherCode = 67) {
                            self.setState({ weatherCode2: 'Heavy Freezing Rain' })
                        } else if (weatherCode = 71) {
                            self.setState({ weatherCode2: 'Slight Snow' })
                        } else if (weatherCode = 73) {
                            self.setState({ weatherCode2: 'Moderate Snow' })
                        } else if (weatherCode = 75) {
                            self.setState({ weatherCode2: 'Heavy Snow' })
                        } else if (weatherCode = 77) {
                            self.setState({ weatherCode2: 'Snow Grains' })
                        } else if (weatherCode = 80) {
                            self.setState({ weatherCode2: 'Rain Showers' })
                        } else if (weatherCode = 81) {
                            self.setState({ weatherCode2: 'Rain Showers' })
                        } else if (weatherCode = 82) {
                            self.setState({ weatherCode2: 'Voilent Showers' })
                        } else if (weatherCode = 85) {
                            self.setState({ weatherCode2: 'Snow Showers' })
                        } else if (weatherCode = 86) {
                            self.setState({ weatherCode2: 'Hvy. Snow Showers' })
                        } else if (weatherCode = 95) {
                            self.setState({ weatherCode2: 'Thuderstorm' })
                        } else if (weatherCode = 96) {
                            self.setState({ weatherCode2: 'Thunderstorm with hail' })
                        } else if (weatherCode = 99) {
                            self.setState({ weatherCode2: 'T.storm with heavy hail' })
                        }



                            

            
                        }
                        weatherCode2(day2) 

                        var weatherCode3 =(day3) => {

                        var weatherCode = day3[14][1]

                        if (weatherCode === 0) {
                            self.setState({ weatherCode3: 'Clear Sky' })
                        } else if (weatherCode = 1) {
                            self.setState({ weatherCode3: 'Mainly Clear' })
                        } else if (weatherCode = 2) {
                            self.setState({ weatherCode3: 'Partly Clear' })
                        } else if (weatherCode = 3) {
                            self.setState({ weatherCode3: 'Overcast' })
                        } else if (weatherCode = 45) {
                            self.setState({ weatherCode3: 'Fog' })
                        } else if (weatherCode = 48) {
                            self.setState({ weatherCode3: 'Depositing Fog' })
                        } else if (weatherCode = 51) {
                            self.setState({ weatherCode3: 'Drizzle' })
                        } else if (weatherCode = 53) {
                            self.setState({ weatherCode3: 'Moderate Drizzle' })
                        } else if (weatherCode = 55) {
                            self.setState({ weatherCode3: 'Dense Drizzle' })
                        } else if (weatherCode = 61) {
                            self.setState({ weatherCode3: 'Slight Rain' })
                        } else if (weatherCode = 63) {
                            self.setState({ weatherCode3: 'Moderate Rain' })
                        } else if (weatherCode = 65) {
                            self.setState({ weatherCode3: 'Dense Rain' })
                        } else if (weatherCode = 66) {
                            self.setState({ weatherCode3: 'Freezing Rain' })
                        } else if (weatherCode = 67) {
                            self.setState({ weatherCode3: 'Heavy Freezing Rain' })
                        } else if (weatherCode = 71) {
                            self.setState({ weatherCode3: 'Slight Snow' })
                        } else if (weatherCode = 73) {
                            self.setState({ weatherCode3: 'Moderate Snow' })
                        } else if (weatherCode = 75) {
                            self.setState({ weatherCode3: 'Heavy Snow' })
                        } else if (weatherCode = 77) {
                            self.setState({ weatherCode3: 'Snow Grains' })
                        } else if (weatherCode = 80) {
                            self.setState({ weatherCode3: 'Rain Showers' })
                        } else if (weatherCode = 81) {
                            self.setState({ weatherCode3: 'Rain Showers' })
                        } else if (weatherCode = 82) {
                            self.setState({ weatherCode3: 'Voilent Showers' })
                        } else if (weatherCode = 85) {
                            self.setState({ weatherCode3: 'Snow Showers' })
                        } else if (weatherCode = 86) {
                            self.setState({ weatherCode3: 'Hvy. Snow Showers' })
                        } else if (weatherCode = 95) {
                            self.setState({ weatherCode3: 'Thuderstorm' })
                        } else if (weatherCode = 96) {
                            self.setState({ weatherCode3: 'Thunderstorm with hail' })
                        } else if (weatherCode = 99) {
                            self.setState({ weatherCode3: 'T.storm with heavy hail' })
                        }



                            

            
                        }
                        weatherCode3(day3)


                    })

                    }

                // END WEATHERCODE DETERMINATION


            

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

    formatTime = (date) => {
        date = new Date(date)
        var hours = date.getHours()
        var mins  = date.getMinutes()
        mins      =  mins < 10 ? '0' + mins : mins
        var time  = hours + ':' + mins
        time      = hours > 12 ? time + ' PM' : time + ' AM'
        return time
    }
    
    render() {

        var {days} = this.state
        console.log(days)
            

        if(days.length === 0) {  

                return (


                    <Box sx={{height: '100%' , mt: 7}}>

                        <Grid container sx={{justifyContent: 'center' , alignItems: 'center' , height: '100%'}}>
                            <Grid item xs={1}>


                                    <CircularProgress  />

                            </Grid>
                        </Grid>


                    </Box>
                )


        } else {

            return(
                <Box>
                    <Container fullWidth={false}>

                        {


                            this.state.days.map((cur , i) => {

                                var WC = ''
                                if(i === 0) {
                                    WC = this.state.weatherCode1 
                                } else if ( i === 1) {
                                    WC = this.state.weatherCode2
                                } else {
                                    WC = this.state.weatherCode3
                                }
                                
                                var daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                                var dayName = daysList[new Date(cur[0][1]).getDay()]


                                return (

                                            <>

                                        <Box sx={{mt: 2}}>

                                            <Container fullWidth="false">
                                                <Card sx={{ width: '100%' }}>

                                                    <CardContent>
                                                        <Grid container sx={{ justifyContent: 'start', alignItems: 'center' }}>
                                                            <Grid item xs={12} sx={{ mt: { xs: 1, sm: 0 } }}>
                                                                <Typography variant="h5">{`${dayName} , ${cur[0][1]}`}</Typography>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid container sx={{ justifyContent: 'center', mt: 1, my: 2 }} spacing={1}>
                                                            <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: "end" } }}>
                                                                <Typography variant="h4" >{cur[1][1]}{'\u00b0C'}</Typography>
                                                            </Grid>
                                                            <Grid item sm={2} md={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                                                                <Divider orientation="vertical" flexItem />
                                                            </Grid>
                                                            <Grid item xs={12} md={5} sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'start' } }}>
                                                                <Typography variant="h5"> {WC}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Min. Temp{` (\u00b0C)`}:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[2][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Max. Temp{` (\u00b0C)`}:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[1][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Feels Like{` (\u00b0C)`}:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[3][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Total Rain(meters)</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[5][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Sunrise:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{this.formatTime(cur[6][1])}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Sunset:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{this.formatTime(cur[7][1])}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Windspeed(m/s):</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[8][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Gust Speed(m/s)</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[12][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />
                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Wind Direction:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{`${cur[9][1]} \u00b0`}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />

                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>UV Index:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[10][1]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider sx={{ mt: 1 }} />

                                                        <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>UV Index with Clear Sky:</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[11][1]}</Typography>
                                                            </Grid>
                                                        </Grid>


                                                    </CardContent>
                                                </Card>

                                            </Container>
                                        </Box>
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

export default Daily
