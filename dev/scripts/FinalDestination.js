import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import axios from "axios";
import Qs from "qs";

let key1 = "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg";
let key2 = "AIzaSyAX858sfNr7KcSp6NdszHBoxH8ZDix-nf8";
let key3 = "AIzaSyA3iTZwH8cw1ZHEDOOykYqzrPK-7WBzJgA";
let key4 = "AIzaSyAmlAUFOnmBXKDuYmCTVFbEKejUPCZOQBg";
let key5 = "AIzaSyDPIDnwygCBYYAxcjXu4S8aeogRkWAYXDI";

// const MyMapComponent = compose(
//    withProps({
//       googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `80vh` }} />,
//       mapElement: <div style={{ height: `100%` }} />,
//    }),
//    withStateHandlers(() => ({
//       isOpen: false,
//    }), {
//          onToggleOpen: ({ isOpen }) => () => ({
//             isOpen: !isOpen,
//          })
//       }),
//    withScriptjs,
//    withGoogleMap
// )((props) =>
//    <GoogleMap
//       defaultZoom={14}
//       defaultCenter={{
//          lat: props.areaLat,
//          lng: props.areaLng
//       }}
//    >
//       <Marker
//          position={{ lat: props.areaLat, lng: props.areaLng }}
//          onClick={props.onToggleOpen}

//          defaultOpacity={0.5}
//       >
//          {props.isOpen &&
//             <InfoWindow onCloseClick={props.onToggleOpen}>
//                <div>
//                   <p>{props.nearbyPlaces[0].name}</p>
//                   <button onClick={props.handleClick}>Confirm Cafe</button>
//                </div>
//             </InfoWindow>}
//       </Marker>

//       {props.nearbyPlaces.map((place, i) => {
//          console.log(place)
//          return (
//             <Marker
//                position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
//                onClick={props.onToggleOpen}
//                key={place.id}
//             >
//                {props.isOpen &&
//                   <InfoWindow onCloseClick={props.onToggleOpen}>
//                      <div>
//                         <p>{props.nearbyPlaces[i].name}</p>
//                         <button className="startingDest" onClick={() => props.handleClick(place)} >MurdahFISH</button>

//                      </div>
//                   </InfoWindow>
//                }
//             </Marker>
//          )
//       })}
//    </GoogleMap>

// );

class FinalDestinationContainer extends React.PureComponent {
   constructor() {
      super();
      this.state = {
         isMarkerShown: false,
         areaLat: "",
         areaLng: "",
         nearbyPlaces: [],
         firstChoice: []
      };
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(place) {
      console.log('button clicked');
      this.setState({
         firstChoice: place
      })

   }

   componentWillReceiveProps(props) {
      console.log(props)
      this.setState({
         firstChoice: props.firstChoice
      }, () => this.nearbySearch())
   }

   nearbySearch() {
      console.log(this.state.firstChoice)
      // console.log(this.state.lat, this.state.lng)
      // axios({
      //   method: "GET",
      //   url: "http://proxy.hackeryou.com",
      //   dataResponse: "json",
      //   paramsSerializer: function(params) {
      //     return Qs.stringify(params, { arrayFormat: "brackets" });
      //   },
      //   params: {
      //     reqUrl:
      //       "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      //     params: {
      //       key: key1,
      //       location: `${this.state.firstChoice.geometry.location.lat},${
      //         this.state.firstChoice.geometry.location.lng}`,
      //       radius: 5000,
      //       type: "cafe"
      //     },
      //     proxyHeaders: {
      //       header_params: "value"
      //     },
      //     xmlToJSON: false
      //   }
      // }).then(({ data }) => {
      //   console.log(data);
      // //   this.setState(
      // //     {
      // //       nearbyPlaces: data.results
      // //     },
      // //     () => console.log("callback too")
      // //   );
      // });
   }  

   render() {
      return (
         <div>

         </div>
         // <MyMapComponent

         //    firstChoice={this.state.firstChoice}
         //    // areaLat={this.state.areaLat}
         //    // areaLng={this.state.areaLng}
         //    // nearbyPlaces={this.state.nearbyPlaces}

         //    // isMarkerShown={this.state.isMarkerShown}
         //    // onMarkerClick={this.handleMarkerClick}
         //    // handleClick={this.handleClick}
         // />
      );
   }
}

export default FinalDestinationContainer;