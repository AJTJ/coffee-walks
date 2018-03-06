import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "./RouteCard";

class PublicWalks extends React.Component {
  constructor() {
    super();
    this.state = {
      publicWalks: []
    };
  }

  componentDidMount() {
    const dbref = firebase
      .database()
      .ref("publics/");
    dbref.on("value", snapshot => {
      console.log(snapshot.val());
      const data = snapshot.val();
      const state = [];
      for (let key in data) {
        data[key].key = key;
        state.push(data[key]);
      }
      this.setState({
        publicWalks: state
      });
    });
  }

  render() {
    console.log(this.state.publicWalks);
   //  return (
   //    <div>
   //      {this.state.savedWalks.map(route => {
   //        return <RouteCard data={route} key={route.key} />;
   //      })}
   //    </div>
   //  )
  }
}

export default PublicWalks;
