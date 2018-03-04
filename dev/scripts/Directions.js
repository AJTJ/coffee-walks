
import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

// const { compose, withProps, lifecycle } = require("recompose");
// const {
//    withScriptjs,
//    withGoogleMap,
//    GoogleMap,
//    DirectionsRenderer,
// } = require("react-google-maps");



const MapWithADirectionsRenderer = compose(
   withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   withScriptjs,
   withGoogleMap,
   lifecycle({
      componentDidMount(props) {
         const DirectionsService = new google.maps.DirectionsService();

         DirectionsService.route({
            origin: new google.maps.LatLng(
            43.6687987, -79.3912515),
            destination: new google.maps.LatLng(
               43.6461046, -79.3825715),
            travelMode: google.maps.TravelMode.WALKING,
         }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
               console.log(result);
               this.setState({
                  directions: result,
               });
            } else {
               console.error(`error fetching directions ${result}`);
            }
         });
      }
   })
   
)(props =>
   <GoogleMap
      defaultZoom={7}
      defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
   >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
   </GoogleMap>
);


class Directions extends React.PureComponent {
   constructor() {
      super()
      this.state = {
         isMarkerShown: false,
      }

      // this.delayedShowMarker = this.delayedShowMarker.bind(this);
      // this.handleMarkerClick = this.handleMarkerClick.bind(this);
   }

   delayedShowMarker() {
      setTimeout(() => {
         this.setState({ isMarkerShown: true })
      }, 3000)
   }

   handleMarkerClick() {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
   }

   render() {
      return (
         <MapWithADirectionsRenderer />
      )
   }
}

export default Directions;




// import React from 'react';
// import ReactDOM from 'react-dom';
// import axios from "axios";
// import Qs from 'qs';

// let key1 = "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg"
// let key2 = "AIzaSyAX858sfNr7KcSp6NdszHBoxH8ZDix-nf8"
// let key3 = "AIzaSyA3iTZwH8cw1ZHEDOOykYqzrPK-7WBzJgA"
// let key4 = "AIzaSyAmlAUFOnmBXKDuYmCTVFbEKejUPCZOQBg"
// let key5 = "AIzaSyDPIDnwygCBYYAxcjXu4S8aeogRkWAYXDI"

// class Directions extends React.Component {
//    constructor() {
//       super()

//       this.directionsSearch = this.directionsSearch.bind(this);
//    }

//    directionsSearch() {

//       axios({
//          method: "GET",
//          url: "http://proxy.hackeryou.com",
//          dataResponse: "json",
//          paramsSerializer: function(params) {
//             return Qs.stringify(params, { arrayFormat: "brackets" });
//          },
//          params: {
//             reqUrl: "https://maps.googleapis.com/maps/api/directions/json",
//             params: {
//                key: key3,
//                origin: "43.6687987, -79.3912515",
//                destination: "43.650662, -79.358266",
//                mode: "walking",
//                alternatives: true,
//                units: "metric",
//             },
//          proxyHeaders: {
//             header_params: "value"
//          },
//             xmlToJSON: false
//         }
//       }).then(({data}) => {
//          console.log(data);
//       });
//    }  
   
//    render() {
//       return (
//          <div>
//             <button onClick={this.directionsSearch}>Directions Button</button>
//          </div>
         
//       )
//    }
// }

// export default Directions;