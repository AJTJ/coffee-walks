import React from 'react';
import ReactDOM from 'react-dom';
import Qs from 'qs';
import axios from "axios";
import MyWalks from "./MyWalks";
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
          <MyWalks />
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
