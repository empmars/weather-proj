import React from 'react'
import { Box  , Container , Grid , Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Current = ({data , locs}) => {


    console.log(data.dt)
    console.log(locs)

    const [refined , setRefined] = React.useState([])

    const refineData = () => {
        var newDate = new Date(data.dt * 1000)
        var newDate2 = newDate.toUTCString()
        
        console.log(newDate2)
    }
    refineData()

  return (


            <>

                <Box>
                    <Container fullWidth="false">
                    <Card sx={{ width: '100%' }}>

                        <CardContent>
                            <Grid container sx={{justifyContent: 'space-between' , alignItems: 'center'}}>
                                <Grid item sm={2} sx={{fontSize: '1.1rem' , fontWeight: 600}}>
                                     <Typography variant="h5">Current Weather</Typography>
                                </Grid>
                                <Grid item sm={2}>
                                    <Typography variant="p">September 14, 2016</Typography>
                                </Grid>
                            </Grid>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                            </Typography>
                            <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>

                    </Container>
                </Box>
            
            
            
            </>


  )
}

export default Current