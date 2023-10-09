import React from 'react';
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';


class Hourly extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date : new Date().toUTCString().slice(0 , 16),
            data: [] , 
            otherData: [],
            otherDetail: []
        }
    }




    // console.log(data)

    componentDidMount() {

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
                            console.log(result)

                            var hours = []

                            for ( var i = 0 ; i < 12 ; i++ ) {

                                console.log('hoursPart')
                                var hoursPart = {
                                        time : result.hourly.time[i] 

                                }
                                hours.push(hoursPart)
                            }
                            
                            console.log(hours)

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

        return (
                <>
                    <Box>
                        <Container fullWidth={false}>

                            <Card sx={{ width: '100%' }}>

                                <CardContent>

                                    
                                    <Grid container sx={{alignItems: 'center'}}>

                                        <Grid item xs={12} sm={12} sx={{fontWeight: 600}}>
                                            <Typography variant="h5">Hourly Forecast:</Typography>
                                        </Grid>
                                        
                                    </Grid>


                                    
                                </CardContent>
                            </Card>

                        </Container>
                    </Box>

                
                </>
            )

    }

}

export default Hourly