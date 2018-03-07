import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import FaIconPack from 'react-icons/lib/fa';
// import FaArrowCircleORight from 'react-icons/lib/fa/arrow-circle-o-right';

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
               <div className="routeHeader clearfix">
                  <h4>Start</h4>
                  <h3>{this.props.data.start.name}</h3>
               </div>
               <div className="routeContent">
                  <p><emphasis><span className="innerTitle">Address: </span></emphasis>
                  {this.props.data.end.vicinity}</p>
                  <p><emphasis><span className="innerTitle">Cafe Rating:</span></emphasis>{this.props.data.start.rating}</p>
               </div>
            </div>
            <div className="route routeEnd clearfix">
               <button className="cardButton" onClick={() => this.props.removeWalk(this.props.data)}>X</button>
               <div className="routeHeader clearfix">
                  <h4>End</h4>
                  <h3>{this.props.data.end.name}</h3>
               </div>
               <div className="routeContent">
                  <p><emphasis><span className="innerTitle">Address:</span></emphasis>
                  {this.props.data.end.vicinity}</p>
                  <p><emphasis><span className="innerTitle">Cafe Rating:</span></emphasis>
                  {this.props.data.end.rating}</p>
               </div>
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