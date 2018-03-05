import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "./RouteCard";

class SavedWalks extends React.Component {
  constructor() {
    super();
    this.state = {
       savedWalks: []
    };
  }

  componentDidMount() {
    const dbref = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`);
    dbref.on("value", snapshot => {
      console.log(snapshot.val());
      const data = snapshot.val();
      const state = [];
      for (let key in data) {
        data[key].key = key;
        state.push(data[key]);
      }
      this.setState({
         savedWalks: state
      });
   });
  }

  render() {
     console.log(this.state.savedWalks)
    return (
      <div>
        {this.state.savedWalks.map((route) => {
           <RouteCard data={route} />
        })}
      </div>
    );
  }
}

export default SavedWalks;