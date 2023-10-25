import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { WiDayCloudy, WiDayFog, WiDayRain, WiDayRainWind, WiDaySnow, WiDaySunny, WiDayThunderstorm, WiShowers, WiSnowWind } from "weather-icons-react";
import { NameContext } from '../main.js';


const Daily = () => {
    const [state, setState] = useState({
        date: new Date().toUTCString().slice(0, 16),
        weather: [],
        isLoading: true
    });
    const [days, setDays] = useState([])
    const [loc , setLoc] = useState('')

    const context = useContext(NameContext)


    const formatTime = (date) => {
        date = new Date(date);
        const hours = date.getHours();
        let mins = date.getMinutes();
        mins = mins < 10 ? '0' + mins : mins;
        let time = hours + ':' + mins;
        time = hours > 12 ? time + ' PM' : time + ' AM';
        return time;
    };

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
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,uv_index_max,uv_index_clear_sky_max,windgusts_10m_max,precipitation_probability_max,weathercode&hourly=surface_pressure&timezone=auto&forecast_days=4`
        )
            .then((res) => res.json())
            .then((result) => {

                const values = Object.values(result.daily);
                const Keys = Object.keys(result.daily);


                const day1 = values.map((cur, i) => {
                    let name = '';
                    Keys.forEach((curr, index) => {
                        if (i === index) {
                            name = curr;
                        }
                    });
                    const result = [name, cur[1]];
                    return result;
                });

                const day2 = values.map((cur, i) => {
                    let name = '';
                    Keys.forEach((curr, index) => {
                        if (i === index) {
                            name = curr;
                        }
                    });
                    const result = [name, cur[2]];
                    return result;
                });

                const day3 = values.map((cur, i) => {
                    let name = '';
                    Keys.forEach((curr, index) => {
                        if (i === index) {
                            name = curr;
                        }
                    });
                    const result = [name, cur[3]];
                    return result;
                });

                const days = [day1, day2, day3];
                setDays(days);


                var codeArr = [day1[14][1], day2[14][1], day3[14][1]]
                var wcArr = codeArr.map((cur, i) => {
                    var arr = []
                    switch (cur) {
                        case 0:

                            arr = ['Clear Sky',
                                <WiDaySunny size={35} color={'#1976d2'} />
                            ]
                            break;
                        case 1:

                            arr = ['Mainly Clear',
                                <WiDaySunny size={35} color={'#1976d2'} />
                            ]
                            break;
                        case 2:

                            arr = ['Partly Clear',
                                <WiDayCloudy size={35} color={'#1976d2'} />
                            ]
                            break;
                        case 3:

                            arr = ['Overcast',
                                <WiDayCloudy size={35} color={'#1976d2'} />
                            ]
                            break;
                        case 45:
                            arr =
                                ['Fog',
                                    <WiDayFog size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 48:
                            arr =
                                ['Depositing Fog',
                                    <WiDayFog size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 51:
                            arr =
                                ['Drizzle',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 53:
                            arr =
                                ['Moderate Drizzle',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 55:
                            arr =
                                ['Dense Drizzle',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 61:
                            arr =
                                ['Slight Rain',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 63:
                            arr =
                                ['Moderate Rain',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 65:
                            arr =
                                ['Dense Rain',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 66:
                            arr =
                                ['Freezing Rain',
                                    <WiDayRain size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 67:
                            arr =
                                ['Heavy Freezing Rain',
                                    <WiDayRainWind size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 71:
                            arr =
                                ['Slight Snow',
                                    <WiDaySnow size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 73:
                            arr =
                                ['Moderate Snow',
                                    <WiDaySnow size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 75:
                            arr =
                                ['Heavy Snow',
                                    <WiDaySnow size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 77:
                            arr =
                                ['Snow Grains',
                                    <WiDayRainWind size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 80:
                            arr =
                                ['Rain Showers',
                                    <WiShowers size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 81:
                            arr =
                                ['Rain Showers',
                                    <WiShowers size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 82:
                            arr =
                                ['Violent Showers',
                                    <WiShowers size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 85:
                            arr =
                                ['Snow Showers',
                                    <WiSnowWind size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 86:
                            arr =
                                ['Heavy Snow Showers',
                                    <WiSnowWind size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 95:
                            arr =
                                ['Thunderstorm',
                                    <WiDayThunderstorm size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 96:
                            arr =
                                ['Thunderstorm with hail',
                                    <WiDayThunderstorm size={35} color={'#1976d2'} />
                                ]
                            break;
                        case 99:
                            arr =
                                ['T.storm with heavy hail',
                                    <WiDayThunderstorm size={35} color={'#1976d2'} />
                                ]
                            break;
                        default:
                            break;
                    }
                    return arr
                })

                get_City_Name(crd)
                setState({ ...state, weather: wcArr , isLoading: false })


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

        if (!isEmpty(context)) {
            success(context)
        } else {
            if (navigator.geolocation) {
                Navigator_Functions(success, errors, options)
            } else {
                console.log('Error');
            }
        }

    }, [context]); // Empty dependency array to run the effect only once


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
                    <Container fullWidth={false}>
                            <Card sx={{ mb: 3, width: '100%' }}>
                                <CardContent>
                                    <Grid container sx={{ justifyContent: 'center' }}>
                                        <Grid item>
                                            <Typography variant='h4'>{isEmpty(loc) ? 'Hourly Weather' : loc}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                     
                        {
                            days.map((cur, i) => {
                                let WC = [];
                                if (i === 0) {
                                    WC = state.weather[0];
                                } else if (i === 1) {
                                    WC = state.weather[1];
                                } else {
                                    WC = state.weather[2];
                                }


                                const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                const dayName = daysList[new Date(cur[0][1]).getDay()];

                                return (
                               
                                            <Card sx={{ width: '100%' }}>
                                                <CardContent>
                                                    <Grid container sx={{ justifyContent: 'start', alignItems: 'center' }}>
                                                        <Grid item xs={12} sx={{ mt: { xs: 1, sm: 0 } }}>
                                                            <Typography variant="h5">{`${dayName}, ${cur[0][1]}`}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container sx={{ justifyContent: 'center', mt: 1, my: 2 }} spacing={1}>
                                                        <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'end' } }}>
                                                            <Typography variant="h4">{cur[1][1]}{'\u00b0C'}</Typography>
                                                        </Grid>
                                                        <Grid item sm={2} md={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                                                            <Divider orientation="vertical" flexItem />
                                                        </Grid>
                                                        <Grid item xs={12} md={5} sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'start' } }}>
                                                            {WC[1]}
                                                            <Typography variant="h5" sx={{ ml: 1 }}>{WC[0]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Min. Temp{` (\u00b0C)`}:</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[2][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space_between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Max. Temp{` (\u00b0C)`}:</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[1][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Feels Like{` (\u00b0C)`}:</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[3][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Total Rain(meters)</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[5][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Sunrise:</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{formatTime(cur[6][1])}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Sunset:</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{formatTime(cur[7][1])}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Windspeed(m/s):</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[8][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Gust Speed(m/s)</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[12][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{ mt: 1 }} />
                                                    <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>Precipitation Probability:</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{cur[13][1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                
                                );
                            })}
                    </Container>
                </Box>
            </>
        );
    }
}
export default Daily
