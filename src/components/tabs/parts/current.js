import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { WiDayCloudy, WiDayFog, WiDayRain, WiDayRainWind, WiDaySnow, WiDaySunny, WiDayThunderstorm, WiShowers, WiSnowWind } from "weather-icons-react";
import { NameContext } from '../main.js';
import { isEmpty } from 'lodash';

const CurrentLocation = (props) => {
  const [state, setState] = useState({
    date: new Date().toUTCString().slice(0, 16),
    data: [],
    loc: [],
    detailData: [],
    otherDetail: [],
    wName: '',
    context: {},
    isLoading: true
  });
  const [loc , setLoc] = React.useState('')

  const context = useContext(NameContext);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const get_City_Name = (crd) => {
      fetch(`http://api.positionstack.com/v1/reverse?access_key=8881f0c7f52fd5eaaee9ff9640d41cec&limit=1&query=${crd.latitude},${crd.longitude}`)
      .then(res=>res.json())
      .then(result=>{
        console.log(result , 'oooooooooooo')
        setLoc(result.data[0].name)
         
      })
  
  }

  const success = (pos) => {
    setState({...state , isLoading: true})
    const crd = pos.coords ? pos.coords : pos

    var name = ''
    get_City_Name(crd , name)

    

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,uv_index_max,uv_index_clear_sky_max,windgusts_10m_max,precipitation_probability_max,weathercode&hourly=surface_pressure&timezone=auto&forecast_days=1`
    )
      .then((res) => res.json())
      .then((result) => {

        console.log(result)
        const formatTime = (date) => {
          date = new Date(date);
          const hours = date.getHours();
          let mins = date.getMinutes();
          mins = mins < 10 ? '0' + mins : mins;
          let time = hours + ':' + mins;
          time = hours > 12 ? time + ' PM' : time + ' AM';
          return time;
        };

        const arr = [
          ['Min. Temp:', result.daily.temperature_2m_min],
          ['Max. Temp:', result.daily.temperature_2m_max],
          ['Feels Like:', result.daily.apparent_temperature_min],
          ['Total Rain (meters):', result.daily.precipitation_sum],
          ['Sunrise:', formatTime(result.daily.sunrise[0])],
          ['Sunset:', formatTime(result.daily.sunset[0])],
        ];

        const otherArr = [
          ['Wind Speed(m/s):', result.daily.windspeed_10m_max],
          ['Gust Speed(m/s):', result.daily.windgusts_10m_max],
          ['Wind Direction:', result.daily.winddirection_10m_dominant],
          ['UV Index:', result.daily.uv_index_max],
          ['UV Index with Clear Sky:', result.daily.uv_index_clear_sky_max],
        ];

        const weatherCode = result.daily.weathercode[0];
        let weatherName = '';
        let icon = '';

        switch (weatherCode) {
          case 0:
            weatherName = 'Clear Sky';
            icon = <WiDaySunny size={35} color={'#1976d2'} />;
            break;
          case 1:
            weatherName = 'Mainly Clear';
            icon = <WiDaySunny size={35} color={'#1976d2'} />;
            break;
          case 2:
            weatherName = 'Partly Clear';
            icon = <WiDayCloudy size={35} color={'#1976d2'} />;
            break;
          case 3:
            weatherName = 'Overcast';
            icon = <WiDayCloudy size={35} color={'#1976d2'} />;
            break;
          case 45:
            weatherName = 'Fog';
            icon = <WiDayFog size={35} color={'#1976d2'} />;
            break;
          case 48:
            weatherName = 'Depositing Fog';
            icon = <WiDayFog size={35} color={'#1976d2'} />;
            break;
          case 51:
            weatherName = 'Drizzle';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 53:
            weatherName = 'Moderate Drizzle';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 55:
            weatherName = 'Dense Drizzle';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 61:
            weatherName = 'Slight Rain';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 63:
            weatherName = 'Moderate Rain';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 65:
            weatherName = 'Dense Rain';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 66:
            weatherName = 'Freezing Rain';
            icon = <WiDayRain size={35} color={'#1976d2'} />;
            break;
          case 67:
            weatherName = 'Heavy Freezing Rain';
            icon = <WiDayRainWind size={35} color={'#1976d2'} />;
            break;
          case 71:
            weatherName = 'Slight Snow';
            icon = <WiDaySnow size={35} color={'#1976d2'} />;
            break;
          case 73:
            weatherName = 'Moderate Snow';
            icon = <WiDaySnow size={35} color={'#1976d2'} />;
            break;
          case 75:
            weatherName = 'Heavy Snow';
            icon = <WiDaySnow size={35} color={'#1976d2'} />;
            break;
          case 77:
            weatherName = 'Snow Grains';
            icon = <WiDayRainWind size={35} color={'#1976d2'} />;
            break;
          case 80:
            weatherName = 'Rain Showers';
            icon = <WiShowers size={35} color={'#1976d2'} />;
            break;
          case 81:
            weatherName = 'Rain Showers';
            icon = <WiShowers size={35} color={'#1976d2'} />;
            break;
          case 82:
            weatherName = 'Violent Showers';
            icon = <WiShowers size={35} color={'#1976d2'} />;
            break;
          case 85:
            weatherName = 'Snow Showers';
            icon = <WiSnowWind size={35} color={'#1976d2'} />;
            break;
          case 86:
            weatherName = 'Heavy Snow Showers';
            icon = <WiSnowWind size={35} color={'#1976d2'} />;
            break;
          case 95:
            weatherName = 'Thunderstorm';
            icon = <WiDayThunderstorm size={35} color={'#1976d2'} />;
            break;
          case 96:
            weatherName = 'Thunderstorm with hail';
            icon = <WiDayThunderstorm size={35} color={'#1976d2'} />;
            break;
          case 99:
            weatherName = 'T.storm with heavy hail';
            icon = <WiDayThunderstorm size={35} color={'#1976d2'} />;
            break;
          default:
            break;
        };

      
      get_City_Name(crd)


        setState((prevState) => ({
          ...prevState,
          data: result,
          detailData: arr,
          otherDetail: otherArr,
          wName: weatherName,
          icon,
          isLoading: false
        }));


      });
  }

  const errors = (err) => {
    console.log(err);
  }

  const Navigator_Functions = (success , errors , options) => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (result) {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        }
      });
  }

  useEffect(() => {
      // API call logic here
      console.log(state.isLoading)
    if(!isEmpty(context)) {
          success(context)
    } else {
          if (navigator.geolocation) {
            Navigator_Functions(success , errors , options)
          } else {
              console.log('Error');
          }
    }
  }, [context]);
  
    const { data } = state;


    if (state.isLoading) {
        return (
            <Box>
                <Container fullWidth={false}>
                    <Card sx={{ width: '100%' }}>
                    <CardContent>
                        <Grid container sx={{ justifyContent: 'center', mt: 1 }}>
                        <Grid item xs={1} sx={{ fontWeight: 600 }}>
                            <CircularProgress />
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Container>
            </Box>
        );
    } else {
        return (
            <>
                <Box>
                    <Container fullWidth="false">
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Grid item xs={12} sm={2} sx={{ fontWeight: 600 }}>
                                        <Typography variant="h5">{isEmpty(loc) ? 'Current Weather' : loc}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2} sx={{ mt: { xs: 1, sm: 0 } }}>
                                        <Typography variant="p">{state.date}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container sx={{ justifyContent: 'center', mt: 1, my: 2 }} spacing={1}>
                                    <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'end' } }}>
                                    <Typography variant="h4">{data.daily.temperature_2m_min}{'\u00b0C'}</Typography>
                                    </Grid>
                                    <Grid item sm={2} md={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                                    <Divider orientation="vertical" flexItem />
                                    </Grid>
                                    <Grid item xs={12} md={5} sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'start' } }}>
                                    {state.icon}
                                    <Typography variant="h5" sx={{ ml: 1 }}>{state.wName}</Typography>
                                    </Grid>
                                </Grid>

                                {state.detailData.map((cur, i) => {
                                    return (
                                        <>
                                            <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[0]}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[1]}</Typography>
                                                </Grid>
                                            </Grid>
                                            {i === state.detailData.length - 1 ? console.log('MS') : <Divider sx={{ mt: 1 }} />}
                                        </>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </Container>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Container fullWidth={false}>
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Grid container sx={{ my: 2 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">Other Details:</Typography>
                                    </Grid>
                                </Grid>
                                {state.otherDetail.map((cur, i) => {
                                    return (
                                        <>
                                            <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[0]}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>{cur[1]}</Typography>
                                                </Grid>
                                            </Grid>
                                            {i === state.otherDetail.length - 1 ? console.log('MS') : <Divider sx={{ mt: 1 }} />}
                                        </>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </Container>
                </Box>
            </>
        );
    }
};

export default CurrentLocation;


