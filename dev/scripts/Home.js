import React from 'react';
import Qs from "qs";
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from "./MapContainer.js";
import Directions from "./Directions.js";
import Header from "./Header.js";
import Login from "./Login.js";

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         nearbyPlaces: [],
         lat: "",
         lng: "",
         testing: false
      }
      this.getNearbyPlaces = this.getNearbyPlaces.bind(this);
      this.getUserAreaLocation = this.getUserAreaLocation.bind(this);
      this.confirmStart = this.confirmStart.bind(this);
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
            && <MapContainer nearbyPlaces={this.state.nearbyPlaces} areaLat={this.state.lat} areaLng={this.state.lng} confirmStart={this.confirmStart}/>}
         </div>
      )
   }
}

export default Home;