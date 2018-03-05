import React from "react";
import ReactDOM from "react-dom";

const RouteCard = (props) => {
   console.log(props);
   return (
      <section className="routeContainer">
         <div className="route">
            <h2>Starting Location</h2>
            <h3>{props.data.start.name}</h3>
         </div>
         <div className="route">
            <h2>Ending Location</h2>
            <h3>{props.data.end.name}</h3>
         </div>
      </section>
   )
}

export default RouteCard;