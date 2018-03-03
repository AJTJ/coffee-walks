import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Qs from 'qs';

let key1 = "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg"
let key2 = "AIzaSyAX858sfNr7KcSp6NdszHBoxH8ZDix-nf8"
let key3 = "AIzaSyA3iTZwH8cw1ZHEDOOykYqzrPK-7WBzJgA"
let key4 = "AIzaSyAmlAUFOnmBXKDuYmCTVFbEKejUPCZOQBg"
let key5 = "AIzaSyDPIDnwygCBYYAxcjXu4S8aeogRkWAYXDI"

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
               key: key3,
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
      }).then(({data}) => {
         console.log(data);
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