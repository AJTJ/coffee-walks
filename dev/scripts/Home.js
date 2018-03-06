import React from 'react';
import Qs from "qs";
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from "./MapContainer.js";
import Directions from "./Directions.js";
// import DirectionsCreation from "./DirectionsCreation.js";
import TitleLogo from "./TitleLogo.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SavedWalks from "./SavedWalks.js";

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         nearbyPlaces: [],
         lat: "",
         lng: "",
         testing: false,
         firstChoice: [],
         endChoice: [],
         choices: false
      }
      this.getNearbyPlaces = this.getNearbyPlaces.bind(this);
      this.getUserAreaLocation = this.getUserAreaLocation.bind(this);
      this.handleStartCafeClick = this.handleStartCafeClick.bind(this);
      this.handleEndCafeClick = this.handleEndCafeClick.bind(this);
   }

   getNearbyPlaces(nearbyPlaces) {
      this.setState({
         nearbyPlaces: nearbyPlaces
      })
   }

   getUserAreaLocation(lat, lng) {
      this.setState({
         lat: lat,
         lng: lng
      })
   }

   handleStartCafeClick(place) {
      console.log('button clicked');
      this.setState({
         firstChoice: place
      }),() => console.log(this.state.firstChoice);
   }

   handleEndCafeClick(place) {
      console.log('button clicked');
      this.setState({
         endChoice: place,
         choices:true
      }),() => console.log(this.state.endChoice);
   }

   render() {
      return (
         <div className="wrapper">
            {/* exact states that the path has to state the path EXACTLY to render in the specific component */}
            <MyWalks getNearbyPlaces={this.getNearbyPlaces} getUserAreaLocation={this.getUserAreaLocation} />

            {/* FIRST AND FINALDESTINATION */}
            {this.state.lat !== "" && <MapContainer nearbyPlaces={this.state.nearbyPlaces} areaLat={this.state.lat} areaLng={this.state.lng} confirmStart={this.confirmStart} handleEndCafeClick={this.handleEndCafeClick} handleStartCafeClick={this.handleStartCafeClick} />}

            {/* DIRECTIONS AND SAVE */}
            {this.state.choices ? 
               <Link  to={ {pathname: '/Directions', state: { firstChoice: this.state.firstChoice, endChoice: this.state.endChoice } } } >
                  <button className="findRoute"> Lets Find Your Route</button>
               </Link> :
               null
            }
         </div>
      )
   }
}

export default Home;