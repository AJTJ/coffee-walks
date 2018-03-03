// import React from "react"
// import { compose, withProps, lifecycle } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const { compose, withProps, lifecycle } = require("recompose");
// const {
//    withScriptjs,
//    withGoogleMap,
//    GoogleMap,
//    DirectionsRenderer,
// } = require("react-google-maps");

// const MapWithADirectionsRenderer = compose(
//    withProps({
//       googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%` }} />,
//    }),
//    withScriptjs,
//    withGoogleMap,
//    lifecycle({
//       componentDidMount(props) {
//          const DirectionsService = new google.maps.DirectionsService();

//          DirectionsService.route({
//             origin: new google.maps.LatLng(41.8507300, -87.6512600),
//             destination: new google.maps.LatLng(41.8525800, -87.6514100),
//             travelMode: google.maps.TravelMode.DRIVING,
//          }, (result, status) => {
//             if (status === google.maps.DirectionsStatus.OK) {
//                this.setState({
//                   directions: result,
//                });
//             } else {
//                console.error(`error fetching directions ${result}`);
//             }
//          });
//       }
//    })
// )(props =>
//    <GoogleMap
//       defaultZoom={7}
//       defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
//    >
//       {props.directions && <DirectionsRenderer directions={props.directions} />}
//    </GoogleMap>
// );

// class MapContainer extends React.PureComponent {
//    constructor() {
//       super()
//       this.state = {
//          isMarkerShown: false,
//       }

//       // this.delayedShowMarker = this.delayedShowMarker.bind(this);
//       // this.handleMarkerClick = this.handleMarkerClick.bind(this);
//    }

//    delayedShowMarker() {
//       setTimeout(() => {
//          this.setState({ isMarkerShown: true })
//       }, 3000)
//    }

//    handleMarkerClick() {
//       this.setState({ isMarkerShown: false })
//       this.delayedShowMarker()
//    }

//    render() {
//       return (
//          <MapWithADirectionsRenderer />
//       )
//    }
// }

// export default MapContainer;




import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
   withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `80vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   withScriptjs,
   withGoogleMap
)((props) =>
   <GoogleMap
      defaultZoom={14}
      defaultCenter={{ 
         lat: props.areaLat, 
         lng: props.areaLng 
      }}
   >
      {props.isMarkerShown && <Marker 
         position={{ lat: props.areaLat, lng: props.areaLng }} 
         onClick={props.onMarkerClick} 
      />}
   </GoogleMap>
)

class MapContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isMarkerShown: false,
      areaLat: "",
      areaLng: ""
    };

    // this.delayedShowMarker = this.delayedShowMarker.bind(this);
    // this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  }

  handleMarkerClick() {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  componentWillReceiveProps(props) {
    this.setState(
      {
        areaLat: props.areaLat,
        areaLng: props.areaLng
      },
      () => this.render()
    );
  }

  render() {
    return (
      <MyMapComponent
        areaLat={this.state.areaLat}
        areaLng={this.state.areaLng}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

export default MapContainer;