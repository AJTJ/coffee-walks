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
{/*           
            <button className="deleteWalk" onClick={() => this.removeWalk(this.props.data)}><p>X</p></button> */}
            <div className="route routeStart">
               <h3>Starting Location</h3>
               <h4>{this.props.data.start.name}</h4>
            <button className="insideButton" onClick={() => this.props.removeWalk(this.props.data)}>
               Remove This Route
            </button>
            </div>
            <div className="route routeEnd">
               <h3>Ending Location</h3>
               <h4>{this.props.data.end.name}</h4>
            <Link to={{ pathname: `/Directions/${this.props.data.key}`, state: { firstChoice: this.props.data.start, endChoice: this.props.data.end } }}>
               <button className="insideButton"> Lets Find Your Route</button>
            </Link>
            </div>

         </section>
      )
      
   }
}

export default RouteCard;