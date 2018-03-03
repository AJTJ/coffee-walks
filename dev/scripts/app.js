import React from 'react';
import ReactDOM from 'react-dom';
import Qs from 'qs';
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from './MapContainer.js';
import Directions from './Directions.js';
import Home from "./Home.js";
import {
   BrowserRouter as Router,
   Route,
   Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            {/* to style and add classnames */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </header>
          <Route path="/" exact component={Home} />
          {/* <Route path="/about" exact component={About} />
          <Route path="/contact/:name" exact component={Contact} /> */}
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));