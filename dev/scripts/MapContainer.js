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
      defaultZoom={14}
      defaultCenter={{ 
         lat: props.areaLat, 
         lng: props.areaLng 
      }}
   >
   {/* <Marker 
      position={{ lat: props.areaLat, lng: props.areaLng }} 
      onClick={props.onToggleOpen}

      defaultOpacity= {0.5}

      // onClick={props.onMarkerClick} 
   >
      {props.isOpen && 
      <InfoWindow onCloseClick={props.onToggleOpen}>
         <div>
            <p>{props.nearbyPlaces[0].name}</p>

            <button onClick={props.handleClick}>Confirm Cafe</button>

         </div>
      </InfoWindow>}
   </Marker> */}

   {props.nearbyPlaces.map((place, i) => {
      console.log(place)
      return (
         <Marker 
         position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
         onClick={() => props.onToggleOpen(place.id)}
         key={place.id}
         >
         {props.isOpen && props.selectedID === place.id &&
            <InfoWindow onCloseClick={() => props.onToggleOpen(place.id)}>
               <div>
                  <p>{props.nearbyPlaces[i].name}</p>
                  <button className="startingDest" onClick={() => props.handleStartCafeClick(place)}>Confirm Starting Cafe</button>
                  <button className="endingDest" onClick={() => props.handleEndCafeClick(place)}>Confirm Ending Cafe</button>
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


   componentWillReceiveProps(props) {
      this.setState(
         {
            areaLat: props.areaLat,
            areaLng: props.areaLng,
            nearbyPlaces: props.nearbyPlaces,

         },
         () => this.render()
      );
   }

  render() {
      return (
         <MyMapComponent
            areaLat={this.state.areaLat}
            areaLng={this.state.areaLng}
            nearbyPlaces={this.state.nearbyPlaces}
            
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




// class RestaurantMarker extends React.Component {

//    constructor(props) {
//       super(props)

//       this.state = {
//          open: false
//       }
//    }

//    render() {

//       const {
//          name,
//          latitude,
//          longitude
//       } = this.props;


//       // Return Restaurant Marker Component.
//       return (
//          <Marker key={name} position={{ lat: latitude, lng: longitude }}>
//             {this.state.open ? (
//                <InfoWindow onClick={() => this.setState({ open: !this.state.open })}> 
//                   <div>
//                      <p>{name}</p> 
//                   </div>
//                </InfoWindow>
//             ) : ''}
//          </Marker>
//          // <Marker
//          //    position={{ lat: geometry.location.lat, lng: geometry.location.lng }}
//          //    onClick={() => { props.onToggleOpen(place.id); }}
//          //    key={name}
//          // >
//          // {props.isOpen &&
//          //    <InfoWindow onCloseClick={props.onToggleOpen}>
//          //       <div>
//          //          <p>{props.nearbyPlaces[i].name}</p>
//          //          <button onClick={props.handleClick} >MurdahFISH</button>
//          //       </div>
//          //    </InfoWindow>}
//          // </Marker>
//       )
//    }
// }