import React from 'react'
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudIcon from '@mui/icons-material/Cloud';
import Divider from '@mui/material/Divider';

class Current extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toUTCString().slice(0 , 16),
            data : [],
            loc: [],
            detailData: [],
            otherDetail: []
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

      var key = 'ee6f8dd45e1dcbf7168462eed8e430ff'


      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}&units=metric`)
      .then(res=>res.json())
      .then(result => {
        var arr = [[ 'Min. Temp:' , result.main.temp_min] , [ 'Max. Temp:' , result.main.temp_max] , ['Feels Like:' , result.main.feels_like] , ['Humidity:' , result.main.humidity] , ['Pressure(in hPa):' , result.main.pressure]]
        var otherArr = [['Wind Speed(m/s):' , result.wind.speed] , ['Gust Speed(m/s):' , result.wind.gust] , ['Wind Direction:' , result.wind.deg] , ['Visibilty(meter):' ,  result.visibility]]
        self.setState({data: result})
        self.setState({detailData: arr})
        self.setState({otherDetail: otherArr})


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
                                                        <Typography variant="h4" >{data.main.temp}{'\u00b0C'}</Typography>
                                                    </Grid>
                                                    <Grid item sm={2} md={1}sx={{display: {xs: 'none' , sm:'flex'} , justifyContent: 'center'}}>
                                                        <Divider orientation="vertical" flexItem />
                                                    </Grid>
                                                    <Grid item xs={12} md={5} sm={5} sx={{display: 'flex' , alignItems: 'center' , justifyContent: { xs: 'center' , md: 'start'} }}>
                                                        <CloudIcon fontSize="large" sx={{mx: 1}} />
                                                        <Typography variant="h5"> {data.weather[0].main}</Typography>
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
                                                            <Divider sx={{mt: 1}}/> 
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
                                                                <Divider sx={{mt: 1}}/> 
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