import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component {

   constructor() {
      super()

      this.state = {
         showingInfoWindow: false,
         activeMarker: {},
         selectedPlace: {},
         areaLat: '',
         areaLng: '',
      }

      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.onMapClicked = this.onMapClicked.bind(this);
      this.murderFish = this.murderFish.bind(this); 
   }

   onMarkerClick(props,marker, e) {
      //This is just an onclick.
      console.log("clicked")
      this.setState({
         selectedPlace: props,
         activeMarker: marker,
         showingInfoWindow: true
      });
   }

   onMapClicked(props) {
      if (this.state.showingInfoWindow) {
         this.setState({
            showingInfoWindow: false,
            activeMarker: {}
         })
      }
   }

   componentWillReceiveProps(props) {
      this.setState({
         areaLat: this.props.areaLat,
         areaLng: this.props.areaLng,
      }, () => this.render());
   }

   murderFish() {
      console.log("haaay");
   }


   render(props) {
      return (
         //currently sets the Map somewhere when rendered.
         <Map 
            onClick={this.onMapClicked}
            google={this.props.google} 
            zoom={15}
            center={{
               lat: this.state.areaLat,
               lng: this.state.areaLng
            }}
         >
            {/* Adding a marker based on specific lag and lng */}
            <Marker 
               onClick={this.onMarkerClick}
               // GIVE THIS A UNIQUE STYLE
               zoom={14}
               position= {{
                  lat: this.state.areaLat,
                  lng: this.state.areaLng
               }} 
               name={'starting location'} 
            />
            <Marker 
               className="initialCafes"
               onClick={this.onMarkerClick}
               zoom={14}
               position= {{
                  lat: 43.6687987,
                  lng: -79.3978587
               }} 
               name={'starting location'}  
            />

            {this.props.nearbyPlaces.map((place) => {
               return (
                  <Marker key={place.place_id}
                     onClick={this.onMarkerClick}
                     name={place.name}
                     position= {{
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng
                     }}
                     icon={{
                        url: this.icon
                     }}
                  />
               )
            })}
            <InfoWindow 
               onOpen={this.windowHasOpened}
               onClose={this.onInfoWindowClose}
               visible={this.state.showingInfoWindow}
               onClick={this.murderFish}
            >
               <div>
                  <h1 className="placeText">     
                     {this.state.selectedPlace.name}
                  </h1>
                  <button>Click Me</button>
               </div>
            </InfoWindow>
         </Map>
      );
   }
}

export default GoogleApiWrapper({ apiKey: ('AIzaSyAX858sfNr7KcSp6NdszHBoxH8ZDix-nf8') })(MapContainer)

// props, marker, e

// onInfoWindowClose() {
//    this.setState({
//      showingInfoWindow: false,
//      activeMarker: null
//    })
//  }