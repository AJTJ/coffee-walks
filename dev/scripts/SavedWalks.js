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
    }
    this.removeWalk = this.removeWalk.bind(this);
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

  removeWalk(route) {
    // console.log("button Clicked")
    // console.log(route.key)
    let removeId = route.key;
    console.log("remove Recipe");
    this.setState({ recipeIndex: undefined });
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/${removeId}`)
      .remove();
  }

  render() {
    console.log(this.state.savedWalks);
    return (
      <div>
        {this.state.savedWalks.map(route => {
          return <RouteCard data={route} key={route.key} removeWalk={this.removeWalk}/>;
        })}
      </div>
    );
  }
}

export default SavedWalks;