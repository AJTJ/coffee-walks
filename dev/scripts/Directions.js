
import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"


//WRAPPER COMPONENT FOR OUR DIRECTIONS RENDERER
class Map extends React.PureComponent {
   constructor(props) {
      super(props)
   }

   render() {
      const { startLat, startLng, endLat, endLng } = this.props;

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
            componentDidMount() {
               const DirectionsService = new google.maps.DirectionsService();

               DirectionsService.route({
                  origin: new google.maps.LatLng(
                     startLat, startLng),
                  destination: new google.maps.LatLng(
                     endLat, endLng),
                  travelMode: google.maps.TravelMode.WALKING,
               }, (result, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                     console.log(result);
                     // this is bound not Map's this.setState
                     // rather withing the compose lifecycle
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
      
      return(
         <MapWithADirectionsRenderer />
      );
   }
}

//OUR DIRECTIONS COMPONENT

class Directions extends React.PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         isMarkerShown: false,
         firstChoice: [],
         endChoice: [],
         user: null,
         startTimeChosen: false,
         startTime: ''
      }
      console.log(props.location.state);
      this.saveWalk = this.saveWalk.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.submitStartTime = this.submitStartTime.bind(this);
   }


   handleChange(e) {
      console.log(e.target.value);
      this.setState({
         [e.target.id]: e.target.value
      }); 
   }

   saveWalk(e) {
      //must reference our current database
      //create a reference in firebase using the UID in the user  object

      const dbRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);

      //this is to push your information into the database
      dbRef.push({
         start: this.props.location.state.firstChoice, 
         end: this.props.location.state.endChoice,
         startTime: this.state.startTime
      })

   }

   submitStartTime(e) {
      e.preventDefault();
      this.setState({
         startTimeChosen: true,
      })
      
   }

   render(props) {
      const { firstChoice, endChoice } = this.props.location.state;
      const { lat: startLat, lng: startLng} = firstChoice.geometry.location;
      const { lat: endLat, lng: endLng } = endChoice.geometry.location;

      return (
         <div>
            {this.state.startTimeChosen ? (
               <button type="button" onClick={this.saveWalk}>Save this walk!</button>
            ) : (
               <div>
                  <form action="" onSubmit={this.submitStartTime}>
                     <label htmlFor="">Insert your start time</label>
                     <input onChange={this.handleChange} value={this.state.startTime} type="text" id="startTime" />
                     <input type="submit" value="Confirm Start Time"/>
                  </form>
               </div>
            )}
            <Map
               startLat={startLat}
               startLng={startLng}
               endLat={endLat}
               endLng={endLng}
            />
         </div>
      )
   }
}

export default Directions;