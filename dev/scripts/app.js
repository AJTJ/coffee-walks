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
   render() {
      return (
         <div>
            {/* exact states that the path has to state the path EXACTLY to render in the specific component */}
            <button></button>
            <MyWalks />
            <MapContainer />
         </div>
      )
   }
}

ReactDOM.render(<App />, document.getElementById('app'));
