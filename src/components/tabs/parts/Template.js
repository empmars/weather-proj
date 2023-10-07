import React from 'react';
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';


class Daily extends React.Component {

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


                    fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${crd.latitude}&lon=${crd.longitude}&cnt=7&appid=d6b5f518d490caf492baeddece6a688a`)
                    .then(res=>res.json())
                    .then(result=>{
                    console.log(result)
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
                                            <Typography variant="h5">Daily Forecast:</Typography>
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

export default Daily