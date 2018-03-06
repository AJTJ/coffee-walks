import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RouteCard extends React.PureComponent {
   constructor() {
      super()
      // this.removeWalk = this.removeWalk.bind(this)
   }

   // removeWalk(route) {
   //    // console.log("button Clicked")
   //    // console.log(route.key)
   //    let removeId = route.key;
   //    console.log("remove Recipe");
   //    this.setState({ recipeIndex: undefined });
   //    firebase
   //      .database()
   //      .ref(`users/${firebase.auth().currentUser.uid}/${removeId}`)
   //      .remove();
   // }

   render(props){
      return (
         <section className="routeContainer">
            <div className="route">
               <h2>Starting Location</h2>
               <h3>{this.props.data.start.name}</h3>
            </div>
            <div className="route">
               <h2>Ending Location</h2>
               <h3>{this.props.data.end.name}</h3>
            </div>
            <button onClick={() => this.props.removeWalk(this.props.data)}>
               Remove This Route
            </button>
            <Link to={{ pathname: `/Directions/${this.props.data.key}`, state: { firstChoice: this.props.data.start, endChoice: this.props.data.end } }}>
               <button className="findRoute"> Lets Find Your Route</button>
            </Link>
         </section>
      )
      
   }
}

export default RouteCard;