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
      console.log("Directions Search")
      axios({
         method:'GET',
         url: 'http://proxy.hackeryou.com',
         dataResponse:'json',
         paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
         },
         params: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            params: {
               key: "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg",
               DirectionsRequest: {
                  origin: LatLng | String | google.maps.Place,
                  destination: LatLng | String | google.maps.Place,
                  travelMode: TravelMode,
                  transitOptions: TransitOptions,
                  drivingOptions: DrivingOptions,
                  unitSystem: UnitSystem,
                  waypoints[]: DirectionsWaypoint,
                  optimizeWaypoints: Boolean,
                  provideRouteAlternatives: Boolean,
                  avoidFerries: Boolean,
                  avoidHighways: Boolean,
                  avoidTolls: Boolean,
                  region: String
                  }
               // location: `${this.state.lat},${this.state.lng}`,
               // radius: 5000,
               // type: "cafe"
               }, 
            proxyHeaders: {
               'header_params': 'value'
            },
            xmlToJSON: false
         }
         }).then((res) => {
            console.log(res);
      });
   }  
   
   render() {
      return (
         <div>
            <button>Directions Button</button>
         </div>
         
      )
   }
}

export default Directions;