
import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

class Map extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         markers: []
      }
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


class Directions extends React.PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         isMarkerShown: false,
      }
      console.log(props.location.state);
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

   componentWillReceiveProps(props) {
      console.log(props);
   }

   render() {
      const { firstChoice, endChoice } = this.props.location.state;
      const { lat: startLat, lng: startLng} = firstChoice.geometry.location;
      const { lat: endLat, lng: endLng } = endChoice.geometry.location;

      return (
         <Map
            startLat={startLat}
            startLng={startLng}
            endLat={endLat}
            endLng={endLng}
         />
      )
   }
}

export default Directions;