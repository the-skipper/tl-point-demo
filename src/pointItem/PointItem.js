import React from "react";
import "./PointItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

function PointItem({ data, itemClass="origin", markerColor="green" }) {
  return (
    <li className="point-item">
      <div className={itemClass}>
        <FontAwesomeIcon icon={faMapPin} color={markerColor} />
        <p>
          {data.latitude}, {data.longitude}
        </p>
      </div>
    </li>
  );
}

export default PointItem;
