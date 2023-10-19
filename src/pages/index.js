import { Box ,  Container , Grid , TextField , InputAdornment , SvgIcon } from '@mui/material';
import * as React from 'react';
import Nav  from '../components/nav/main.js'
import TabsMain  from '../components/tabs/main.js'
const {flag} = require('country-emoji');




  



class App extends React.Component  {

  constructor(props) {

      super(props)
      this.state = {
        matchedName: [],
        matchedCords: [],
        selectedName: ''
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
            
            return `${cur.name} ${flag(code)}`

          }) 

          var cords =  result.results.map((cur) => {
            
            return [cur.name , cur.latitude , cur.longitude]

          })


        
          console.log(cords) 

          
            self.setState({matchedName: matchedName})

        }
          
        })
    
  }

  selectedName = (name) => {
      this.setState({selectedName : name})    
  }


  render() {
    console.log(this.state)

        return (
          <>
           
            <Nav searchField = {(e)=>{this.searchField(e)}} matchedName = {this.state.matchedName} selectedName={(name)=>{this.selectedName(name)}}/>
            <TabsMain customLoc= {this.state.selectedName} />
          </>
        )


  }


  

}

export default App;
