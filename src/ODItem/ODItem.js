import React from "react";
import "./ODItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

function ODItem({ data }) {
  return (
    <li className="od-item">
      <div className="od-o">
        <FontAwesomeIcon icon={faMapPin} color="green" />
        <p>
          {data[0]}, {data[1]}
        </p>
      </div>
      <div className="od-d">
        <p>
          {data[2]}, {data[3]}
        </p>
        <FontAwesomeIcon icon={faMapPin} color="red" />
      </div>
    </li>
  );
}

export default ODItem;
