import React from "react";

import "./Map.css";

function Map(props) {
  return (
    <div className={`map ${props.className}`} style={props.style}>
      Map
    </div>
  );
}

export default Map;
