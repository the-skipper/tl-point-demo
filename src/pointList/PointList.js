import React from "react";
import "./PointList.css";

import PointItem from "../pointItem/PointItem";

import useCsvData from "../useCsvData";

function PointList({ pointType = "o" }) {
  const { data, selectRow } = useCsvData();

  return (
    <ul className="point-list">
      {data.coords[pointType] &&
        data.coords[pointType].map((row, index) => (
          <PointItem
            key={index}
            data={row}
            index={`${pointType}-${index}`}
            markerColor={pointType === "o" ? "#00c0ed" : "#a9271d"}
            pointType={pointType}
          ></PointItem>
        ))}
    </ul>
  );
}

export default PointList;
