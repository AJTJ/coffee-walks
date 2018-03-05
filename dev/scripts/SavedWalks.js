import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "./RouteCard";

// const RouteCard = (props) => {
//   console.log(props);
//   return (
//    <section className="routeContainer">
//       <div className="route">
//         <h2>{props.start.name}</h2>
//       </div>
//       <div className="route">
//         <h2>{props.end.name}</h2>
//       </div>
//    </section>
//   )
// }

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
           return (
            <RouteCard data={route} />
           )
        })}
      </div>
    );
  }
}

export default SavedWalks;