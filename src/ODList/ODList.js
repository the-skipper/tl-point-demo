import React from "react";
import "./ODList.css";

import ODItem from "../ODItem/ODItem";

import useCsvData from "../useCsvData";

function ODList() {
  const { data } = useCsvData();

  return (
    <ul className="od-list">
      {data.rows.map((row, index) => (
        <ODItem key={index} data={row} index={index}></ODItem>
      ))}
    </ul>
  );
}

export default ODList;
