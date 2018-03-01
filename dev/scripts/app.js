import React from 'react';
import ReactDOM from 'react-dom';
import Qs from 'qs';
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from './MapContainer.js';
import {
   BrowserRouter as Router,
   Route,
   Link
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nearbyPlaces: [],
      lat: "",
      lng: ""
    }
    this.getNearbyPlaces = this.getNearbyPlaces.bind(this)
    this.getUserAreaLocation = this.getUserAreaLocation.bind(this)
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

  render() {
    return (
        <div>
          {/* exact states that the path has to state the path EXACTLY to render in the specific component */}
          <MyWalks getNearbyPlaces={this.getNearbyPlaces} getUserAreaLocation={this.getUserAreaLocation} />
          <MapContainer />
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
