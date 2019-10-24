import React from "react";
import "./PointList.css";

import PointItem from "../pointItem/PointItem";

import useCsvData from "../useCsvData";

function PointList({pointType="o"}) {
  const { data } = useCsvData();

  return (
    <ul className="point-list">
      {data.coords[pointType] && data.coords[pointType].map((row, index) => (
        <PointItem key={index} data={row} index={index} markerColor={pointType==="o"?"green":"red"}></PointItem>
      ))}
    </ul>
  );
}

export default PointList;
