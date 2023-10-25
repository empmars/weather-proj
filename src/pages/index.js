import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import * as React from 'react';
import Nav from '../components/nav/main.js';
import TabsMain from '../components/tabs/main.js';
const {flag} = require('country-emoji');


var  theme = createTheme();
theme = responsiveFontSizes(theme);


class App extends React.Component  {

  constructor(props) {

      super(props)
      this.state = {
        matchedName: [[] , []],
        matchedCords: {},
      
      }


  }

  searchField = (e) => {
      var self = this

      var name = e.target.value
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`)
      .then(res=>res.json())
      .then(result=>{
              console.log(result)
        if(result.results) {
          var matchedName = result.results.map((cur) => {
            var code = cur.country_code.toLowerCase()
            
            return `${cur.name} ${flag(code)} (${cur.latitude} , ${cur.longitude})`

          }) 

          var cords =  result.results.map((cur) => {
            
            return [cur.name , cur.latitude , cur.longitude]

          })

          var matchedNameArr = [matchedName, cords]
                 
            self.setState({matchedName: matchedNameArr})
     
        }
          
        })
    
  }

  selectedCords = (cordObj) => {
       var final = this.state.matchedName[1].map((cur , i)=>{
             
              
              if(cur[1] == cordObj.latitude && cur [2] == cordObj.longitude) {
                var obj = {
                  'latitude' : cur[1],
                  'longitude': cur[2]
                }
                this.setState({matchedCords : obj})
              }
       })
  }



  render() {
  

        return (
          <>
           <ThemeProvider theme={theme}>
              <Nav searchField = {(e)=>{this.searchField(e)}} matchedName = {this.state.matchedName} selectedCords={(cordObj)=>{this.selectedCords(cordObj)}}/>
              <TabsMain customLoc= {this.state.matchedCords} />
            </ThemeProvider>
          </>
        )


  }


  

}

export default App;
