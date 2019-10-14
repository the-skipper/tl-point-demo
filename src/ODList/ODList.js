import React, { useState } from "react";
import "./ODList.css";

import ODItem from "../ODItem/ODItem";

import useCsvData from "../useCsvData";

function ODList() {
  const { csvRows } = useCsvData();

  return (
    <ul className="od-list">
      {csvRows.arrays.map((row, index) => (
        <ODItem key={index} data={row} index={index}></ODItem>
      ))}
    </ul>
  );
}

export default ODList;
