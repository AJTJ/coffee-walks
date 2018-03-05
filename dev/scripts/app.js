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
   constructor() {
      super();
      this.state = {
         loggedIn: false,
         user: null,
      }

      this.loggedInCheck = this.loggedInCheck.bind(this);
   }

   loggedInCheck(res) {
      console.log('res',res)
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

   componentDidMount() {
      console.log(this.state.loggedIn);
   }

   


   render() {
      return (
         <Router>
            <div>
               <header>
                  <Header />
               </header>
               {this.state.loggedIn ? (
                  <div>
                     <Login loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} user={this.state.user} />
                     <Link to="/Home">Home</Link>
                     <Route path="/Home" exact component={Home} />
                     <Route user={this.state.user} path="/Directions" exact component={Directions} />
                  </div>
               ) : (
                  <div>
                     <Login loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} user={this.state.user} />
                  </div>
               )}
            </div>
         </Router>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('app'));

{/* <Route path="/about" exact component={About} />
<Route path="/contact/:name" exact component={Contact} /> */}