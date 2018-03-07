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
         <section className="routeContainer clearfix">
            <div className="route routeStart">
               <h4>Start</h4>
               <h3>{this.props.data.start.name}</h3>
            </div>
            <div className="route routeEnd clearfix">
               <button className="cardButton" onClick={() => this.props.removeWalk(this.props.data)}>X</button>
               <h4>End</h4>
               <h3>{this.props.data.end.name}</h3>

            </div>
            {/* <button onClick={() => this.props.removeWalk(this.props.data)}>Remove This Route</button> */}
            <Link to={{ pathname: `/DirectionsShare/${this.props.data.key}` }}>
               <button className="insideButton"> Let's Find Your Walk</button>
            </Link>
         </section>
      )
      
   }
}

export default RouteCard;