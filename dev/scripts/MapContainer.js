import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = compose(
   withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `80vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   withStateHandlers(() => ({
      isOpen: false, 
      selectedID: '',
   }), {
   onToggleOpen: ({ isOpen, selectedID }) => (selectedID) => ({
      isOpen: !isOpen,
      selectedID,
     })
   }),
   withScriptjs,
   withGoogleMap
)((props) =>
   <GoogleMap
      defaultZoom={13}
      defaultCenter={{ 
         lat: props.areaLat, 
         lng: props.areaLng 
      }}
   >
   <Marker 
      position={{ lat: props.areaLat, lng: props.areaLng }} 
      onClick={props.onToggleOpen}

      defaultOpacity= {0.5}

      // onClick={props.onMarkerClick} 
   >
      {/* {props.isOpen && 
      <InfoWindow onCloseClick={props.onToggleOpen}>
         <div>
            <p>{props.nearbyPlaces[0].name}</p>

            <button onClick={props.handleClick}>Confirm Cafe</button>

         </div>
      </InfoWindow>} */}
   </Marker>

   {props.nearbyPlaces.map((place, i) => {
      console.log(place)
      return (
         <Marker 
         position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
         onClick={() => props.onToggleOpen(place.id)}
         key={place.id}
         >
         {props.isOpen && props.selectedID === place.id &&
            <InfoWindow className="infoWindowContainer" onCloseClick={() => props.onToggleOpen(place.id)}>
               <div className="infoWindows">
                  <p className="infoWindow_header">{props.nearbyPlaces[i].name}</p>
                  <p>{props.nearbyPlaces[i].vicinity}</p>
                  <p>{props.nearbyPlaces[i].rating}</p>
                  {/* <p>{props.nearbyPlaces[i].opening_hours.open_now}</p> */}
                  
                  {/* <img src={props.nearbyPlaces[i].photos[1]} /> */}
                  <button className="optionButton startingDest" onClick={() => props.handleStartCafeClick(place)}>Confirm Starting Cafe</button>
                  <button className="optionButton endingDest" onClick={() => props.handleEndCafeClick(place)}>Confirm Ending Cafe</button>
               </div>
               
            </InfoWindow>}
            
         </Marker>
      )
   })}
   </GoogleMap>
);



{/* <FaAnchor /> */}

{/* < MyMapComponent
   googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
   loadingElement = {< div style = {{ height: `100%` }} />}
   containerElement = {< div style = {{ height: `400px` }} />}
   mapElement = {< div style = {{ height: `100%` }} />}
/> */}

class MapContainer extends React.PureComponent {
   constructor() {
      super();
      this.state = {
         // loadMap: false,
         isMarkerShown: false,
         areaLat: "",
         areaLng: "",
         nearbyPlaces: [],
      };

   this.delayedShowMarker = this.delayedShowMarker.bind(this);
   this.handleMarkerClick = this.handleMarkerClick.bind(this);
   }

   componentDidMount() {
      this.delayedShowMarker();
   }

   cafeClick() {
      console.log('newStyle')
   }

   delayedShowMarker() {
      setTimeout(() => {
         this.setState({ isMarkerShown: true });
      }, 3000);
   }

   handleMarkerClick(e) {
      e.preventDefault(); 
      this.setState({ isMarkerShown: false });
      this.delayedShowMarker();
   
   }


   // componentWillReceiveProps(nextProps) {
   //    console.log(nextProps, this.props);

   //    if (
   //       nextProps.areaLat !== this.props.areaLat && 
   //       nextProps.areaLng !== this.props.areaLng && 
   //       nextProps.nearbyPlaces !== this.props.nearbyPlaces
   //    ) {
   //       this.setState({ loadMap: true });
   //    }
   // }

  render() {
      const { loadMap } = this.state;
      const { areaLat, areaLng, nearbyPlaces } = this.props;

      return (
         <MyMapComponent
            areaLat={areaLat}
            areaLng={areaLng}
            nearbyPlaces={nearbyPlaces}

            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            handleClick={this.handleClick}
            handleStartCafeClick={this.props.handleStartCafeClick}
            handleEndCafeClick={this.props.handleEndCafeClick}
         />  

      );
   }
}

export default MapContainer;