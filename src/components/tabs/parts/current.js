import React from 'react'
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

class Current extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toUTCString().slice(0 , 16),
            data : [],
            loc: [],
            detailData: [],
            otherDetail: [],
            weatherCode: ''
        }
    }

 



    componentDidMount() {


           
                                  /////////////////////////
                                  //                     // 
                                  //    //  API CALLS    //
                                  //                     //
                                 /////////////////////////

    

        var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
        };


        var self = this

    
        function success(pos) {
        

            var crd = pos.coords;



            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,uv_index_max,uv_index_clear_sky_max,windgusts_10m_max,precipitation_probability_max,weathercode&hourly=surface_pressure&timezone=auto&forecast_days=1`)
            .then(res=>res.json())
            .then(result=>{
                

                var formatTime =  (date) => {
                        date = new Date(date)
                        var hours = date.getHours()
                        var mins  = date.getMinutes()
                        mins      =  mins < 10 ? '0' + mins : mins
                        var time  = hours + ':' + mins
                        time      = hours > 12 ? time + ' PM' : time + ' AM'
                        return time
                    }
    


                var arr = [[ 'Min. Temp:' , result.daily.temperature_2m_min] , [ 'Max. Temp:' , result.daily.temperature_2m_max] , ['Feels Like:' , result.daily.apparent_temperature_min] , ['Total Rain (meters):' , result.daily.precipitation_sum] , ['Sunrise:' , formatTime(result.daily.sunrise[0])],['Sunset:' , formatTime(result.daily.sunset[0])]]
                var otherArr = [['Wind Speed(m/s):' , result.daily.windspeed_10m_max] , ['Gust Speed(m/s):' , result.daily.windgusts_10m_max] , ['Wind Direction:' , result.daily.winddirection_10m_dominant] , ['UV Index:' ,  result.daily.uv_index_max] , ['UV Index with Clear Sky:' ,  result.daily.uv_index_clear_sky_max]]
           
                console.log(arr)
                self.setState({data: result})
                self.setState({detailData: arr})
                self.setState({otherDetail: otherArr})

                var weatherCode = result.daily_units.current_weather

                if( weatherCode === 0 ) {
                    self.setState({weatherCode: 'Clear Sky'})
                } else if (weatherCode = 1) {
                    self.setState({weatherCode: 'Mainly Clear'})
                } else if (weatherCode = 2) {
                    self.setState({weatherCode: 'Partly Clear'})
                } else if (weatherCode = 3) {
                    self.setState({weatherCode: 'Overcast'})
                } else if (weatherCode = 45) {
                    self.setState({weatherCode: 'Fog'})
                } else if (weatherCode = 48) {
                    self.setState({weatherCode: 'Depositing Fog'})
                } else if (weatherCode = 51) {
                    self.setState({weatherCode: 'Drizzle'})
                } else if (weatherCode = 53) {
                    self.setState({weatherCode: 'Moderate Drizzle'})
                } else if (weatherCode = 55) {
                    self.setState({weatherCode: 'Dense Drizzle'})
                } else if (weatherCode = 61) {
                    self.setState({weatherCode: 'Slight Rain'})
                } else if (weatherCode = 63) {
                    self.setState({weatherCode: 'Moderate Rain'})
                } else if (weatherCode = 65) {
                    self.setState({weatherCode: 'Dense Rain'})
                } else if (weatherCode = 66) {
                    self.setState({weatherCode: 'Freezing Rain'})
                } else if (weatherCode = 67) {
                    self.setState({weatherCode: 'Heavy Freezing Rain'})
                } else if (weatherCode = 71) {
                    self.setState({weatherCode: 'Slight Snow'})
                } else if (weatherCode = 73) {
                    self.setState({weatherCode: 'Moderate Snow'})
                } else if (weatherCode = 75) {
                    self.setState({weatherCode: 'Heavy Snow'})
                } else if (weatherCode = 77) {
                    self.setState({weatherCode: 'Snow Grains'})
                } else if (weatherCode = 80) {
                    self.setState({weatherCode: 'Rain Showers'})
                } else if (weatherCode = 81) {
                    self.setState({weatherCode: 'Rain Showers'})
                } else if (weatherCode = 82) {
                    self.setState({weatherCode: 'Voilent Showers'})
                } else if (weatherCode = 85) {
                    self.setState({weatherCode: 'Snow Showers'})
                } else if (weatherCode = 86) {
                    self.setState({weatherCode: 'Hvy. Snow Showers'})
                } else if (weatherCode = 95) {
                    self.setState({weatherCode: 'Thuderstorm'})
                } else if (weatherCode = 96) {
                    self.setState({weatherCode: 'Thunderstorm with hail'})
                } else if (weatherCode = 99) {
                    self.setState({weatherCode: 'T.storm with heavy hail'})
                }


           
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
    



    render() {

        var {data} = this.state

        if(data.length === 0) {  

                return(
                    <Box sx={{height: '100%' , mt: 7}}>

                        <Grid container sx={{justifyContent: 'center' , alignItems: 'center' , height: '100%'}}>
                            <Grid item xs={1}>


                                    <CircularProgress  />

                            </Grid>
                        </Grid>


                    </Box>
                )


       } else {
      
                return (


                                <>

                                    <Box>
                                        <Container fullWidth="false">
                                        <Card sx={{ width: '100%' }}>

                                            <CardContent>
                                                <Grid container sx={{justifyContent: 'space-between' , alignItems: 'center'}}>
                                                    <Grid item xs={12} sm={2} sx={{fontWeight: 600}}>
                                                        <Typography variant="h5">Current Weather:</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2} sx={{mt: {xs: 1 , sm: 0}}}>
                                                        <Typography variant="p">{this.state.date}</Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container sx={{justifyContent: 'center' , mt: 1 , my: 2}} spacing={1}>
                                                    <Grid item xs={12} sm={4} sx={{display: 'flex' , alignItems: 'center' , justifyContent: { xs: 'center' , sm:"end"}}}>
                                                        <Typography variant="h4" >{data.daily.temperature_2m_min}{'\u00b0C'}</Typography>
                                                    </Grid>
                                                    <Grid item sm={2} md={1}sx={{display: {xs: 'none' , sm:'flex'} , justifyContent: 'center'}}>
                                                        <Divider orientation="vertical" flexItem />
                                                    </Grid>
                                                    <Grid item xs={12} md={5} sm={5} sx={{display: 'flex' , alignItems: 'center' , justifyContent: { xs: 'center' , md: 'start'} }}>
                                                        <Typography variant="h5"> {this.state.weatherCode}</Typography>
                                                    </Grid>
                                                </Grid>

                                                {

                                                    

                                                    this.state.detailData.map((cur , i)=>{
                                                    
                                                        return(

                                                            <>
                                                            <Grid container sx={{justifyContent: 'space-between' , mt: 1}}>
                                                                <Grid item xs={6}>
                                                                        <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[0]}</Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                        <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[1]}</Typography>

                                                                </Grid>


                                                            </Grid>
                                                        {
                                                            i === this.state.detailData.length - 1 ? console.log('MS') : <Divider sx={{mt: 1}}/>
                                                        }

                                                             
                                                            </>
                                                        )
                                                    })

                                                }

                                                
                                            </CardContent>
                                        </Card>

                                        </Container>
                                    </Box>

                                    <Box sx={{mt: 3}}>
                                        <Container fullWidth={false}>

                                                <Card sx={{ width: '100%' }}>

                                                    <CardContent>
                                                        
                                                        <Grid container sx={{my: 2}}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h5">Other Details:</Typography>
                                                            </Grid>
                                                        </Grid>

                                                    {

                                                 

                                                        this.state.otherDetail.map((cur , i)=>{
                                                            return(

                                                                <>
                                                                <Grid container sx={{justifyContent: 'space-between' , mt: 1}}>
                                                                    <Grid item xs={6}>
                                                                            <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[0]}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                            <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[1]}</Typography>

                                                                    </Grid>


                                                                </Grid>
                                                                       {
                                                            i === this.state.otherDetail.length - 1 ? console.log('MS') : <Divider sx={{mt: 1}}/>
                                                        }
                                                                </>
                                                            )
                                                        })

                                                    }
                                                        
                                                    </CardContent>
                                                    
                                                </Card>

                                        </Container>
                                    </Box>
                                
                                
                                
                                </>


                    )

            }

            
                

    }       
            
 
}

export default Current
            // } else {
      
            //     return (


            //                     <>

            //                         <Box>
            //                             <Container fullWidth="false">
            //                             <Card sx={{ width: '100%' }}>

            //                                 <CardContent>
            //                                     <Grid container sx={{justifyContent: 'space-between' , alignItems: 'center'}}>
            //                                         <Grid item xs={12} sm={2} sx={{fontWeight: 600}}>
            //                                             <Typography variant="h5">Current Weather:</Typography>
            //                                         </Grid>
            //                                         <Grid item xs={12} sm={2} sx={{mt: {xs: 1 , sm: 0}}}>
            //                                             <Typography variant="p">{this.state.date}</Typography>
            //                                         </Grid>
            //                                     </Grid>

            //                                     <Grid container sx={{justifyContent: 'center' , mt: 1 , my: 2}} spacing={1}>
            //                                         <Grid item xs={12} sm={4} sx={{display: 'flex' , alignItems: 'center' , justifyContent: { xs: 'center' , sm:"end"}}}>
            //                                             <Typography variant="h4" >{data.main.temp}{'\u00b0C'}</Typography>
            //                                         </Grid>
            //                                         <Grid item sm={2} md={1}sx={{display: {xs: 'none' , sm:'flex'} , justifyContent: 'center'}}>
            //                                             <Divider orientation="vertical" flexItem />
            //                                         </Grid>
            //                                         <Grid item xs={12} md={5} sm={5} sx={{display: 'flex' , alignItems: 'center' , justifyContent: { xs: 'center' , md: 'start'} }}>
            //                                             <CloudIcon fontSize="large" sx={{mx: 1}} />
            //                                             <Typography variant="h5"> {data.weather[0].main}</Typography>
            //                                         </Grid>
            //                                     </Grid>

            //                                     {

                                                 

            //                                         this.state.detailData.map((cur , i)=>{
            //                                             return(

            //                                                 <>
            //                                                 <Grid container sx={{justifyContent: 'space-between' , mt: 1}}>
            //                                                     <Grid item xs={6}>
            //                                                             <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[0]}</Typography>
            //                                                     </Grid>
            //                                                     <Grid item xs={6}>
            //                                                             <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[1]}</Typography>

            //                                                     </Grid>


            //                                                 </Grid>
            //                                                 <Divider sx={{mt: 1}}/> 
            //                                                 </>
            //                                             )
            //                                         })

            //                                     }

                                                
            //                                 </CardContent>
            //                             </Card>

            //                             </Container>
            //                         </Box>

            //                         <Box sx={{mt: 3}}>
            //                             <Container fullWidth={false}>

            //                                     <Card sx={{ width: '100%' }}>

            //                                         <CardContent>
                                                        
            //                                             <Grid container sx={{my: 2}}>
            //                                                 <Grid item xs={12}>
            //                                                     <Typography variant="h5">Other Details:</Typography>
            //                                                 </Grid>
            //                                             </Grid>

            //                                         {

                                                 

            //                                             this.state.otherDetail.map((cur , i)=>{
            //                                                 return(

            //                                                     <>
            //                                                     <Grid container sx={{justifyContent: 'space-between' , mt: 1}}>
            //                                                         <Grid item xs={6}>
            //                                                                 <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[0]}</Typography>
            //                                                         </Grid>
            //                                                         <Grid item xs={6}>
            //                                                                 <Typography variant="h6" sx={{textAlign: 'center' , fontSize: { xs: '1rem' , sm: '1.25rem'}}}>{cur[1]}</Typography>

            //                                                         </Grid>


            //                                                     </Grid>
            //                                                     <Divider sx={{mt: 1}}/> 
            //                                                     </>
            //                                                 )
            //                                             })

            //                                         }
                                                        
            //                                         </CardContent>
                                                    
            //                                     </Card>

            //                             </Container>
            //                         </Box>
                                
                                
                                
            //                     </>


            //         )

            // }