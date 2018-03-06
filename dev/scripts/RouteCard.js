import React from "react";
import ReactDOM from "react-dom";

class RouteCard extends React.PureComponent {
   constructor() {
      super()
      this.removeWalk = this.removeWalk.bind(this)
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
            <button onClick={() => this.removeWalk(this.props.data)}>Remove This Route</button>
         </section>
      )
      
   }
}

export default RouteCard;