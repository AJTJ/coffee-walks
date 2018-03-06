import React from 'react';
import ReactDOM from 'react-dom';
import Qs from 'qs';
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from './MapContainer.js';
import Directions from './Directions.js';
import TitleLogo from "./TitleLogo.js";
import Home from "./Home.js";
import Login from "./Login.js";
import SavedWalks from "./SavedWalks.js"
import PublicWalks from "./PublicWalks.js"
import {
   BrowserRouter as Router,
   Route,
   Link
} from "react-router-dom";

class App extends React.Component {
   constructor() {
      super();
      this.state = {
         loggedIn: false,
         user: null
      };
      this.loggedInCheck = this.loggedInCheck.bind(this);
   }

   loggedInCheck(res) {
      console.log("res", res);
      if (res) {
         this.setState({
         loggedIn: true,
         user: res
         });
      } else {
         this.setState({
         loggedIn: false,
         user: {}
         });
      }
   }

  render() {
      return (
         <Router>
               {this.state.loggedIn ? (
                  <div>
                     <header>
                        <div className="clearfix headerDiv">
                           <TitleLogo />
                           <Login loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} user={this.state.user} />
                        </div>
                     </header>
                     <div className="wrapper">
                        <Link className="lrgButton" to="/Home">Make a Walk!</Link>
                        <Route path="/Home" exact component={Home} />
                        <Link className="lrgButton" to="/SavedWalks">Saved Walks</Link>
                        <Route path="/SavedWalks" exact component={SavedWalks} />
                        <Route user={this.state.user} path="/Directions" exact component={Directions} />
                        <Link className="lrgButton" to="/PublicWalks">Public Walks</Link>
                        <Route path="/PublicWalks" exact component={PublicWalks} />
                        <Route path="/Directions/:id" exact component={Directions} />
                     </div>
                  </div>
               ) : (
                  <div>
                     <header>
                        <div className="clearfix headerDiv">
                           <TitleLogo />
                        </div>
                     </header>
                     <div className="wrapper">
                        <Login loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} user={this.state.user} />
                        <Link className="lrgButton" to="/PublicWalks">Public Walks</Link>
                        <Route path="/PublicWalks" exact component={PublicWalks} />
                        <Route path="/Directions/:id" exact component={Directions} />
                     </div>
                  </div>
               )}
         </Router>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('app'));