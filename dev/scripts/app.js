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
import SavedWalks from "./SavedWalks.js"
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

  componentDidMount() {
    const dbref = firebase.database().ref("/recipes");
    dbref.on("value", snapshot => {
      console.log(snapshot.val());
      const data = snapshot.val();
      const state = [];
      for (let key in data) {
        data[key].key = key;
        state.push(data[key]);
      }
      console.log(state);
      this.setState({
        recipes: state
      });
    });
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
              <Login
                loggedInCheck={this.loggedInCheck}
                loggedIn={this.state.loggedIn}
                user={this.state.user}
              />
              <Link to="/Home">Home</Link>
              <Link to="/SavedWalks">Saved Walks</Link>
              <Route path="/Home" exact component={Home} />
              <Route path="/Directions" exact component={Directions} />
              <Route path="/SavedWalks" exact component={SavedWalks} />
            </div>
          ) : (
            <div>
              <Login
                loggedInCheck={this.loggedInCheck}
                loggedIn={this.state.loggedIn}
                user={this.state.user}
              />
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