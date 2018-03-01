import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

   constructor() {
      super()

      this.state = {
         showingInfoWindow: false,
         activeMarker: {},
         selectedPlace: {}
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

   render() {
      return (
         <Map 
            google={this.props.google} 
            zoom={14}
            initialCenter={{
               lat: 40.854885,
               lng: -88.081807
            }}
         >
            <Marker 
               onClick={this.onMarkerClick} 
               name={''} 
            />
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

render() {
    return (
      <Map google={this.props.google} zoom={14} initialCenter={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={15}>

        <Marker onClick={this.onMarkerClick}
                name={'187 Margueretta'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
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