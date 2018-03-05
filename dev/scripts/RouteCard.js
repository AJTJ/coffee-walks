import React from "react";

const RouteCard = (props) => {
   console.log(props);
   return (
      <section className="routeContainer">
         <div className="route">
            <h2>Starting Location</h2>
         </div>
         <div className="route">
            <h2>Ending Location</h2>
         </div>
      </section>
   )
}

export default RouteCard;