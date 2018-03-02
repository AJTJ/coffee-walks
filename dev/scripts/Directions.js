import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Qs from 'qs';

class Directions extends React.Component {
   constructor() {
      super()

      this.directionsSearch = this.directionsSearch.bind(this);
   }

   directionsSearch() {

      axios({
        method: "GET",
        url: "http://proxy.hackeryou.com",
        dataResponse: "json",
        paramsSerializer: function(params) {
          return Qs.stringify(params, { arrayFormat: "brackets" });
        },
        params: {
          reqUrl: "https://maps.googleapis.com/maps/api/directions/json",
          params: {
            key: "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg",
            origin: "43.6687987, -79.3912515",
            destination: "43.650662, -79.358266",
            mode: "walking",
            alternatives: true,
            units: "metric",
          },
          proxyHeaders: {
            header_params: "value"
          },
          xmlToJSON: false
        }
      }).then(res => {
        console.log(res);
      });
   }  
   
   render() {
      return (
         <div>
            <button onClick={this.directionsSearch}>Directions Button</button>
         </div>
         
      )
   }
}

export default Directions;