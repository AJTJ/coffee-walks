import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

   constructor() {
      super()

      this.state = {
         showingInfoWindow: false,
         activeMarker: {},
         selectedPlace: {},
         areaLat: '',
         areaLng: ''
      }

      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.onMapClicked = this.onMapClicked.bind(this);
   }

   onMarkerClick(marker) {
      //This is just an onclick.
      this.setState({
         selectedPlace: {},
         activeMarker: marker,
         showingInfoWindow: true
      });
   }

   onMapClicked(props) {
      if (this.state.showingInfoWindow) {
         this.setState({
            showingInfoWindow: false,
            activeMarker: null
         })
      }
   }

   componentWillReceiveProps(props) {
      this.setState({
         areaLat: this.props.areaLat,
         areaLng: this.props.areaLng
      }), () => render();
   }



   render(props) {
      return (
         <Map 
            google={this.props.google} 
            zoom={13}
            center={{
               lat: this.state.areaLat,
               lng: this.state.areaLng
            }}
         >
            {/* Adding a marker based on specific lag and lng */}
            <Marker 
               onClick={this.onMarkerClick}
               zoom={14}
               position= {{
                  lat: this.state.areaLat,
                  lng: this.state.areaLng
               }} 
               name={'starting location'} 
            />
            {/* <Marker 
               onClick={this.onMarkerClick} 
               name={'The marker that they gave us'}
               position= {{
                  lat: this.state.areaLat,
                  lng: this.state.areaLng
               }}
            /> */}
            <InfoWindow 
               onOpen={this.windowHasOpened}
               onClose={this.onInfoWindowClose}
               visible={this.state.showingInfoWindow}
            >
               <div>
                  <h1 className="placeText">{this.state.selectedPlace.name}</h1>
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