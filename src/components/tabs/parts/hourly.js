import { Box, Container, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import { WiDayCloudy, WiDayFog, WiDayRain, WiDayRainWind, WiDaySnow, WiDaySunny, WiDayThunderstorm, WiShowers, WiSnowWind } from "weather-icons-react";
import { NameContext } from '../main.js';
import { isEmpty } from 'lodash';


function Hourly() {
  const [state, setState] = useState({
    date: new Date().toUTCString().slice(0, 16),
    hours: [],
    isLoading: true
  });
  
  const [loc , setLoc] = React.useState('')

    var context = React.useContext(NameContext)

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

  const get_City_Name = (crd) => {
    fetch(`http://api.positionstack.com/v1/reverse?access_key=8881f0c7f52fd5eaaee9ff9640d41cec&limit=1&query=${crd.latitude},${crd.longitude}`)
      .then(res => res.json())
      .then(result => {
        console.log(result, 'oooooooooooo')
        setLoc(result.data[0].name)

      })

  }


    function success(pos) {
      setState({...state , isLoading: true})
      const crd = pos.coords ? pos.coords : pos

      const key = 'd6b5f518d490caf492baeddece6a688a';

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&forcast_days=1&hourly=temperature_2m,cloudcover,precipitation,precipitation_probability,weathercode&timezone=auto`
      )
        .then((res) => res.json())
        .then((result) => {
          const hours = [];

          let timeNow = new Date().toUTCString();
          timeNow = Number(timeNow.slice(16, 19));

          const timeTill = timeNow + 13;

          for (let i = timeNow; i < timeTill; i++) {
            const timezone = result.timezone;
            const time = new Date(result.hourly.time[i]).toLocaleString('en-US', {
              timezone,
            });
            const weatherCode = result.hourly.weathercode[i];

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
            }

                

            const hoursPart = {
              time: time,
              temp: result.hourly.temperature_2m[i],
              Clouds: result.hourly.cloudcover[i],
              rainTod: result.hourly.precipitation[i],
              rainChan: result.hourly.precipitation_probability[i],
              weatherName,
              code: weatherCode,
              icon,
            };

            hours.push(hoursPart);
          }
          get_City_Name(crd)

          setState((prevState) => ({
            ...prevState,
            hours,
            isLoading: false
          }));
        });
    }

    function errors(err) {
      console.log(err);
    }

  const Navigator_Functions = (success, errors, options) => {
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



  const { hours , isLoading} = state;

  if (isLoading) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <Box>
        <Container fullWidth={false}>
          <Box>
            <Card sx={{mb: 3 , width: '100%'}}>
              <CardContent>
                  <Grid container sx={{justifyContent: 'center'}}>
                    <Grid item>
                        <Typography variant='h4'>{isEmpty(loc) ? 'Hourly Weather' : loc}</Typography>
                    </Grid>
                  </Grid>
              </CardContent>
            </Card>
          </Box>
          {hours.map((cur, i) => (
            <>
              <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                  <Grid container sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sx={{ fontWeight: 600 }}>
                      <Typography variant="h5">{cur.time}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: 'center', mt: 1, my: 2 }} spacing={1}>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'end' } }}>
                      <Typography variant="h4">{cur.temp}{'\u00b0C'}</Typography>
                    </Grid>
                    <Grid item sm={2} md={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                      <Divider orientation="vertical" flexItem />
                    </Grid>
                    <Grid item xs={12} md={5} sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'start' } }}>
                      {cur.icon}
                      <Typography variant="h5" sx={{ ml: 1 }}>{cur.weatherName}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: 'center', mt: 3 }}>
                    <Grid item md="3" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">Clouds:</Typography>
                      <Typography variant="h6">{`${cur.Clouds}%`}</Typography>
                    </Grid>
                    <Grid item md="1" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Divider orientation="vertical" />
                    </Grid>
                    <Grid item md="3" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">Rain Todays:</Typography>
                      <Typography variant="h6">{`${cur.rainTod}mm`}</Typography>
                    </Grid>
                    <Grid item md="1" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Divider orientation="vertical" />
                    </Grid>
                    <Grid item md="3" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">Rain Chances:</Typography>
                      <Typography variant="h6">{`${cur.rainChan}%`}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </>
          ))}
        </Container>
      </Box>
    );
  }
}

export default Hourly;
