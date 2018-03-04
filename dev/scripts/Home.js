import React from 'react';
import Qs from "qs";
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from "./MapContainer.js";
import Directions from "./Directions.js";
import Header from "./Header.js";
import Login from "./Login.js";
import FinalDestinationContainer from "./FinalDestination.js";

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         nearbyPlaces: [],
         lat: "",
         lng: "",
         testing: false,
         firstChoice: []
      }
      this.getNearbyPlaces = this.getNearbyPlaces.bind(this);
      this.getUserAreaLocation = this.getUserAreaLocation.bind(this);
      this.confirmStart = this.confirmStart.bind(this);
      this.handleStartCafeClick = this.handleStartCafeClick.bind(this);
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

   confirmStart() {
      // console.log(e);
      console.log("Murder Fish");
      // this.setState({
      //   testing: true
      // })
   }

   handleStartCafeClick(place) {
      console.log('button clicked');
      this.setState({
         firstChoice: place
      })
   }

   render() {
      return (
         <div className="wrapper">
            {/* <header className="header clearfix">
               <h1 className="header__title">Coffee Walks</h1>
               <img className="header__logo" src="/assets/noun_59078_cc.svg" alt=""/>
            </header> */}
            <Header />
            <Login />
            {/* exact states that the path has to state the path EXACTLY to render in the specific component */}
            <MyWalks getNearbyPlaces={this.getNearbyPlaces} getUserAreaLocation={this.getUserAreaLocation} />
            {this.state.lat !== "" 
            && <MapContainer nearbyPlaces={this.state.nearbyPlaces} areaLat={this.state.lat} areaLng={this.state.lng} confirmStart={this.confirmStart} handleStartCafeClick={this.handleStartCafeClick}/>}
            {/* <FinalDestinationContainer /> */}
            <Directions />
         </div>
      )
   }
}

export default Home;