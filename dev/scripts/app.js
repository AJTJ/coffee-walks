import React from 'react';
import ReactDOM from 'react-dom';
import Qs from 'qs';
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from './MapContainer.js';
import Directions from './Directions.js';
import Header from "./Header.js";
import Home from "./Home.js";
import Login from "./Login.js";
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
               <Header />
               <Login />
               <Link to="/Home">Home</Link>
            </header>
            <Route path="/Home" exact component={Home} />
            <Route path="/Directions" exact component={Directions} />
            {/* <Route path="/about" exact component={About} />
            <Route path="/contact/:name" exact component={Contact} /> */}
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));