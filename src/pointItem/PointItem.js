import React from "react";
import "./PointItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

import useCsvData from "../useCsvData";

function PointItem({
  data,
  index,
  pointType,
  itemClass = "origin",
  markerColor = "green"
}) {
  const { selectRow, data: state } = useCsvData();
  return (
    <li
      className={`point-item ${
        state.selectedPoints.indexOf(index) !== -1 ? "selected" : ""
      }`}
      onClick={() => {
        selectRow(index, pointType, `${data.latitude},${data.longitude}`);
      }}
    >
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
